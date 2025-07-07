const express = require('express');
const admin = require('../config/firebase');
const { authenticateUser, requireAdmin } = require('../middleware/auth');
const router = express.Router();

// All admin routes require authentication and admin privileges
router.use(authenticateUser);
router.use(requireAdmin);

/**
 * GET /api/admin/dashboard
 * Get admin dashboard statistics
 */
router.get('/dashboard', async (req, res) => {
  try {
    const db = admin.firestore();
    
    // Get user statistics
    const usersSnapshot = await db.collection('users').get();
    const activeMembers = usersSnapshot.docs.filter(doc => 
      doc.data().membershipStatus === 'active'
    ).length;
    const totalUsers = usersSnapshot.size;
    
    // Get booking statistics
    const bookingsSnapshot = await db.collection('bookings')
      .where('status', '==', 'active')
      .get();
    const totalBookings = bookingsSnapshot.size;
    
    // Get class statistics
    const classSessionsSnapshot = await db.collection('classSessions').get();
    const totalClasses = classSessionsSnapshot.size;
    
    // Get membership statistics
    const membershipsSnapshot = await db.collection('memberships').get();
    const totalMemberships = membershipsSnapshot.size;
    
    // Get payment history for revenue calculation
    const paymentHistorySnapshot = await db.collection('paymentHistory')
      .where('status', '==', 'succeeded')
      .get();
    
    const totalRevenue = paymentHistorySnapshot.docs.reduce((sum, doc) => {
      return sum + (doc.data().amount || 0);
    }, 0);
    
    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentBookingsSnapshot = await db.collection('bookings')
      .where('registeredAt', '>=', thirtyDaysAgo)
      .orderBy('registeredAt', 'desc')
      .limit(10)
      .get();
    
    const recentBookings = recentBookingsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      registeredAt: doc.data().registeredAt?.toDate?.()?.toISOString() || null
    }));
    
    res.json({
      success: true,
      dashboard: {
        statistics: {
          totalUsers,
          activeMembers,
          totalBookings,
          totalClasses,
          totalMemberships,
          totalRevenue: totalRevenue / 100, // Convert from cents to dollars
          inactiveMembers: totalUsers - activeMembers
        },
        recentActivity: recentBookings
      }
    });
  } catch (error) {
    console.error('Error fetching admin dashboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/admin/users
 * Get all users with pagination and filtering
 */
router.get('/users', async (req, res) => {
  try {
    const db = admin.firestore();
    const { page = 1, limit = 20, status, search } = req.query;
    
    let query = db.collection('users');
    
    // Filter by membership status
    if (status && status !== 'all') {
      query = query.where('membershipStatus', '==', status);
    }
    
    // Get total count for pagination
    const totalSnapshot = await query.get();
    const total = totalSnapshot.size;
    
    // Apply pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    query = query.orderBy('createdAt', 'desc').limit(parseInt(limit)).offset(offset);
    
    const usersSnapshot = await query.get();
    const users = usersSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email,
        displayName: data.displayName,
        membershipStatus: data.membershipStatus,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
        registeredClasses: data.registeredClasses || [],
        membership: data.membership || null
      };
    });
    
    // Apply search filter on client side (for simplicity)
    let filteredUsers = users;
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredUsers = users.filter(user => 
        user.email?.toLowerCase().includes(searchTerm) ||
        user.displayName?.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json({
      success: true,
      users: filteredUsers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/admin/users/:userId
 * Get detailed user information
 */
router.get('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const db = admin.firestore();
    
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const userData = userDoc.data();
    
    // Get user's bookings
    const bookingsSnapshot = await db.collection('bookings')
      .where('userId', '==', userId)
      .orderBy('registeredAt', 'desc')
      .get();
    
    const bookings = bookingsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      registeredAt: doc.data().registeredAt?.toDate?.()?.toISOString() || null,
      cancelledAt: doc.data().cancelledAt?.toDate?.()?.toISOString() || null
    }));
    
    // Get user's payment history
    const paymentHistorySnapshot = await db.collection('paymentHistory')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    
    const paymentHistory = paymentHistorySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null
    }));
    
    res.json({
      success: true,
      user: {
        id: userDoc.id,
        ...userData,
        createdAt: userData.createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: userData.updatedAt?.toDate?.()?.toISOString() || null,
        bookings,
        paymentHistory
      }
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/admin/users/:userId
 * Update user information
 */
router.put('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { displayName, membershipStatus, isAdmin } = req.body;
    const db = admin.firestore();
    
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const updateData = {
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    if (displayName !== undefined) updateData.displayName = displayName;
    if (membershipStatus !== undefined) updateData.membershipStatus = membershipStatus;
    if (isAdmin !== undefined) updateData.isAdmin = isAdmin;
    
    await userRef.update(updateData);
    
    res.json({
      success: true,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/admin/users/:userId
 * Delete user account
 */
router.delete('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const db = admin.firestore();
    
    // Delete user from Firebase Auth
    await admin.auth().deleteUser(userId);
    
    // Delete user document from Firestore
    await db.collection('users').doc(userId).delete();
    
    // Cancel all active bookings
    const bookingsSnapshot = await db.collection('bookings')
      .where('userId', '==', userId)
      .where('status', '==', 'active')
      .get();
    
    const batch = db.batch();
    bookingsSnapshot.docs.forEach(doc => {
      batch.update(doc.ref, {
        status: 'cancelled',
        cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
        cancelledBy: 'admin'
      });
    });
    await batch.commit();
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/admin/bookings
 * Get all bookings with filtering and pagination
 */
router.get('/bookings', async (req, res) => {
  try {
    const db = admin.firestore();
    const { page = 1, limit = 20, status, classId, userId } = req.query;
    
    let query = db.collection('bookings');
    
    // Apply filters
    if (status && status !== 'all') {
      query = query.where('status', '==', status);
    }
    if (classId) {
      query = query.where('classSessionId', '==', classId);
    }
    if (userId) {
      query = query.where('userId', '==', userId);
    }
    
    // Get total count
    const totalSnapshot = await query.get();
    const total = totalSnapshot.size;
    
    // Apply pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    query = query.orderBy('registeredAt', 'desc').limit(parseInt(limit)).offset(offset);
    
    const bookingsSnapshot = await query.get();
    const bookings = bookingsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      registeredAt: doc.data().registeredAt?.toDate?.()?.toISOString() || null,
      cancelledAt: doc.data().cancelledAt?.toDate?.()?.toISOString() || null
    }));
    
    res.json({
      success: true,
      bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/admin/bookings
 * Manually register a user for a class
 */
router.post('/bookings', async (req, res) => {
  try {
    const { userId, classSessionId } = req.body;
    const db = admin.firestore();
    
    if (!userId || !classSessionId) {
      return res.status(400).json({ error: 'User ID and class session ID are required' });
    }
    
    // Check if user exists
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if class exists
    const classDoc = await db.collection('classSessions').doc(classSessionId).get();
    if (!classDoc.exists) {
      return res.status(404).json({ error: 'Class session not found' });
    }
    
    const classData = classDoc.data();
    
    // Check for existing booking
    const existingBooking = await db.collection('bookings')
      .where('userId', '==', userId)
      .where('classSessionId', '==', classSessionId)
      .where('status', '==', 'active')
      .get();
    
    if (!existingBooking.empty) {
      return res.status(400).json({ error: 'User is already registered for this class' });
    }
    
    // Create booking
    const bookingData = {
      userId,
      classSessionId,
      classTitle: classData.title,
      classDay: classData.day,
      classStartTime: classData.startTime,
      classEndTime: classData.endTime,
      status: 'active',
      registeredAt: admin.firestore.FieldValue.serverTimestamp(),
      registeredBy: 'admin',
      adminUserId: req.user.uid
    };
    
    const bookingRef = await db.collection('bookings').add(bookingData);
    
    // Update user's registered classes
    await db.collection('users').doc(userId).update({
      registeredClasses: admin.firestore.FieldValue.arrayUnion(classSessionId),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.status(201).json({
      success: true,
      message: 'User registered for class successfully',
      booking: {
        id: bookingRef.id,
        ...bookingData
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/admin/analytics
 * Get analytics data
 */
router.get('/analytics', async (req, res) => {
  try {
    const db = admin.firestore();
    const { period = '30' } = req.query; // days
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));
    
    // Get registration trends
    const bookingsSnapshot = await db.collection('bookings')
      .where('registeredAt', '>=', startDate)
      .orderBy('registeredAt', 'asc')
      .get();
    
    // Group bookings by day
    const bookingsByDay = {};
    bookingsSnapshot.docs.forEach(doc => {
      const date = doc.data().registeredAt?.toDate?.();
      if (date) {
        const day = date.toISOString().split('T')[0];
        bookingsByDay[day] = (bookingsByDay[day] || 0) + 1;
      }
    });
    
    // Get popular classes
    const classPopularity = {};
    bookingsSnapshot.docs.forEach(doc => {
      const classTitle = doc.data().classTitle;
      if (classTitle) {
        classPopularity[classTitle] = (classPopularity[classTitle] || 0) + 1;
      }
    });
    
    // Get membership status distribution
    const usersSnapshot = await db.collection('users').get();
    const membershipDistribution = {};
    usersSnapshot.docs.forEach(doc => {
      const status = doc.data().membershipStatus || 'none';
      membershipDistribution[status] = (membershipDistribution[status] || 0) + 1;
    });
    
    // Get revenue trends
    const paymentHistorySnapshot = await db.collection('paymentHistory')
      .where('createdAt', '>=', startDate)
      .where('status', '==', 'succeeded')
      .orderBy('createdAt', 'asc')
      .get();
    
    const revenueByDay = {};
    paymentHistorySnapshot.docs.forEach(doc => {
      const date = doc.data().createdAt?.toDate?.();
      const amount = doc.data().amount || 0;
      if (date) {
        const day = date.toISOString().split('T')[0];
        revenueByDay[day] = (revenueByDay[day] || 0) + amount;
      }
    });
    
    res.json({
      success: true,
      analytics: {
        bookingTrends: Object.entries(bookingsByDay).map(([date, count]) => ({
          date,
          bookings: count
        })),
        classPopularity: Object.entries(classPopularity)
          .map(([className, count]) => ({ className, bookings: count }))
          .sort((a, b) => b.bookings - a.bookings),
        membershipDistribution: Object.entries(membershipDistribution).map(([status, count]) => ({
          status,
          count
        })),
        revenueTrends: Object.entries(revenueByDay).map(([date, amount]) => ({
          date,
          revenue: amount / 100 // Convert from cents
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 