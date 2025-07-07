// server/routes/programs.js

const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// GET all programs
router.get('/', async (req, res) => {
  try {
    const programsRef = db.collection('programs');
    const snapshot = await programsRef.where('isActive', '==', true).get();
    
    const programs = [];
    snapshot.forEach(doc => {
      programs.push({ id: doc.id, ...doc.data() });
    });
    
    res.status(200).json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ 
      message: 'Error fetching programs', 
      error: error.message 
    });
  }
});

// GET a single program by ID
router.get('/:id', async (req, res) => {
  try {
    const programId = req.params.id;
    const programRef = db.collection('programs').doc(programId);
    const doc = await programRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Check if program is active
    const program = { id: doc.id, ...doc.data() };
    if (!program.isActive) {
      return res.status(404).json({ message: 'Program not found or inactive' });
    }

    res.status(200).json(program);
  } catch (error) {
    console.error('Error fetching program:', error);
    res.status(500).json({ 
      message: 'Error fetching program', 
      error: error.message 
    });
  }
});

// GET programs by category (e.g., 'adult', 'kids', 'tiny-tigers')
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const programsRef = db.collection('programs');
    const snapshot = await programsRef
      .where('isActive', '==', true)
      .where('targetAgeGroup.label', '==', category)
      .get();
    
    const programs = [];
    snapshot.forEach(doc => {
      programs.push({ id: doc.id, ...doc.data() });
    });
    
    res.status(200).json(programs);
  } catch (error) {
    console.error('Error fetching programs by category:', error);
    res.status(500).json({ 
      message: 'Error fetching programs by category', 
      error: error.message 
    });
  }
});

module.exports = router;
