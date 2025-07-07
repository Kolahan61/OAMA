// server/server.js

// Load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { db, auth } = require('./config/firebase'); // Import Firebase config
const programsRouter = require('./routes/programs'); // Import the programs router
const classSessionsRouter = require('./routes/classSessions'); // Import the classSessions router
const membershipsRouter = require('./routes/memberships'); // Import the memberships router
const stripeRouter = require('./routes/stripe'); // Import the new stripe router
const authRouter = require('./routes/auth');
const bookingsRouter = require('./routes/bookings'); // Import the bookings router
const adminRouter = require('./routes/admin'); // Import the admin router
const { authenticateUser } = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON body parsing

// API Routes
app.use('/api/programs', programsRouter); // Use the programs router
app.use('/api/class-sessions', classSessionsRouter); // Use the class sessions router
app.use('/api/memberships', membershipsRouter); // Use the memberships router
app.use('/api/stripe', stripeRouter); // Use the new stripe router
app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingsRouter); // Use the bookings router
app.use('/api/admin', adminRouter); // Use the admin router

// Auth routes
app.use('/api/protected', authenticateUser, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
  console.log('Firebase Admin SDK initialized successfully.');
});

// Export db for use in other modules if needed (e.g., for direct Firestore operations)
module.exports = { db };
