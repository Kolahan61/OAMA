require('dotenv').config();
const { db } = require('../config/firebase');

// Sample membership data
const memberships = [
  {
    id: 'adults-unlimited-bjj',
    name: 'Adults Unlimited BJJ',
    price: 99.95,
    billingCycle: 'Monthly',
    features: [
      'Unlimited BJJ Classes',
      'Access to Open Mat',
      'Online Resources',
      'Gi and No-Gi Training'
    ],
    stripePriceId: 'price_1RgxmyR4cRg9W88kSyaMDUTl', // Replace with actual Stripe Price ID
    description: 'Perfect for adults who want unlimited access to all Brazilian Jiu-Jitsu classes.',
    isActive: true
  },
  {
    id: 'adults-unlimited-muay-thai',
    name: 'Adults Unlimited Muay Thai',
    price: 79.95,
    billingCycle: 'Monthly',
    features: [
      'Unlimited Muay Thai Classes',
      'Conditioning Sessions',
      'Sparring Access',
      'Equipment Usage'
    ],
    stripePriceId: 'price_1RgxmyR4cRg9W88kSyaMDUTl', // Replace with actual Stripe Price ID
    description: 'Complete access to all Muay Thai training sessions and conditioning classes.',
    isActive: true
  },
  {
    id: 'kids-unlimited',
    name: 'Kids Unlimited',
    price: 59.95,
    billingCycle: 'Monthly',
    features: [
      'All Kids BJJ Classes',
      'All Kids Muay Thai Classes',
      'After School Program',
      'Character Development'
    ],
    stripePriceId: 'price_1RgxnYR4cRg9W88k3GrRzxcR', // Replace with actual Stripe Price ID
    description: 'Comprehensive martial arts program for children with character development focus.',
    isActive: true
  },
  {
    id: 'tiny-tigers',
    name: 'Tiny Tigers',
    price: 59.95,
    billingCycle: 'Monthly',
    features: [
      'Age-appropriate training',
      'Motor skill development',
      'Discipline and respect',
      'Fun and engaging classes'
    ],
    stripePriceId: 'price_1RgxnvR4cRg9W88kzRSACAAG', // Replace with actual Stripe Price ID
    description: 'Specially designed program for our youngest students aged 4-6.',
    isActive: true
  }
];

// Complete programs data
const programs = [
  {
    id: 'bjj',
    name: 'Brazilian Jiu-Jitsu',
    description: 'Learn the art of ground fighting and self-defense through Brazilian Jiu-Jitsu.',
    targetAgeGroup: { min: 16, max: null, label: '16+' },
    skillLevels: ['Beginner', 'Intermediate', 'Advanced'],
    isActive: true,
    iconUrl: '/images/programs/bjj.jpg',
    colorCode: '#8B0000',
    benefits: [
      'Improved physical fitness and flexibility',
      'Self-defense skills and confidence',
      'Mental discipline and stress relief',
      'Community and friendship building',
      'Problem-solving and strategic thinking'
    ],
    requirements: ['No prior experience needed', 'Comfortable workout clothes', 'Open mind and willingness to learn'],
    schedule: [
      { day: 'Monday', times: ['07:00-08:00', '12:00-13:00', '19:00-20:30'] },
      { day: 'Wednesday', times: ['07:00-08:00'] },
      { day: 'Thursday', times: ['12:00-13:00'] },
      { day: 'Friday', times: ['12:00-13:00'] },
      { day: 'Saturday', times: ['12:30-14:00'] }
    ],
    instructors: []
  },
  {
    id: 'muay-thai',
    name: 'Muay Thai',
    description: 'Master the art of eight limbs with traditional Muay Thai training.',
    targetAgeGroup: { min: 16, max: null, label: '16+' },
    skillLevels: ['Beginner', 'Intermediate', 'Advanced'],
    isActive: true,
    iconUrl: '/images/programs/muay-thai.jpg',
    colorCode: '#FF6B35',
    benefits: [
      'Full-body cardiovascular workout',
      'Improved coordination and balance',
      'Stress relief and mental focus',
      'Traditional martial arts discipline',
      'Effective striking techniques'
    ],
    requirements: ['No prior experience needed', 'Hand wraps recommended', 'Water bottle'],
    schedule: [
      { day: 'Tuesday', times: ['12:00-13:00'] },
      { day: 'Wednesday', times: ['19:00-20:00'] },
      { day: 'Friday', times: ['19:00-20:00'] }
    ],
    instructors: []
  },
  {
    id: 'kids-bjj',
    name: 'Kids Brazilian Jiu-Jitsu',
    description: 'Age-appropriate BJJ training focused on technique, discipline, and fun.',
    targetAgeGroup: { min: 7, max: 15, label: '7-15' },
    skillLevels: ['Beginner', 'Intermediate', 'Advanced'],
    isActive: true,
    iconUrl: '/images/programs/kids-bjj.jpg',
    colorCode: '#4A90E2',
    benefits: [
      'Character development and discipline',
      'Physical fitness and coordination',
      'Confidence and self-esteem building',
      'Bullying prevention skills',
      'Focus and concentration improvement'
    ],
    requirements: ['Age 7-15', 'Parental consent', 'Comfortable athletic wear'],
    schedule: [
      { day: 'Tuesday', times: ['17:30-18:15'] },
      { day: 'Saturday', times: ['10:15-11:00'] }
    ],
    instructors: []
  },
  {
    id: 'kids-muay-thai',
    name: 'Kids Muay Thai',
    description: 'Traditional Muay Thai adapted for children with emphasis on respect and discipline.',
    targetAgeGroup: { min: 7, max: 15, label: '7-15' },
    skillLevels: ['Beginner', 'Intermediate'],
    isActive: true,
    iconUrl: '/images/programs/kids-muay-thai.jpg',
    colorCode: '#F5A623',
    benefits: [
      'Traditional martial arts values',
      'Cardiovascular fitness',
      'Respect and discipline',
      'Cultural appreciation',
      'Coordination and balance'
    ],
    requirements: ['Age 7-15', 'Parental consent', 'Athletic wear'],
    schedule: [
      { day: 'Thursday', times: ['17:30-18:15'] }
    ],
    instructors: []
  },
  {
    id: 'tiny-tigers',
    name: 'Tiny Tigers',
    description: 'Introduction to martial arts for our youngest students with focus on motor skills and fun.',
    targetAgeGroup: { min: 4, max: 6, label: '4-6' },
    skillLevels: ['Beginner'],
    isActive: true,
    iconUrl: '/images/programs/tiny-tigers.jpg',
    colorCode: '#BD10E0',
    benefits: [
      'Motor skill development',
      'Following instructions',
      'Social interaction',
      'Basic coordination',
      'Fun and engaging activities'
    ],
    requirements: ['Age 4-6', 'Parental supervision', 'Comfortable play clothes'],
    schedule: [
      { day: 'Wednesday', times: ['16:45-17:30'] },
      { day: 'Saturday', times: ['09:15-10:00'] }
    ],
    instructors: []
  },
  {
    id: 'womens-only',
    name: 'Women\'s Only Classes',
    description: 'Dedicated training sessions for women in a comfortable and supportive environment.',
    targetAgeGroup: { min: 16, max: null, label: '16+' },
    skillLevels: ['Beginner', 'Intermediate', 'Advanced'],
    isActive: true,
    iconUrl: '/images/programs/womens-only.jpg',
    colorCode: '#E91E63',
    benefits: [
      'Supportive women-only environment',
      'Confidence building',
      'Self-defense training',
      'Community and friendships',
      'Comfortable learning space'
    ],
    requirements: ['Women only', 'No prior experience needed', 'Comfortable workout clothes'],
    schedule: [
      { day: 'Tuesday', times: ['18:15-19:00'] }
    ],
    instructors: []
  },
  {
    id: 'after-school',
    name: 'After School Program',
    description: 'Comprehensive after-school care with martial arts training, homework help, and activities.',
    targetAgeGroup: { min: 6, max: 14, label: '6-14' },
    skillLevels: ['All Levels'],
    isActive: true,
    iconUrl: '/images/programs/after-school.jpg',
    colorCode: '#9C27B0',
    benefits: [
      'Homework assistance',
      'Martial arts training',
      'Structured activities',
      'Safe after-school environment',
      'Character development'
    ],
    requirements: ['Age 6-14', 'School pickup available', 'Registration required'],
    schedule: [
      { day: 'Monday-Friday', times: ['15:30-18:00'] }
    ],
    instructors: []
  }
];

// Complete class sessions data
const classSessions = [
  // Monday BJJ
  {
    id: 'bjj-mon-7am',
    title: 'BJJ Fundamentals',
    day: 'Monday',
    startTime: '07:00',
    endTime: '08:00',
    category: 'Adult BJJ',
    programId: 'bjj',
    description: 'Morning fundamentals class focusing on basic techniques and drilling.',
    maxCapacity: 20
  },
  {
    id: 'bjj-mon-12pm',
    title: 'BJJ Fundamentals',
    day: 'Monday',
    startTime: '12:00',
    endTime: '13:00',
    category: 'Adult BJJ',
    programId: 'bjj',
    description: 'Lunch hour fundamentals perfect for beginners and technique refinement.',
    maxCapacity: 20
  },
  {
    id: 'bjj-mon-7pm',
    title: 'BJJ Advanced',
    day: 'Monday',
    startTime: '19:00',
    endTime: '20:30',
    category: 'Adult BJJ',
    programId: 'bjj',
    description: 'Advanced techniques and live rolling for experienced practitioners.',
    maxCapacity: 25
  },
  
  // Tuesday Classes
  {
    id: 'mt-conditioning-tue-12pm',
    title: 'Muay Thai Conditioning',
    day: 'Tuesday',
    startTime: '12:00',
    endTime: '13:00',
    category: 'Adult Muay Thai',
    programId: 'muay-thai',
    description: 'High-intensity conditioning class to build strength and endurance.',
    maxCapacity: 15
  },
  {
    id: 'women-bjj-tue',
    title: 'Women\'s BJJ',
    day: 'Tuesday',
    startTime: '18:15',
    endTime: '19:00',
    category: 'Women',
    programId: 'womens-only',
    description: 'BJJ training in a supportive women-only environment.',
    maxCapacity: 15
  },
  {
    id: 'kids-bjj-tue',
    title: 'Kids BJJ',
    day: 'Tuesday',
    startTime: '17:30',
    endTime: '18:15',
    category: 'Kids',
    programId: 'kids-bjj',
    description: 'Fun and engaging BJJ training for children.',
    maxCapacity: 20
  },
  
  // Wednesday Classes
  {
    id: 'bjj-wed-7am',
    title: 'BJJ Fundamentals',
    day: 'Wednesday',
    startTime: '07:00',
    endTime: '08:00',
    category: 'Adult BJJ',
    programId: 'bjj',
    description: 'Morning fundamentals class focusing on basic techniques.',
    maxCapacity: 20
  },
  {
    id: 'mt-technique-wed',
    title: 'Muay Thai Technique',
    day: 'Wednesday',
    startTime: '19:00',
    endTime: '20:00',
    category: 'Adult Muay Thai',
    programId: 'muay-thai',
    description: 'Technical Muay Thai training focusing on proper form and combinations.',
    maxCapacity: 18
  },
  {
    id: 'tiny-tigers-wed',
    title: 'Tiny Tigers',
    day: 'Wednesday',
    startTime: '16:45',
    endTime: '17:30',
    category: 'Tiny Tigers',
    programId: 'tiny-tigers',
    description: 'Fun martial arts introduction for our youngest students.',
    maxCapacity: 12
  },
  
  // Thursday Classes
  {
    id: 'bjj-thu-12pm',
    title: 'BJJ Fundamentals',
    day: 'Thursday',
    startTime: '12:00',
    endTime: '13:00',
    category: 'Adult BJJ',
    programId: 'bjj',
    description: 'Lunch hour fundamentals class.',
    maxCapacity: 20
  },
  {
    id: 'kids-muay-thai-thu',
    title: 'Kids Muay Thai',
    day: 'Thursday',
    startTime: '17:30',
    endTime: '18:15',
    category: 'Kids',
    programId: 'kids-muay-thai',
    description: 'Traditional Muay Thai training adapted for children.',
    maxCapacity: 18
  },
  
  // Friday Classes
  {
    id: 'nogi-fri-12pm',
    title: 'No-Gi BJJ',
    day: 'Friday',
    startTime: '12:00',
    endTime: '13:00',
    category: 'Adult BJJ',
    programId: 'bjj',
    description: 'No-Gi Brazilian Jiu-Jitsu techniques and sparring.',
    maxCapacity: 20
  },
  {
    id: 'mt-sparring-fri',
    title: 'Muay Thai Sparring',
    day: 'Friday',
    startTime: '19:00',
    endTime: '20:00',
    category: 'Adult Muay Thai',
    programId: 'muay-thai',
    description: 'Controlled sparring session for experienced practitioners.',
    maxCapacity: 16
  },
  
  // Saturday Classes
  {
    id: 'kids-bjj-sat',
    title: 'Kids BJJ',
    day: 'Saturday',
    startTime: '10:15',
    endTime: '11:00',
    category: 'Kids',
    programId: 'kids-bjj',
    description: 'Weekend BJJ training for children.',
    maxCapacity: 20
  },
  {
    id: 'openmat-sat',
    title: 'Open Mat',
    day: 'Saturday',
    startTime: '12:30',
    endTime: '14:00',
    category: 'Adult BJJ',
    programId: 'bjj',
    description: 'Open training session for all levels.',
    maxCapacity: 30
  },
  {
    id: 'tiny-tigers-sat',
    title: 'Tiny Tigers',
    day: 'Saturday',
    startTime: '09:15',
    endTime: '10:00',
    category: 'Tiny Tigers',
    programId: 'tiny-tigers',
    description: 'Weekend Tiny Tigers class.',
    maxCapacity: 12
  }
];

async function initializeFirestore() {
  try {
    console.log('🔄 Initializing Firestore with sample data...');

    // Initialize memberships collection
    console.log('📝 Adding memberships...');
    const membershipsPromises = memberships.map(membership => 
      db.collection('memberships').doc(membership.id).set(membership)
    );
    await Promise.all(membershipsPromises);
    console.log(`✅ Added ${memberships.length} memberships`);

    // Initialize programs collection
    console.log('📝 Adding programs...');
    const programsPromises = programs.map(program => 
      db.collection('programs').doc(program.id).set(program)
    );
    await Promise.all(programsPromises);
    console.log(`✅ Added ${programs.length} programs`);

    // Initialize class sessions collection
    console.log('📝 Adding class sessions...');
    const classSessionsPromises = classSessions.map(classSession => 
      db.collection('classSessions').doc(classSession.id).set(classSession)
    );
    await Promise.all(classSessionsPromises);
    console.log(`✅ Added ${classSessions.length} class sessions`);

    console.log('🎉 Firestore initialization completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   • ${memberships.length} membership plans`);
    console.log(`   • ${programs.length} programs`);
    console.log(`   • ${classSessions.length} class sessions`);
    console.log('\n💡 Next steps:');
    console.log('   1. Update Stripe Price IDs in memberships');
    console.log('   2. Add program images to public/images/programs/');
    console.log('   3. Test the booking system');

  } catch (error) {
    console.error('❌ Error initializing Firestore:', error);
    throw error;
  }
}

// Run the initialization if this script is executed directly
if (require.main === module) {
  initializeFirestore()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { initializeFirestore }; 