import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const getStripeConfig = async (): Promise<string> => {
  try {
    const response = await fetch('http://localhost:5000/api/stripe/config');
    if (!response.ok) {
      throw new Error(`Failed to fetch Stripe config: ${response.status}`);
    }
    const { publishableKey } = await response.json();
    return publishableKey;
  } catch (error) {
    console.error('Error fetching Stripe configuration:', error);
    throw new Error('Failed to initialize payment system. Please try again later.');
  }
};

export const getStripe = async (): Promise<Stripe | null> => {
  if (!stripePromise) {
    try {
      const publishableKey = await getStripeConfig();
      stripePromise = loadStripe(publishableKey);
    } catch (error) {
      console.error('Error initializing Stripe:', error);
      // Re-throw the error to be handled by the component
      throw error;
    }
  }
  return stripePromise;
};

// Helper function to check if Stripe is initialized
export const isStripeInitialized = (): boolean => {
  return !!stripePromise;
};

// Helper function to reset Stripe instance (useful for testing or when config changes)
export const resetStripe = (): void => {
  stripePromise = undefined as unknown as Promise<Stripe | null>;
};

// Error types for better error handling in components
export class StripeConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StripeConfigError';
  }
}

export class StripeInitializationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StripeInitializationError';
  }
} 