require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require('../config/firebase');
const fetch = require('node-fetch');

// Test data
const testData = {
  membershipId: 'test-membership-' + Date.now(), // Unique ID for test
  userId: 'test-user-' + Date.now(),
  amount: 2000, // $20.00
  cardNumber: '4242424242424242'
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

async function setupTestData() {
  console.log(`${colors.blue}Setting up test data...${colors.reset}`);
  
  try {
    // Create test membership in Firestore
    await db.collection('memberships').doc(testData.membershipId).set({
      name: 'Test Membership',
      price: testData.amount / 100, // Convert from cents
      features: ['Test Feature 1', 'Test Feature 2'],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log(`${colors.green}✓ Test membership created${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}Failed to setup test data:${colors.reset}`, error);
    throw error;
  }
}

async function cleanupTestData() {
  console.log(`${colors.blue}Cleaning up test data...${colors.reset}`);
  
  try {
    // Delete test membership
    await db.collection('memberships').doc(testData.membershipId).delete();
    
    // Delete test payment records
    const payments = await db.collection('payments')
      .where('userId', '==', testData.userId)
      .get();
    
    const batch = db.batch();
    payments.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Delete test user
    await db.collection('users').doc(testData.userId).delete();

    console.log(`${colors.green}✓ Test data cleaned up${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}Failed to cleanup test data:${colors.reset}`, error);
  }
}

async function verifyFirestorePayment(paymentIntentId) {
  try {
    // Check payments collection
    const paymentDoc = await db.collection('payments').doc(paymentIntentId).get();
    if (!paymentDoc.exists) {
      throw new Error('Payment record not found in Firestore');
    }
    
    // Check memberships collection for updated status
    const userDoc = await db.collection('users').doc(testData.userId).get();
    if (!userDoc.exists || !userDoc.data().membership || userDoc.data().membership.status !== 'active') {
      throw new Error('Active membership not found for user');
    }

    return true;
  } catch (error) {
    console.error(`${colors.red}Firestore verification failed:${colors.reset}`, error);
    return false;
  }
}

async function testPaymentFlow() {
  console.log(`${colors.bright}Starting Payment Flow Test${colors.reset}\n`);

  try {
    // Setup test data
    await setupTestData();

    // 1. Verify Stripe Configuration
    console.log(`${colors.blue}1. Verifying Stripe Configuration${colors.reset}`);
    const config = await fetch('http://localhost:5000/api/stripe/config');
    if (!config.ok) {
      const errorText = await config.text();
      throw new Error(`Failed to fetch Stripe config: ${config.status} - ${errorText}`);
    }
    console.log(`${colors.green}✓ Stripe config verified${colors.reset}\n`);

    // 2. Create Payment Intent
    console.log(`${colors.blue}2. Creating Payment Intent${colors.reset}`);
    console.log('Sending payment data:', testData);
    
    const intentResponse = await fetch('http://localhost:5000/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    if (!intentResponse.ok) {
      const errorData = await intentResponse.text();
      console.error(`${colors.red}Payment Intent Response:${colors.reset}`, {
        status: intentResponse.status,
        statusText: intentResponse.statusText,
        error: errorData
      });
      throw new Error(`Failed to create payment intent: ${intentResponse.status} - ${errorData}`);
    }

    const intentData = await intentResponse.json();
    if (!intentData.clientSecret) {
      throw new Error('No client secret returned from payment intent creation');
    }
    console.log(`${colors.green}✓ Payment intent created${colors.reset}`);
    console.log('Payment Intent Data:', {
      clientSecret: intentData.clientSecret.substring(0, 10) + '...',
      intentId: intentData.clientSecret.split('_secret')[0]
    });
    console.log('\n');

    // 3. Simulate Card Payment
    console.log(`${colors.blue}3. Simulating Card Payment${colors.reset}`);
    
    // Create a payment method with a test card token
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: 'tok_visa'
      }
    });
    
    console.log(`${colors.green}✓ Payment method created${colors.reset}`);

    // Confirm the payment intent with the payment method
    const paymentIntent = await stripe.paymentIntents.confirm(
      intentData.clientSecret.split('_secret')[0],
      {
        payment_method: paymentMethod.id,
        return_url: 'http://localhost:3000/payment-complete'
      }
    );

    console.log(`${colors.green}✓ Payment confirmed with Stripe${colors.reset}\n`);

    // 4. Confirm Payment with Backend
    console.log(`${colors.blue}4. Confirming Payment with Backend${colors.reset}`);
    const confirmResponse = await fetch('http://localhost:5000/api/stripe/confirm-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentIntentId: paymentIntent.id,
        membershipId: testData.membershipId,
        userId: testData.userId
      })
    });

    if (!confirmResponse.ok) {
      const errorData = await confirmResponse.text();
      throw new Error(`Failed to confirm payment with backend: ${confirmResponse.status} - ${errorData}`);
    }
    console.log(`${colors.green}✓ Payment confirmed with backend${colors.reset}\n`);

    // 5. Verify Firestore Records
    console.log(`${colors.blue}5. Verifying Firestore Records${colors.reset}`);
    const verified = await verifyFirestorePayment(paymentIntent.id);
    if (!verified) {
      throw new Error('Failed to verify Firestore records');
    }
    console.log(`${colors.green}✓ Firestore records verified${colors.reset}\n`);

    console.log(`${colors.green}✓ All tests passed!${colors.reset}`);

  } catch (error) {
    console.error(`${colors.red}Error during payment flow test:${colors.reset}`);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    });
  } finally {
    // Cleanup test data
    await cleanupTestData();
  }
}

// Display test prerequisites
console.log(`${colors.yellow}
Test Prerequisites:
1. Make sure the server is running (node server.js)
2. Verify environment variables are set:
   - STRIPE_SECRET_KEY
   - STRIPE_PUBLISHABLE_KEY
3. Ensure Firebase is initialized${colors.reset}\n`);

// Run the test
testPaymentFlow().then(() => {
  console.log(`${colors.bright}Test script completed!${colors.reset}`);
}); 