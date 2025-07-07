import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { Loader2, X, CheckCircle, AlertCircle } from 'lucide-react';
import { getStripe, StripeConfigError, StripeInitializationError } from '@/lib/stripeConfig';

// Types
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  membership: {
    id: string;
    name: string;
    price: number;
    stripePriceId?: string;
  };
  userId: string;
}

interface PaymentFormProps extends Omit<PaymentModalProps, 'isOpen'> {
  publishableKey: string;
}

// Card element styles
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

// Payment form component
const PaymentForm = ({ membership, userId, onClose }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('💳 Payment form submitted');

    if (!stripe || !elements) {
      console.error('❌ Stripe not initialized');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage(null);

    try {
      console.log('📤 Creating payment intent:', {
        amount: membership.price * 100,
        membershipId: membership.id,
        userId
      });

      // Create payment intent
      const response = await fetch('http://localhost:5000/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: membership.price * 100,
          membershipId: membership.id,
          userId: userId,
          stripePriceId: membership.stripePriceId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Failed to create payment intent:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      console.log('✅ Payment intent created');

      // Confirm the payment
      console.log('🔄 Confirming card payment...');
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              // Add billing details if needed
            },
          },
        }
      );

      if (stripeError) {
        console.error('❌ Stripe payment error:', stripeError);
        throw new Error(stripeError.message || 'Payment failed');
      }

      if (paymentIntent.status === 'succeeded') {
        console.log('✅ Payment confirmed with Stripe');

        // Confirm with backend
        console.log('📤 Confirming payment with backend...');
        const confirmResponse = await fetch('http://localhost:5000/api/stripe/confirm-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            membershipId: membership.id,
            userId: userId
          }),
        });

        if (!confirmResponse.ok) {
          console.error('❌ Backend confirmation failed:', {
            status: confirmResponse.status,
            statusText: confirmResponse.statusText
          });
          throw new Error('Payment confirmed but failed to update membership');
        }

        console.log('🎉 Payment process completed successfully');
        setPaymentStatus('success');
        
        // Wait 2 seconds before redirecting
        console.log('⏳ Preparing to redirect...');
        setTimeout(() => {
          onClose();
          router.push('/dashboard');
        }, 2000);
      }
    } catch (error) {
      console.error('❌ Payment process error:', error);
      setPaymentStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Status Messages */}
      {paymentStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-green-700">Payment successful! Redirecting...</span>
        </div>
      )}

      {paymentStatus === 'error' && errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-red-700">{errorMessage}</span>
        </div>
      )}

      {/* Payment Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Payment Details</h3>
        <p className="text-sm text-gray-600 mb-4">
          {membership.name} - ${membership.price.toFixed(2)}
        </p>
        <div className="bg-white p-4 border rounded">
          <CardElement options={cardStyle} />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing || paymentStatus === 'success'}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium
                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                 disabled:opacity-50 disabled:cursor-not-allowed
                 flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            <span>Processing...</span>
          </>
        ) : (
          <span>Pay ${membership.price.toFixed(2)}</span>
        )}
      </button>
    </form>
  );
};

// Main modal component
const PaymentModal = ({ isOpen, onClose, membership, userId }: PaymentModalProps) => {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      console.log('🔄 Initializing Stripe...');
      try {
        setConfigError(null);
        const stripe = await getStripe();
        console.log('✅ Stripe initialized successfully');
        setStripePromise(Promise.resolve(stripe));
      } catch (error) {
        console.error('❌ Failed to initialize Stripe:', error);
        setConfigError(
          error instanceof StripeConfigError || error instanceof StripeInitializationError
            ? error.message
            : 'Failed to initialize payment system. Please try again later.'
        );
      }
    };

    if (isOpen) {
      console.log('🔓 Payment modal opened');
      initializeStripe();
    }
  }, [isOpen]);

  // Log when modal closes
  const handleClose = () => {
    console.log('🔒 Payment modal closing');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Purchase Membership
          </h2>
          <p className="text-gray-600 mt-1">
            {membership.name}
          </p>
        </div>

        {/* Configuration Error Message */}
        {configError && (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700">{configError}</span>
          </div>
        )}

        {/* Stripe Elements */}
        {!configError && (stripePromise ? (
          <Elements stripe={stripePromise}>
            <PaymentForm
              membership={membership}
              userId={userId}
              onClose={handleClose}
              publishableKey=""
            />
          </Elements>
        ) : (
          <div className="h-32 flex items-center justify-center">
            <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentModal; 