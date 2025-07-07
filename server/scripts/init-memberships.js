const { db } = require('../config/firebase');

const memberships = [
  {
    id: 'adults-membership',
    name: 'Adult Membership',
    price: 149.99,
    billingCycle: 'per month',
    features: [
      'Unlimited Muay Thai Classes',
      'Unlimited BJJ Classes',
      'Access to Open Mat Sessions',
      'Free Uniform & Equipment',
      'Member-Only Events',
      'Fitness & Conditioning Classes'
    ],
    stripePriceId: 'price_1RgxeGR4cRg9W88k1234567890' // Replace with actual Stripe Price ID
  },
  {
    id: 'kids-membership',
    name: 'Kids Membership',
    price: 129.99,
    billingCycle: 'per month',
    features: [
      'Age-Appropriate Classes',
      'Character Development',
      'Anti-Bullying Training',
      'Free Uniform',
      'Belt Testing Included',
      'Parent Progress Reports'
    ],
    stripePriceId: 'price_1RgxeGR4cRg9W88k0987654321' // Replace with actual Stripe Price ID
  },
  {
    id: 'tiny-tigers-membership',
    name: 'Tiny Tigers Membership',
    price: 99.99,
    billingCycle: 'per month',
    features: [
      'Fun & Safe Environment',
      'Basic Motor Skills Development',
      'Social Skills Training',
      'Free Uniform',
      'Parent-Child Activities',
      'Monthly Progress Reports'
    ],
    stripePriceId: 'price_1RgxeGR4cRg9W88k5678901234' // Replace with actual Stripe Price ID
  }
];

async function initializeMemberships() {
  try {
    // Get a batch write instance
    const batch = db.batch();

    // Add each membership to the batch
    for (const membership of memberships) {
      const { id, ...data } = membership;
      const docRef = db.collection('memberships').doc(id);
      batch.set(docRef, data);
    }

    // Commit the batch
    await batch.commit();
    console.log('Successfully initialized memberships in Firestore');
  } catch (error) {
    console.error('Error initializing memberships:', error);
  } finally {
    process.exit();
  }
}

// Run the initialization
initializeMemberships(); 