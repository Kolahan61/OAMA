const express = require('express');
const { admin } = require('../config/firebase'); // Import admin from our config
const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', async (req, res) => {
  try {
    console.log('🚀 Registration attempt started');
    console.log('📝 Request body:', {
      displayName: req.body.displayName,
      email: req.body.email,
      password: req.body.password ? '***hidden***' : 'missing'
    });
    
    const { email, password, displayName } = req.body;

    // Validate required fields
    if (!email || !password || !displayName) {
      console.log('❌ Validation failed: missing fields');
      return res.status(400).json({ 
        error: 'Email, password, and display name are required' 
      });
    }

    console.log('🔐 Creating user in Firebase Auth...');
    
    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email: email.trim(),
      password: password,
      displayName: displayName.trim(),
    });

    console.log('✅ User created in Firebase Auth:', userRecord.uid);

    // Create user document in Firestore
    const userDoc = {
      email: userRecord.email,
      displayName: userRecord.displayName,
      membershipStatus: 'none', // 'none', 'active', 'inactive', 'trial'
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      registeredClasses: [],
      isAdmin: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    console.log('📄 Creating user document in Firestore...');
    await admin.firestore().collection('users').doc(userRecord.uid).set(userDoc);
    console.log('✅ User document created in Firestore');

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName
      }
    });

    console.log('🎉 Registration completed successfully');
    
  } catch (error) {
    console.error('❌ Error creating user:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    
    // Handle specific Firebase Auth errors
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    if (error.code === 'auth/invalid-email') {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    if (error.code === 'auth/weak-password') {
      return res.status(400).json({ error: 'Password is too weak (minimum 6 characters)' });
    }
    if (error.code === 'auth/operation-not-allowed') {
      return res.status(400).json({ error: 'Email/password sign-in is not enabled' });
    }

    res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message,
      code: error.code 
    });
  }
});

/**
 * POST /api/auth/login
 * Verify Firebase ID token and return user data
 */
router.post('/login', async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'ID token is required' });
    }

    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Get user document from Firestore
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();

    res.json({
      success: true,
      user: {
        uid: uid,
        email: userData.email,
        displayName: userData.displayName,
        membershipStatus: userData.membershipStatus,
        registeredClasses: userData.registeredClasses || [],
        isAdmin: userData.isAdmin || false
      }
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

/**
 * GET /api/auth/user
 * Get current user data
 */
router.get('/user', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Get user document from Firestore
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();

    res.json({
      success: true,
      user: {
        uid: uid,
        email: userData.email,
        displayName: userData.displayName,
        membershipStatus: userData.membershipStatus,
        registeredClasses: userData.registeredClasses || [],
        stripeCustomerId: userData.stripeCustomerId,
        stripeSubscriptionId: userData.stripeSubscriptionId,
        isAdmin: userData.isAdmin || false
      }
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

/**
 * PUT /api/auth/user
 * Update user profile
 */
router.put('/user', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const { displayName, email } = req.body;
    const updates = {};

    if (displayName) {
      updates.displayName = displayName;
      // Update in Firebase Auth as well
      await admin.auth().updateUser(uid, { displayName });
    }

    if (email) {
      updates.email = email;
      // Update in Firebase Auth as well
      await admin.auth().updateUser(uid, { email });
    }

    if (Object.keys(updates).length > 0) {
      updates.updatedAt = admin.firestore.FieldValue.serverTimestamp();
      await admin.firestore().collection('users').doc(uid).update(updates);
    }

    res.json({
      success: true,
      message: 'User profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/auth/user
 * Delete user account
 */
router.delete('/user', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Delete user document from Firestore
    await admin.firestore().collection('users').doc(uid).delete();

    // Delete user from Firebase Auth
    await admin.auth().deleteUser(uid);

    res.json({
      success: true,
      message: 'User account deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/auth/reset-password
 * Send password reset email
 */
router.post('/reset-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate password reset link
    const resetLink = await admin.auth().generatePasswordResetLink(email);

    // In a production app, you would send this via email
    // For now, we'll just return success
    res.json({
      success: true,
      message: 'Password reset email sent',
      // Remove this in production - only for testing
      resetLink: resetLink
    });
  } catch (error) {
    console.error('Error sending password reset:', error);
    
    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 