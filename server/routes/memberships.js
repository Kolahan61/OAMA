// server/routes/memberships.js

const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase'); // Import the Firestore db instance from firebase config

// GET all membership options from Firestore
router.get('/', async (req, res) => {
  try {
    const membershipsRef = db.collection('memberships');
    const snapshot = await membershipsRef.get();
    
    const memberships = [];
    snapshot.forEach(doc => {
      // doc.id is the document ID, doc.data() contains the fields
      memberships.push({ id: doc.id, ...doc.data() });
    });
    
    // Always return 200 with the memberships array (empty if no documents found)
    res.status(200).json(memberships);
  } catch (error) {
    console.error("Error fetching memberships from Firestore:", error);
    res.status(500).json({ message: 'Error fetching memberships', error: error.message });
  }
});

// GET a single membership option by ID from Firestore
router.get('/:id', async (req, res) => {
  try {
    const membershipId = req.params.id;
    const membershipRef = db.collection('memberships').doc(membershipId);
    const doc = await membershipRef.get();

    if (!doc.exists) {
      console.log('No such membership document!');
      return res.status(404).json({ message: 'Membership not found' });
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.error("Error fetching single membership from Firestore:", error);
    res.status(500).json({ message: 'Error fetching membership', error: error.message });
  }
});

module.exports = router; 