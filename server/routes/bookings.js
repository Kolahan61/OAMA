const express = require('express');
const admin = require('../config/firebase');
const { authenticateUser, requireActiveMembership } = require('../middleware/auth');
const router = express.Router();

/**
 * POST /api/bookings/register
 * Register user for a class
 */
router.post('/register', authenticateUser, async (req, res) => {
  try {
    const { classSessionId } = req.body;
    const userId = req.user.uid;

    if (!classSessionId) {
      return res.status(400).json({ error: 'Class session ID is required' });
    }

    const db = admin.firestore();
    
    // Get class session details
    const classSessionDoc = await db.collection('classSessions').doc(classSessionId).get();
    
    if (!classSessionDoc.exists) {
      return res.status(404).json({ error: 'Class session not found' });
    }

    const classSessionData = classSessionDoc.data();
    
    // Check if class has capacity (optional - you can add capacity field to class sessions)
    const maxCapacity = classSessionData.maxCapacity || 20; // Default capacity
    const currentBookings = await db.collection('bookings')
      .where('classSessionId', '==', classSessionId)
      .where('status', '==', 'active')
      .get();

    if (currentBookings.size >= maxCapacity) {
      return res.status(400).json({ 
        error: 'Class is full',
        message: 'This class has reached maximum capacity' 
      });
    }

    // Check if user is already registered for this class
    const existingBooking = await db.collection('bookings')
      .where('userId', '==', userId)
      .where('classSessionId', '==', classSessionId)
      .where('status', '==', 'active')
      .get();

    if (!existingBooking.empty) {
      return res.status(400).json({ 
        error: 'Already registered',
        message: 'You are already registered for this class' 
      });
    }

    // Create booking document
    const bookingData = {
      userId: userId,
      classSessionId: classSessionId,
      classTitle: classSessionData.title,
      classDay: classSessionData.day,
      classStartTime: classSessionData.startTime,
      classEndTime: classSessionData.endTime,
      status: 'active', // 'active', 'cancelled', 'completed'
      registeredAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const bookingRef = await db.collection('bookings').add(bookingData);

    // Update user's registered classes array
    const userRef = db.collection('users').doc(userId);
    await userRef.update({
      registeredClasses: admin.firestore.FieldValue.arrayUnion(classSessionId),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(201).json({
      success: true,
      message: 'Successfully registered for class',
      booking: {
        id: bookingRef.id,
        ...bookingData,
        registeredAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error registering for class:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/bookings/cancel/:bookingId
 * Cancel a class booking
 */
router.delete('/cancel/:bookingId', authenticateUser, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.uid;

    if (!bookingId) {
      return res.status(400).json({ error: 'Booking ID is required' });
    }

    const db = admin.firestore();
    
    // Get booking document
    const bookingDoc = await db.collection('bookings').doc(bookingId).get();
    
    if (!bookingDoc.exists) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const bookingData = bookingDoc.data();

    // Check if user owns this booking
    if (bookingData.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized to cancel this booking' });
    }

    // Check if booking is already cancelled
    if (bookingData.status === 'cancelled') {
      return res.status(400).json({ error: 'Booking is already cancelled' });
    }

    // Update booking status to cancelled
    await db.collection('bookings').doc(bookingId).update({
      status: 'cancelled',
      cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Remove from user's registered classes array
    const userRef = db.collection('users').doc(userId);
    await userRef.update({
      registeredClasses: admin.firestore.FieldValue.arrayRemove(bookingData.classSessionId),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });

  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/bookings/cancel-by-class
 * Cancel booking by class session ID (alternative method)
 */
router.post('/cancel-by-class', authenticateUser, async (req, res) => {
  try {
    const { classSessionId } = req.body;
    const userId = req.user.uid;

    if (!classSessionId) {
      return res.status(400).json({ error: 'Class session ID is required' });
    }

    const db = admin.firestore();
    
    // Find active booking for this user and class
    const bookingQuery = await db.collection('bookings')
      .where('userId', '==', userId)
      .where('classSessionId', '==', classSessionId)
      .where('status', '==', 'active')
      .get();

    if (bookingQuery.empty) {
      return res.status(404).json({ error: 'No active booking found for this class' });
    }

    const bookingDoc = bookingQuery.docs[0];
    const bookingData = bookingDoc.data();

    // Update booking status to cancelled
    await db.collection('bookings').doc(bookingDoc.id).update({
      status: 'cancelled',
      cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Remove from user's registered classes array
    const userRef = db.collection('users').doc(userId);
    await userRef.update({
      registeredClasses: admin.firestore.FieldValue.arrayRemove(classSessionId),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });

  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/bookings/user
 * Get all bookings for the authenticated user
 */
router.get('/user', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { status = 'active' } = req.query; // Filter by status (active, cancelled, completed, all)

    const db = admin.firestore();
    
    let query = db.collection('bookings').where('userId', '==', userId);
    
    if (status !== 'all') {
      query = query.where('status', '==', status);
    }
    
    const bookingsSnapshot = await query.orderBy('registeredAt', 'desc').get();
    
    const bookings = [];
    bookingsSnapshot.forEach(doc => {
      const data = doc.data();
      bookings.push({
        id: doc.id,
        ...data,
        registeredAt: data.registeredAt?.toDate?.()?.toISOString() || null,
        cancelledAt: data.cancelledAt?.toDate?.()?.toISOString() || null,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null
      });
    });

    res.json({
      success: true,
      bookings: bookings,
      count: bookings.length
    });

  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/bookings/class/:classSessionId
 * Get all bookings for a specific class (admin only or for capacity checking)
 */
router.get('/class/:classSessionId', authenticateUser, async (req, res) => {
  try {
    const { classSessionId } = req.params;
    const { status = 'active' } = req.query;

    if (!classSessionId) {
      return res.status(400).json({ error: 'Class session ID is required' });
    }

    const db = admin.firestore();
    
    let query = db.collection('bookings').where('classSessionId', '==', classSessionId);
    
    if (status !== 'all') {
      query = query.where('status', '==', status);
    }
    
    const bookingsSnapshot = await query.orderBy('registeredAt', 'desc').get();
    
    const bookings = [];
    bookingsSnapshot.forEach(doc => {
      const data = doc.data();
      // Only include user info if requester is admin
      const bookingData = {
        id: doc.id,
        classSessionId: data.classSessionId,
        classTitle: data.classTitle,
        status: data.status,
        registeredAt: data.registeredAt?.toDate?.()?.toISOString() || null,
        cancelledAt: data.cancelledAt?.toDate?.()?.toISOString() || null
      };
      
      // Include user info only if admin or if it's the user's own booking
      if (req.user.isAdmin || data.userId === req.user.uid) {
        bookingData.userId = data.userId;
      }
      
      bookings.push(bookingData);
    });

    res.json({
      success: true,
      bookings: bookings,
      count: bookings.length,
      capacity: {
        registered: bookings.filter(b => b.status === 'active').length,
        // You can add maxCapacity from class session if needed
      }
    });

  } catch (error) {
    console.error('Error fetching class bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/bookings/check/:classSessionId
 * Check if current user is registered for a specific class
 */
router.get('/check/:classSessionId', authenticateUser, async (req, res) => {
  try {
    const { classSessionId } = req.params;
    const userId = req.user.uid;

    if (!classSessionId) {
      return res.status(400).json({ error: 'Class session ID is required' });
    }

    const db = admin.firestore();
    
    const bookingQuery = await db.collection('bookings')
      .where('userId', '==', userId)
      .where('classSessionId', '==', classSessionId)
      .where('status', '==', 'active')
      .get();

    const isRegistered = !bookingQuery.empty;
    let bookingId = null;

    if (isRegistered) {
      bookingId = bookingQuery.docs[0].id;
    }

    res.json({
      success: true,
      isRegistered: isRegistered,
      bookingId: bookingId
    });

  } catch (error) {
    console.error('Error checking booking status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 