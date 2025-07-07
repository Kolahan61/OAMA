# OAMA Martial Arts Gym - Setup Instructions

## Project Status Summary

Your project has achieved **Phase 1 (85%)** and **Phase 2 (75%)** completion. The core infrastructure is in place, but needs configuration and data initialization to become fully operational.

## Quick Start Guide

### 1. Environment Configuration

Create two environment files:

**`.env.local` (in project root)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**`server/.env`**
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key
STRIPE_SECRET_KEY=sk_test_your-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

### 2. Initialize Firestore Data

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Initialize Firestore collections
node scripts/init-firestore.js
# OR for just memberships:
node scripts/init-memberships.js
```

### 3. Set Up Stripe Products

1. Log into your Stripe Dashboard
2. Create products and prices for each membership type
3. Copy the Price IDs (starting with `price_`)
4. Update the `stripePriceId` values in the initialization scripts

### 4. Start the Application

```bash
# Terminal 1 - Start Backend
cd server
npm run dev

# Terminal 2 - Start Frontend
cd ..
npm run dev
```

Visit http://localhost:3000 to see your application!

## What's Working Now ✅

1. **Authentication System**
   - User registration and login
   - Firebase Auth integration
   - Protected routes

2. **Content Display**
   - Programs page with filtering
   - Schedule display
   - Membership options

3. **Payment Flow**
   - Stripe checkout sessions
   - Payment processing endpoints
   - Success page for redirects

## What Still Needs Work ⚠️

### Immediate Priorities:
1. **Configure Stripe Webhook** in Stripe Dashboard pointing to `http://localhost:5000/api/stripe/webhook`
2. **Test Payment Flow** with Stripe test cards
3. **Verify Firebase Rules** for security

### Next Features to Implement:
1. **Class Booking System**
   - Add booking endpoints to backend
   - Add booking UI to schedule page
   - Track registered users per class

2. **Enhanced User Dashboard**
   - Display active membership
   - Show booked classes
   - Payment history

3. **Admin Panel**
   - CRUD for memberships
   - CRUD for programs
   - Class schedule management
   - User management

## Testing the Payment Flow

1. Use Stripe test card: `4242 4242 4242 4242`
2. Any future expiry date and any 3-digit CVC
3. The flow should:
   - Create a checkout session
   - Redirect to Stripe
   - Return to `/success` page
   - Update user membership status

## Troubleshooting

### "No memberships found"
Run the initialization script: `node server/scripts/init-memberships.js`

### Payment fails
1. Check Stripe keys in server/.env
2. Ensure Stripe Price IDs match your dashboard
3. Check server console for error details

### Firebase errors
1. Verify serviceAccountKey.json is in server/ directory
2. Check Firebase project settings match .env.local
3. Ensure Firestore is enabled in Firebase Console

## Next Steps for Full Production

1. **Security**
   - Set up Firestore security rules
   - Enable HTTPS for production
   - Add rate limiting

2. **Features**
   - Implement recurring subscriptions
   - Add email notifications
   - Build admin dashboard

3. **Optimization**
   - Add caching
   - Optimize images
   - Implement proper error logging

## Support Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## Quick Commands Reference

```bash
# Backend
cd server
npm install
npm run dev         # Start server on port 5000

# Frontend
npm install
npm run dev         # Start Next.js on port 3000

# Initialize Data
cd server
node scripts/init-firestore.js

# Test Stripe
node scripts/test-stripe.js
``` 