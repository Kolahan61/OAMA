require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Test data
const samplePaymentData = {
  amount: 2000, // $20.00
  membershipId: 'test_membership',
  userId: 'test_user_123'
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

async function testStripeIntegration() {
  console.log(`${colors.bright}Starting Stripe Integration Tests${colors.reset}\n`);

  try {
    // 1. Test Stripe configuration
    console.log(`${colors.blue}1. Testing Stripe Configuration:${colors.reset}`);
    console.log('• Checking environment variables...');
    
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PUBLISHABLE_KEY) {
      throw new Error('Missing required Stripe environment variables');
    }

    console.log('• Verifying Stripe secret key format...');
    if (!process.env.STRIPE_SECRET_KEY.startsWith('sk_test_')) {
      throw new Error('Invalid Stripe secret key format');
    }

    console.log('• Verifying Stripe publishable key format...');
    if (!process.env.STRIPE_PUBLISHABLE_KEY.startsWith('pk_test_')) {
      throw new Error('Invalid Stripe publishable key format');
    }

    console.log(`${colors.green}✓ Stripe configuration verified${colors.reset}\n`);

    // 2. Test creating a payment intent
    console.log(`${colors.blue}2. Testing Payment Intent Creation:${colors.reset}`);
    console.log('• Creating test payment intent...');
    console.log('Sample payment data:', samplePaymentData);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: samplePaymentData.amount,
      currency: 'cad',
      metadata: {
        membershipId: samplePaymentData.membershipId,
        userId: samplePaymentData.userId
      }
    });

    console.log('• Payment Intent ID:', paymentIntent.id);
    console.log('• Client Secret:', paymentIntent.client_secret.substring(0, 10) + '...');
    console.log(`${colors.green}✓ Payment intent created successfully${colors.reset}\n`);

    // 3. Test retrieving payment intent
    console.log(`${colors.blue}3. Testing Payment Intent Retrieval:${colors.reset}`);
    const retrievedIntent = await stripe.paymentIntents.retrieve(paymentIntent.id);
    console.log('• Retrieved payment intent status:', retrievedIntent.status);
    console.log(`${colors.green}✓ Payment intent retrieved successfully${colors.reset}\n`);

    // Display test card information
    console.log(`${colors.bright}Test Card Information:${colors.reset}`);
    console.log(`${colors.yellow}
Use these test card numbers for payment testing:
• 4242 4242 4242 4242 - Successful payment
• 4000 0027 6000 3184 - Requires authentication (3D Secure)
• 4000 0000 0000 9995 - Declined payment

Additional test card details:
• Expiry: Any future date (e.g., 12/25)
• CVC: Any 3 digits (e.g., 123)
• Postal Code: Any 5 digits (e.g., 12345)${colors.reset}
`);

    console.log(`${colors.bright}Integration Test Summary:${colors.reset}`);
    console.log(`${colors.green}✓ Environment variables verified`);
    console.log(`✓ Stripe configuration validated`);
    console.log(`✓ Payment intent creation successful`);
    console.log(`✓ Payment intent retrieval successful${colors.reset}\n`);

  } catch (error) {
    console.error(`${colors.red}Error during Stripe integration test:${colors.reset}`);
    console.error(error);
    process.exit(1);
  }
}

// Run the tests
testStripeIntegration().then(() => {
  console.log(`${colors.bright}Test script completed successfully!${colors.reset}`);
}); 