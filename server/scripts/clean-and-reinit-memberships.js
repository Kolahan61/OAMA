require('dotenv').config();
const { db } = require('../config/firebase');

// Clean memberships data with biweekly billing
const memberships = [
  {
    id: 'adults-membership',
    name: 'Adult Membership',
    price: 74.99, // Biweekly price (roughly half of monthly)
    billingCycle: 'biweekly',
    features: [
      'Unlimited BJJ Classes',
      'Unlimited Muay Thai Classes',
      'Access to Open Mat Sessions',
      'Free Gi on Signup',
      'Discounted Private Lessons'
    ],
    stripePriceId: 'price_1RgxmyR4cRg9W88kSyaMDUTl', // Your real Stripe Price ID
    status: 'active',
    category: 'adult',
    description: 'Full access to all adult martial arts programs'
  },
  {
    id: 'kids-membership',
    name: 'Kids Membership',
    price: 64.99, // Biweekly price
    billingCycle: 'biweekly',
    features: [
      'All Kids BJJ Classes',
      'All Kids Muay Thai Classes',
      'Free Gi on Signup',
      'Progress Tracking',
      'Belt Testing Included'
    ],
    stripePriceId: 'price_1RgxnYR4cRg9W88k3GrRzxcR', // Your real Stripe Price ID
    status: 'active',
    category: 'kids',
    description: 'Complete martial arts training for children'
  },
  {
    id: 'tiny-tigers-membership',
    name: 'Tiny Tigers Membership',
    price: 49.99, // Biweekly price
    billingCycle: 'biweekly',
    features: [
      'Age-Appropriate Training',
      'Character Development',
      'Motor Skills Development',
      'Free Uniform',
      'Belt Testing Included'
    ],
    stripePriceId: 'price_1RgxnvR4cRg9W88kzRSACAAG', // Your real Stripe Price ID
    status: 'active',
    category: 'tiny-tigers',
    description: 'Foundational martial arts for young children'
  }
];

async function cleanAndReinitializeMemberships() {
  try {
    console.log('🧹 Cleaning existing memberships...');
    
    // Get all existing membership documents
    const membershipsRef = db.collection('memberships');
    const snapshot = await membershipsRef.get();
    
    // Delete all existing memberships
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log('✓ Deleted all existing memberships');

    // Add the 3 correct memberships
    console.log('💾 Adding clean membership data...');
    for (const membership of memberships) {
      await membershipsRef.doc(membership.id).set(membership);
      console.log(`✓ Added: ${membership.name}`);
    }

    console.log('🎉 Memberships cleaned and reinitialized successfully!');
    console.log(`📋 Total memberships: ${memberships.length}`);
  } catch (error) {
    console.error('❌ Error cleaning memberships:', error);
    process.exit(1);
  }
}

// Run the cleanup
cleanAndReinitializeMemberships().then(() => process.exit(0)); 