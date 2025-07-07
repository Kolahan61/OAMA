const admin = require('../config/firebase');

/**
 * Middleware to authenticate user via Firebase ID token
 */
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'No token provided' 
      });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Get user data from Firestore
    const userDoc = await admin.firestore().collection('users').doc(decodedToken.uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User document not found in database' 
      });
    }

    const userData = userDoc.data();
    
    // Attach user info to request object
    req.user = {
      uid: decodedToken.uid,
      email: userData.email,
      displayName: userData.displayName,
      membershipStatus: userData.membershipStatus,
      isAdmin: userData.isAdmin || false,
      stripeCustomerId: userData.stripeCustomerId,
      stripeSubscriptionId: userData.stripeSubscriptionId
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ 
        error: 'Token expired',
        message: 'Please log in again' 
      });
    }
    
    if (error.code === 'auth/argument-error') {
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'Token format is invalid' 
      });
    }

    res.status(401).json({ 
      error: 'Authentication failed',
      message: 'Invalid or expired token' 
    });
  }
};

/**
 * Middleware to check if user is admin
 * Must be used after authenticateUser middleware
 */
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'Authentication required' 
    });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({ 
      error: 'Forbidden',
      message: 'Admin access required' 
    });
  }

  next();
};

/**
 * Middleware to check if user has active membership
 * Must be used after authenticateUser middleware
 */
const requireActiveMembership = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'Authentication required' 
    });
  }

  if (req.user.membershipStatus !== 'active') {
    return res.status(403).json({ 
      error: 'Membership required',
      message: 'Active membership required to access this resource' 
    });
  }

  next();
};

/**
 * Optional authentication middleware
 * Adds user info to request if token is present, but doesn't require it
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token provided, continue without user info
      return next();
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Get user data from Firestore
    const userDoc = await admin.firestore().collection('users').doc(decodedToken.uid).get();
    
    if (userDoc.exists) {
      const userData = userDoc.data();
      req.user = {
        uid: decodedToken.uid,
        email: userData.email,
        displayName: userData.displayName,
        membershipStatus: userData.membershipStatus,
        isAdmin: userData.isAdmin || false,
        stripeCustomerId: userData.stripeCustomerId,
        stripeSubscriptionId: userData.stripeSubscriptionId
      };
    }

    next();
  } catch (error) {
    // If token verification fails, continue without user info
    console.warn('Optional auth failed:', error.message);
    next();
  }
};

module.exports = {
  authenticateUser,
  requireAdmin,
  requireActiveMembership,
  optionalAuth
}; 