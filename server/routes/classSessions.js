// server/routes/classSessions.js

const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// GET all class sessions with optional filters
router.get('/', async (req, res) => {
  try {
    const { day, programId, category } = req.query;
    let query = db.collection('classSessions');

    // Apply filters if provided
    if (day) {
      query = query.where('day', '==', day);
    }
    if (programId) {
      query = query.where('programId', '==', programId);
    }
    if (category) {
      query = query.where('category', '==', category);
    }

    const snapshot = await query.get();
    const sessions = [];
    snapshot.forEach(doc => {
      sessions.push({ id: doc.id, ...doc.data() });
    });

    // Sort sessions by day and time
    sessions.sort((a, b) => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const dayDiff = days.indexOf(a.day) - days.indexOf(b.day);
      if (dayDiff !== 0) return dayDiff;
      return a.startTime.localeCompare(b.startTime);
    });

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching class sessions:', error);
    res.status(500).json({ 
      message: 'Error fetching class sessions', 
      error: error.message 
    });
  }
});

// GET class sessions by day
router.get('/day/:day', async (req, res) => {
  try {
    const { day } = req.params;
    const snapshot = await db.collection('classSessions')
      .where('day', '==', day)
      .get();

    const sessions = [];
    snapshot.forEach(doc => {
      sessions.push({ id: doc.id, ...doc.data() });
    });

    // Sort by start time
    sessions.sort((a, b) => a.startTime.localeCompare(b.startTime));

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching class sessions by day:', error);
    res.status(500).json({ 
      message: 'Error fetching class sessions by day', 
      error: error.message 
    });
  }
});

// GET class sessions by program
router.get('/program/:programId', async (req, res) => {
  try {
    const { programId } = req.params;
    const snapshot = await db.collection('classSessions')
      .where('programId', '==', programId)
      .get();

    const sessions = [];
    snapshot.forEach(doc => {
      sessions.push({ id: doc.id, ...doc.data() });
    });

    // Sort by day and time
    sessions.sort((a, b) => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const dayDiff = days.indexOf(a.day) - days.indexOf(b.day);
      if (dayDiff !== 0) return dayDiff;
      return a.startTime.localeCompare(b.startTime);
    });

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching class sessions by program:', error);
    res.status(500).json({ 
      message: 'Error fetching class sessions by program', 
      error: error.message 
    });
  }
});

// GET a single class session by ID
router.get('/:id', async (req, res) => {
  try {
    const sessionId = req.params.id;
    const doc = await db.collection('classSessions').doc(sessionId).get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Class session not found' });
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching class session:', error);
    res.status(500).json({ 
      message: 'Error fetching class session', 
      error: error.message 
    });
  }
});

module.exports = router; 