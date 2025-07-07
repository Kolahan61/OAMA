const fetch = require('node-fetch');

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

async function testStripeAPI() {
  console.log(`${colors.bright}Starting Stripe API Endpoint Tests${colors.reset}\n`);

  try {
    // 1. Test /api/stripe/config endpoint
    console.log(`${colors.blue}1. Testing /api/stripe/config endpoint:${colors.reset}`);
    const configResponse = await fetch('http://localhost:5000/api/stripe/config');
    
    if (!configResponse.ok) {
      throw new Error(`Config endpoint failed with status: ${configResponse.status}`);
    }

    const configData = await configResponse.json();
    console.log('• Publishable Key received:', configData.publishableKey.substring(0, 10) + '...');
    console.log(`${colors.green}✓ Config endpoint test passed${colors.reset}\n`);

    // 2. Test /api/stripe/create-payment-intent endpoint
    console.log(`${colors.blue}2. Testing /api/stripe/create-payment-intent endpoint:${colors.reset}`);
    console.log('• Sending payment data:', samplePaymentData);

    const intentResponse = await fetch('http://localhost:5000/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(samplePaymentData),
    });

    if (!intentResponse.ok) {
      const errorData = await intentResponse.json();
      throw new Error(`Payment intent creation failed: ${JSON.stringify(errorData)}`);
    }

    const intentData = await intentResponse.json();
    console.log('• Client Secret received:', intentData.clientSecret.substring(0, 10) + '...');
    console.log(`${colors.green}✓ Payment intent endpoint test passed${colors.reset}\n`);

    // Display test information
    console.log(`${colors.bright}API Test Summary:${colors.reset}`);
    console.log(`${colors.green}✓ Config endpoint verified`);
    console.log(`✓ Payment intent creation endpoint verified${colors.reset}\n`);

    console.log(`${colors.yellow}Next Steps for Testing:
1. Start your frontend application
2. Navigate to the membership purchase page
3. Use these test cards for different scenarios:
   • 4242 4242 4242 4242 - Successful payment
   • 4000 0027 6000 3184 - 3D Secure authentication
   • 4000 0000 0000 9995 - Payment decline
   
Remember: Use any future expiry date, any 3 digits for CVC, and any 5 digits for postal code${colors.reset}\n`);

  } catch (error) {
    console.error(`${colors.red}Error during API testing:${colors.reset}`);
    console.error(error);
    process.exit(1);
  }
}

// Run the tests
testStripeAPI().then(() => {
  console.log(`${colors.bright}API test script completed!${colors.reset}`);
}); 