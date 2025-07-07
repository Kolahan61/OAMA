// server/config/firebase.js

// Import the Firebase Admin SDK
const admin = require('firebase-admin');
// Import the dotenv library to load environment variables from .env file
require('dotenv').config();

// Check if Firebase is already initialized
if (!admin.apps.length) {
  // Load the service account key from the JSON file
  let serviceAccount;
  try {
    serviceAccount = require('../serviceAccountKey.json');
    console.log('✅ Service account loaded successfully');
  } catch (error) {
    console.error('❌ Error loading Firebase service account:', error);
    process.exit(1); // Exit if we can't load the service account
  }

  try {
    // Initialize the Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id
    });
    
    console.log('🚀 Firebase Admin SDK initialized successfully');
    console.log('📊 Project ID:', serviceAccount.project_id);
  } catch (error) {
    console.error('❌ Error initializing Firebase Admin SDK:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
} else {
  console.log('♻️ Firebase Admin SDK already initialized');
}

// Export the admin instance and convenience shortcuts
module.exports = {
  admin,
  db: admin.firestore(),
  auth: admin.auth()
};
