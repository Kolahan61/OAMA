const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require('../config/firebase');

// GET /config - Return Stripe publishable key
router.get('/config', (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  });
});

// POST /create-payment-intent - Create a Stripe Payment Intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, membershipId, userId, stripePriceId } = req.body;

    // Validate required fields
    if (!amount || !membershipId || !userId) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: {
          amount: !amount ? 'Amount is required' : null,
          membershipId: !membershipId ? 'Membership ID is required' : null,
          userId: !userId ? 'User ID is required' : null
        }
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency: 'cad',
      metadata: {
        membershipId,
        userId
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      error: 'Failed to create payment intent',
      details: error.message
    });
  }
});

// POST /confirm-payment - Confirm payment completion
router.post('/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId, membershipId, userId } = req.body;

    // Validate required fields
    if (!paymentIntentId || !membershipId || !userId) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    // Verify payment intent status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        error: 'Payment not completed'
      });
    }

    // Get membership details
    const membershipDoc = await db.collection('memberships').doc(membershipId).get();
    if (!membershipDoc.exists) {
      return res.status(404).json({ error: 'Membership not found' });
    }
    const membership = membershipDoc.data();

    // Update user's membership status
    const userRef = db.collection('users').doc(userId);
    const now = new Date();
    const expirationDate = new Date();
    expirationDate.setMonth(now.getMonth() + 1);

    await userRef.update({
      membership: {
        id: membershipId,
        name: membership.name,
        startDate: now,
        expirationDate,
        status: 'active',
        paymentIntentId: paymentIntentId
      },
      updatedAt: now
    });

    res.json({
      success: true,
      message: 'Membership activated successfully'
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({
      error: 'Failed to confirm payment',
      details: error.message
    });
  }
});

// POST /create-checkout-session - Create a Stripe Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { membershipId, userId } = req.body;

    // Validate required fields
    if (!membershipId || !userId) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: {
          membershipId: !membershipId ? 'Membership ID is required' : null,
          userId: !userId ? 'User ID is required' : null
        }
      });
    }

    // Get membership details from Firestore
    const membershipRef = db.collection('memberships').doc(membershipId);
    const membershipDoc = await membershipRef.get();

    if (!membershipDoc.exists) {
      return res.status(404).json({ error: 'Membership not found' });
    }

    const membership = membershipDoc.data();
    if (!membership.stripePriceId) {
      return res.status(400).json({ error: 'Invalid membership: No Stripe Price ID configured' });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: membership.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/memberships`,
      client_reference_id: userId,
      metadata: {
        membershipId,
        membershipName: membership.name,
        userId
      }
    });

    // Save checkout session details to Firestore
    await db.collection('checkoutSessions').doc(session.id).set({
      userId,
      membershipId,
      status: 'pending',
      created: new Date(),
      metadata: session.metadata
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      error: 'Failed to create checkout session',
      details: error.message
    });
  }
});

// POST /webhook - Handle Stripe webhook events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`📥 Received webhook event: ${event.type}`);

  try {
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log(`💳 Processing checkout session completed: ${session.id}`);
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case 'customer.subscription.created': {
        const subscription = event.data.object;
        console.log(`🔄 Processing subscription created: ${subscription.id}`);
        await handleSubscriptionCreated(subscription);
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        console.log(`🔄 Processing subscription updated: ${subscription.id}`);
        await handleSubscriptionUpdated(subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log(`❌ Processing subscription deleted: ${subscription.id}`);
        await handleSubscriptionDeleted(subscription);
        break;
      }
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        console.log(`✅ Processing invoice payment succeeded: ${invoice.id}`);
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.log(`❌ Processing invoice payment failed: ${invoice.id}`);
        await handleInvoicePaymentFailed(invoice);
        break;
      }
      case 'customer.subscription.trial_will_end': {
        const subscription = event.data.object;
        console.log(`⏰ Processing trial will end: ${subscription.id}`);
        await handleTrialWillEnd(subscription);
        break;
      }
      case 'customer.created': {
        const customer = event.data.object;
        console.log(`👤 Processing customer created: ${customer.id}`);
        await handleCustomerCreated(customer);
        break;
      }
      default:
        console.log(`⚠️  Unhandled event type: ${event.type}`);
    }

    console.log(`✅ Successfully processed webhook event: ${event.type}`);
    res.json({ received: true });
  } catch (error) {
    console.error(`❌ Error processing webhook ${event.type}:`, error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

// Webhook event handlers
async function handleCheckoutSessionCompleted(session) {
  try {
    const { userId, membershipId } = session.metadata;
    
    if (!userId || !membershipId) {
      console.error('Missing userId or membershipId in session metadata:', session.metadata);
      return;
    }

    const checkoutSessionRef = db.collection('checkoutSessions').doc(session.id);
    const userRef = db.collection('users').doc(userId);

    await db.runTransaction(async (transaction) => {
      // Update checkout session status
      transaction.update(checkoutSessionRef, {
        status: 'completed',
        completedAt: new Date(),
        stripeCustomerId: session.customer,
        stripeSubscriptionId: session.subscription
      });

      // Get membership details
      const membershipDoc = await transaction.get(db.collection('memberships').doc(membershipId));
      if (!membershipDoc.exists) {
        throw new Error(`Membership ${membershipId} not found`);
      }
      const membership = membershipDoc.data();

      // Calculate expiration date based on billing cycle
      const now = new Date();
      const expirationDate = new Date();
      
      switch (membership.billingCycle?.toLowerCase()) {
        case 'monthly':
          expirationDate.setMonth(now.getMonth() + 1);
          break;
        case 'yearly':
          expirationDate.setFullYear(now.getFullYear() + 1);
          break;
        case 'quarterly':
          expirationDate.setMonth(now.getMonth() + 3);
          break;
        default:
          expirationDate.setMonth(now.getMonth() + 1); // Default to monthly
      }

      // Update or create user document
      const userDoc = await transaction.get(userRef);
      const userData = {
        membershipStatus: 'active',
        membership: {
          id: membershipId,
          name: membership.name,
          price: membership.price,
          billingCycle: membership.billingCycle,
          startDate: now,
          expirationDate,
          status: 'active',
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription
        },
        stripeCustomerId: session.customer,
        stripeSubscriptionId: session.subscription,
        updatedAt: now
      };

      if (!userDoc.exists) {
        transaction.set(userRef, {
          ...userData,
          createdAt: now,
          registeredClasses: []
        });
      } else {
        transaction.update(userRef, userData);
      }
    });

    console.log(`✅ Successfully processed checkout session for user ${userId}`);
  } catch (error) {
    console.error('Error in handleCheckoutSessionCompleted:', error);
    throw error;
  }
}

async function handleSubscriptionCreated(subscription) {
  try {
    const customerId = subscription.customer;
    const userSnapshot = await db.collection('users')
      .where('stripeCustomerId', '==', customerId)
      .get();

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      await userDoc.ref.update({
        membershipStatus: subscription.status === 'active' ? 'active' : 'inactive',
        'membership.status': subscription.status,
        'membership.stripeSubscriptionStatus': subscription.status,
        'membership.currentPeriodStart': new Date(subscription.current_period_start * 1000),
        'membership.currentPeriodEnd': new Date(subscription.current_period_end * 1000),
        stripeSubscriptionId: subscription.id,
        updatedAt: new Date()
      });
      console.log(`✅ Updated user subscription status for customer ${customerId}`);
    } else {
      console.warn(`⚠️  No user found with stripeCustomerId: ${customerId}`);
    }
  } catch (error) {
    console.error('Error in handleSubscriptionCreated:', error);
    throw error;
  }
}

async function handleSubscriptionUpdated(subscription) {
  try {
    const customerId = subscription.customer;
    const userSnapshot = await db.collection('users')
      .where('stripeCustomerId', '==', customerId)
      .get();

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const isActive = subscription.status === 'active';
      
      await userDoc.ref.update({
        membershipStatus: isActive ? 'active' : 'inactive',
        'membership.status': subscription.status,
        'membership.stripeSubscriptionStatus': subscription.status,
        'membership.currentPeriodStart': new Date(subscription.current_period_start * 1000),
        'membership.currentPeriodEnd': new Date(subscription.current_period_end * 1000),
        'membership.cancelAtPeriodEnd': subscription.cancel_at_period_end,
        updatedAt: new Date()
      });
      console.log(`✅ Updated subscription status to ${subscription.status} for customer ${customerId}`);
    } else {
      console.warn(`⚠️  No user found with stripeCustomerId: ${customerId}`);
    }
  } catch (error) {
    console.error('Error in handleSubscriptionUpdated:', error);
    throw error;
  }
}

async function handleSubscriptionDeleted(subscription) {
  try {
    const customerId = subscription.customer;
    const userSnapshot = await db.collection('users')
      .where('stripeCustomerId', '==', customerId)
      .get();

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      await userDoc.ref.update({
        membershipStatus: 'inactive',
        'membership.status': 'canceled',
        'membership.stripeSubscriptionStatus': 'canceled',
        'membership.canceledAt': new Date(),
        'membership.cancelAtPeriodEnd': false,
        updatedAt: new Date()
      });
      console.log(`✅ Canceled subscription for customer ${customerId}`);
    } else {
      console.warn(`⚠️  No user found with stripeCustomerId: ${customerId}`);
    }
  } catch (error) {
    console.error('Error in handleSubscriptionDeleted:', error);
    throw error;
  }
}

async function handleInvoicePaymentSucceeded(invoice) {
  try {
    const customerId = invoice.customer;
    const subscriptionId = invoice.subscription;
    
    const userSnapshot = await db.collection('users')
      .where('stripeCustomerId', '==', customerId)
      .get();

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();
      
      // Update membership expiration based on the invoice period
      const periodEnd = new Date(invoice.period_end * 1000);
      
      await userDoc.ref.update({
        membershipStatus: 'active',
        'membership.status': 'active',
        'membership.expirationDate': periodEnd,
        'membership.currentPeriodEnd': periodEnd,
        'membership.lastPaymentDate': new Date(),
        'membership.lastInvoiceId': invoice.id,
        updatedAt: new Date()
      });

      // Log payment history
      await db.collection('paymentHistory').add({
        userId: userDoc.id,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        invoiceId: invoice.id,
        amount: invoice.amount_paid,
        currency: invoice.currency,
        status: 'succeeded',
        periodStart: new Date(invoice.period_start * 1000),
        periodEnd: new Date(invoice.period_end * 1000),
        createdAt: new Date()
      });

      console.log(`✅ Payment succeeded for customer ${customerId}, amount: ${invoice.amount_paid / 100} ${invoice.currency}`);
    } else {
      console.warn(`⚠️  No user found with stripeCustomerId: ${customerId}`);
    }
  } catch (error) {
    console.error('Error in handleInvoicePaymentSucceeded:', error);
    throw error;
  }
}

async function handleInvoicePaymentFailed(invoice) {
  try {
    const customerId = invoice.customer;
    const subscriptionId = invoice.subscription;
    
    const userSnapshot = await db.collection('users')
      .where('stripeCustomerId', '==', customerId)
      .get();

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      
      await userDoc.ref.update({
        'membership.paymentStatus': 'failed',
        'membership.lastFailedPaymentDate': new Date(),
        'membership.lastFailedInvoiceId': invoice.id,
        updatedAt: new Date()
      });

      // Log failed payment
      await db.collection('paymentHistory').add({
        userId: userDoc.id,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        invoiceId: invoice.id,
        amount: invoice.amount_due,
        currency: invoice.currency,
        status: 'failed',
        failureReason: invoice.last_finalization_error?.message || 'Payment failed',
        createdAt: new Date()
      });

      console.log(`❌ Payment failed for customer ${customerId}, amount: ${invoice.amount_due / 100} ${invoice.currency}`);
    } else {
      console.warn(`⚠️  No user found with stripeCustomerId: ${customerId}`);
    }
  } catch (error) {
    console.error('Error in handleInvoicePaymentFailed:', error);
    throw error;
  }
}

async function handleTrialWillEnd(subscription) {
  try {
    const customerId = subscription.customer;
    const userSnapshot = await db.collection('users')
      .where('stripeCustomerId', '==', customerId)
      .get();

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const trialEndDate = new Date(subscription.trial_end * 1000);
      
      await userDoc.ref.update({
        'membership.trialEndDate': trialEndDate,
        'membership.trialWillEnd': true,
        updatedAt: new Date()
      });

      console.log(`⏰ Trial will end for customer ${customerId} on ${trialEndDate}`);
      
      // Here you could trigger email notifications or other actions
      // await sendTrialEndingNotification(userDoc.data());
    } else {
      console.warn(`⚠️  No user found with stripeCustomerId: ${customerId}`);
    }
  } catch (error) {
    console.error('Error in handleTrialWillEnd:', error);
    throw error;
  }
}

async function handleCustomerCreated(customer) {
  try {
    // Log customer creation - useful for debugging
    console.log(`👤 New Stripe customer created: ${customer.id}, email: ${customer.email}`);
    
    // Optionally, you could create a customer record in Firestore here
    // or update existing user records if you have the email match
    if (customer.email) {
      const userSnapshot = await db.collection('users')
        .where('email', '==', customer.email)
        .get();

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        await userDoc.ref.update({
          stripeCustomerId: customer.id,
          updatedAt: new Date()
        });
        console.log(`✅ Linked Stripe customer ${customer.id} to user ${userDoc.id}`);
      }
    }
  } catch (error) {
    console.error('Error in handleCustomerCreated:', error);
    throw error;
  }
}

module.exports = router; 