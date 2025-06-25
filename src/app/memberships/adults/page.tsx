'use client';

import Link from 'next/link';

export default function AdultsMembershipPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              Adults Membership
            </h1>
            <p className="text-xl text-brand-red font-medium mb-6">Ages 16+</p>
          </div>

          {/* Pricing Card */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-12 text-center">
            <div className="text-5xl font-bold text-brand-red mb-2">$99.95</div>
            <div className="text-xl text-brand-textMuted mb-4">biweekly</div>
            <p className="text-brand-textMuted mb-6">
              Unlimited access to all adult programs and classes
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => {
                  // Here you would integrate with your payment processor (Stripe, PayPal, etc.)
                  alert('Redirecting to payment processor...');
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Purchase Membership
              </button>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-heading text-brand-white mb-6">What's Included</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-heading text-brand-red mb-4">Brazilian Jiu-Jitsu</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">BJJ Fundamentals classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">BJJ Advanced classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">BJJ Elite classes (Mon-Fri)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">No-Gi Technique classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Wrestling sessions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Randori (Open Mat) sessions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Leg Locks specialty class</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-heading text-brand-red mb-4">Muay Thai</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Conditioning classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Technique classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Advanced classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Boxing classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Sparring sessions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Open Mat access</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-brand-border">
              <h3 className="text-xl font-heading text-brand-red mb-4">Additional Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Access to Women's-only classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Progress tracking & belt progression</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Professional instruction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Supportive community environment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Schedule Highlights */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-heading text-brand-white mb-6">Class Schedule Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-heading text-brand-red mb-3">Daytime Options</h4>
                <ul className="text-brand-textMuted space-y-2">
                  <li>• Early morning classes (7:00 AM)</li>
                  <li>• Lunch break classes (12:00-1:00 PM)</li>
                  <li>• BJJ Elite classes (1:00-2:00 PM)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-heading text-brand-red mb-3">Evening Options</h4>
                <ul className="text-brand-textMuted space-y-2">
                  <li>• After-work classes (6:15 PM)</li>
                  <li>• Advanced training (7:00 PM)</li>
                  <li>• Randori/Open Mat (7:45 PM)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-heading text-brand-white mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-brand-textMuted mb-8">
              Ready to join? Purchase your membership above or view our class schedule to get started.
            </p>
            <Link 
              href="/schedule" 
              className="inline-block border border-brand-border hover:border-brand-red text-brand-white hover:text-brand-red py-4 px-8 rounded-lg font-medium transition-colors text-lg"
            >
              View Class Schedule
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 