require('dotenv').config();

console.log('Testing environment variables:');
console.log('--------------------------------');
console.log('PORT:', process.env.PORT);
console.log('STRIPE_PUBLISHABLE_KEY exists:', !!process.env.STRIPE_PUBLISHABLE_KEY);
console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
console.log('STRIPE_WEBHOOK_SECRET exists:', !!process.env.STRIPE_WEBHOOK_SECRET);

// Only show first 8 characters of keys for security
if (process.env.STRIPE_PUBLISHABLE_KEY) {
    console.log('STRIPE_PUBLISHABLE_KEY starts with:', process.env.STRIPE_PUBLISHABLE_KEY.substring(0, 8) + '...');
}
if (process.env.STRIPE_SECRET_KEY) {
    console.log('STRIPE_SECRET_KEY starts with:', process.env.STRIPE_SECRET_KEY.substring(0, 8) + '...');
}
console.log('--------------------------------'); 