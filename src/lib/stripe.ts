import { loadStripe } from '@stripe/stripe-js';

// This is your test publishable API key.
const stripePromise = loadStripe('pk_test_51RgxeGR4cRg9W88kXgYqPXHQoVGDCGkWxVYq5H5RJKXRDtKnuMVQzrDvqQGktSHkWzGUYwdMeRlrF9WKJFHzXpB800FPBzPwbH');

export default stripePromise; 