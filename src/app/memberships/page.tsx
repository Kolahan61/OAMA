// src/app/memberships/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Membership {
  id: string;
  name: string;
  price: number;
  billingCycle: string;
  features: string[];
  stripePriceId: string;
  status: string;
  category: string;
  description: string;
}

export default function MembershipsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMembership, setSelectedMembership] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  // DEBUG - Add these lines
  console.log('=== DEBUG INFO ===');
  console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
  console.log('All NEXT_PUBLIC vars:', Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC')));
  console.log('User:', user);
  console.log('Auth Loading:', authLoading);
  console.log('==================');

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        // Use hardcoded URL temporarily to fix environment variable issue
        const response = await fetch(`http://localhost:5000/api/memberships`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setMemberships(data);
      } catch (err) {
        console.error('Error fetching memberships:', err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, []);

  const handleStartCheckout = async (membershipId: string) => {
    // Check if user is authenticated
    if (!user) {
      router.push('/login');
      return;
    }

    setSelectedMembership(membershipId);
    setProcessingPayment(true);

    try {
      // Get Stripe publishable key
      const keyResponse = await fetch(`http://localhost:5000/api/stripe/config`);
      if (!keyResponse.ok) throw new Error('Failed to get Stripe configuration');
      const { publishableKey } = await keyResponse.json();

      // Create checkout session
      const response = await fetch(`http://localhost:5000/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          membershipId,
          userId: user.uid, // Using real user ID instead of 'test-user-id'
        }),
      });

      if (!response.ok) throw new Error('Failed to create checkout session');
      const { url } = await response.json();

      // Redirect to Stripe Checkout
      router.push(url);
    } catch (err) {
      console.error('Error starting checkout:', err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
            <span className="ml-2 text-lg">Loading memberships...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Memberships</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-brand-red hover:bg-brand-redHover text-white px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bebas-neue mb-6">
            Choose Your Membership Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your life through martial arts with our flexible membership options.
            Join our community and start your journey today.
          </p>
        </div>
      </section>

      {/* Membership Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memberships.map((membership) => (
              <div
                key={membership.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform"
              >
                {/* Card Header */}
                <div className="bg-brand-dark text-white p-6">
                  <h3 className="text-2xl font-bebas-neue mb-2">{membership.name}</h3>
                  <p className="text-gray-300">{membership.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${membership.price}</span>
                    <span className="text-gray-300">/{membership.billingCycle}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="p-6">
                  <ul className="space-y-4">
                    {membership.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer */}
                <div className="p-6 border-t border-gray-200">
                  <button
                    onClick={() => handleStartCheckout(membership.id)}
                    disabled={processingPayment && selectedMembership === membership.id}
                    className={`
                      w-full group bg-brand-red hover:bg-brand-redHover text-white font-semibold 
                      px-6 py-3 rounded-lg transition-all flex items-center justify-center
                      ${processingPayment && selectedMembership === membership.id ? 'opacity-75 cursor-not-allowed' : ''}
                    `}
                  >
                    {processingPayment && selectedMembership === membership.id ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {!user ? 'Login to Start' : 'Start Now'}
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bebas-neue text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-2">What's included in the membership?</h3>
              <p className="text-gray-600">
                Your membership includes access to all scheduled classes in your chosen program,
                use of our facilities during open hours, and participation in special events.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Is there a minimum contract period?</h3>
              <p className="text-gray-600">
                While we offer month-to-month memberships, we recommend committing to at least
                3 months to see significant progress in your training.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I freeze my membership?</h3>
              <p className="text-gray-600">
                Yes, you can freeze your membership for up to 3 months per year with a valid reason
                such as injury, travel, or other commitments.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What happens if I want to cancel?</h3>
              <p className="text-gray-600">
                You can cancel your membership at any time with 30 days notice. There are no
                cancellation fees or hidden charges.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}