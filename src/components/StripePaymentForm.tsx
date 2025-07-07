import { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
  CardElement
} from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';

// Types
interface PaymentFormProps {
  amount: number;
  membershipId: string;
  userId: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

interface PaymentFormWrapperProps extends PaymentFormProps {
  publishableKey: string;
}

// Styles for the CardElement
const cardStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

// The actual payment form component
const PaymentForm = ({ amount, membershipId, userId, onSuccess, onError }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe has not been initialized');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Create PaymentIntent
      const createIntentResponse = await fetch('http://localhost:5000/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          membershipId,
          userId,
        }),
      });

      if (!createIntentResponse.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await createIntentResponse.json();

      // Confirm the payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              // You can add additional billing details here if needed
            },
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        // Confirm the payment with our backend
        const confirmResponse = await fetch('http://localhost:5000/api/stripe/confirm-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            membershipId,
            userId,
          }),
        });

        if (!confirmResponse.ok) {
          throw new Error('Payment confirmed with Stripe but failed to confirm with server');
        }

        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setErrorMessage(errorMessage);
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
      <div className="p-4 border rounded-lg bg-white shadow-sm">
        <CardElement 
          options={cardStyle}
          className="p-3 border rounded"
        />
      </div>

      {errorMessage && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium
                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                 disabled:opacity-50 disabled:cursor-not-allowed
                 flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            <span>Processing...</span>
          </>
        ) : (
          <span>Pay ${amount.toFixed(2)}</span>
        )}
      </button>
    </form>
  );
};

// Wrapper component that handles Stripe initialization
const StripePaymentForm = (props: PaymentFormProps) => {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stripe/config');
        if (!response.ok) {
          throw new Error('Failed to fetch Stripe configuration');
        }
        const { publishableKey } = await response.json();
        setStripePromise(loadStripe(publishableKey));
      } catch (error) {
        console.error('Error initializing Stripe:', error);
        props.onError('Failed to initialize payment system');
      }
    };

    initializeStripe();
  }, []);

  if (!stripePromise) {
    return (
      <div className="w-full h-32 flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  const options: StripeElementsOptions = {
    mode: 'payment',
    amount: props.amount * 100, // Convert to cents
    currency: 'cad',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm {...props} />
    </Elements>
  );
};

export default StripePaymentForm; 