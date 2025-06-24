'use client';

import Link from 'next/link';

export default function MembershipsPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-6">
              Membership Options
            </h1>
            <Link 
              href="/free-week"
              className="bg-brand-red text-white px-8 py-4 rounded-lg inline-block mb-6 hover:bg-red-700 transition-colors"
            >
              <p className="text-xl font-bold">Start with a FREE WEEK!</p>
              <p className="text-sm">Try any of our programs risk-free</p>
            </Link>
            <p className="text-xl text-brand-textMuted max-w-3xl mx-auto">
              Choose the membership that's right for you and begin your martial arts journey with us
            </p>
          </div>

          {/* Membership Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Adults Membership */}
            <div className="bg-brand-surface border border-brand-border rounded-lg p-8 hover:border-brand-red transition-colors">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-heading text-brand-white mb-2">Adults Membership</h2>
                <p className="text-brand-textMuted mb-4">Ages 16+</p>
                <div className="text-3xl font-bold text-brand-red mb-2">$99.95</div>
                <div className="text-brand-textMuted">biweekly</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">✓</span>
                  <span className="text-brand-textMuted">Unlimited Adult BJJ classes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">✓</span>
                  <span className="text-brand-textMuted">Unlimited Adult Muay Thai classes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">✓</span>
                  <span className="text-brand-textMuted">BJJ Elite classes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">✓</span>
                  <span className="text-brand-textMuted">Wrestling & Randori sessions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">✓</span>
                  <span className="text-brand-textMuted">Open mat access</span>
                </li>
              </ul>
              
              <div className="space-y-3">
                <Link 
                  href="/memberships/adults" 
                  className="block w-full bg-brand-red hover:bg-brand-redHover text-white text-center py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Learn More
                </Link>
                <button 
                  onClick={() => {
                    // Here you would integrate with your payment processor (Stripe, PayPal, etc.)
                    alert('Redirecting to payment for Adults Membership ($99.95 biweekly)...');
                  }}
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Purchase Now
                </button>
              </div>
            </div>

            {/* Kids Membership */}
            <div className="bg-brand-surface border border-brand-border rounded-lg p-8 hover:border-brand-red transition-colors">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-heading text-brand-white mb-2">Kids Membership</h2>
                <p className="text-brand-textMuted mb-4">Ages 6-15</p>
                <div className="text-3xl font-bold text-brand-red mb-2">$79.95</div>
                <div className="text-brand-textMuted">biweekly</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">✓</span>
                  <span className="text-brand-textMuted">Kids BJJ classes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">✓</span>
                  <span className="text-brand-textMuted">Kids Muay Thai classes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">✓</span>
                  <span className="text-brand-textMuted">Competition training (Kids Comp)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">✓</span>
                  <span className="text-brand-textMuted">Character development lessons</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">✓</span>
                  <span className="text-brand-textMuted">Belt progression system</span>
                </li>
              </ul>
              
              <div className="space-y-3">
                <Link 
                  href="/memberships/kids" 
                  className="block w-full bg-brand-red hover:bg-brand-redHover text-white text-center py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Learn More
                </Link>
                <button 
                  onClick={() => {
                    // Here you would integrate with your payment processor (Stripe, PayPal, etc.)
                    alert('Redirecting to payment for Kids Membership ($79.95 biweekly)...');
                  }}
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Purchase Now
                </button>
              </div>
            </div>

            {/* Tiny Tigers Membership */}
            <div className="bg-brand-surface border border-brand-border rounded-lg p-8 hover:border-brand-red transition-colors">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-heading text-brand-white mb-2">Tiny Tigers Membership</h2>
                <p className="text-brand-textMuted mb-4">Ages 4-6</p>
                <div className="text-3xl font-bold text-brand-red mb-2">$59.95</div>
                <div className="text-brand-textMuted">biweekly</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">✓</span>
                  <span className="text-brand-textMuted">Age-appropriate martial arts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">✓</span>
                  <span className="text-brand-textMuted">Coordination & motor skills</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">✓</span>
                  <span className="text-brand-textMuted">Listening & following directions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">✓</span>
                  <span className="text-brand-textMuted">Fun & engaging activities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">✓</span>
                  <span className="text-brand-textMuted">Small class sizes</span>
                </li>
              </ul>
              
              <div className="space-y-3">
                <Link 
                  href="/memberships/tiny-tigers" 
                  className="block w-full bg-brand-red hover:bg-brand-redHover text-white text-center py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Learn More
                </Link>
                <button 
                  onClick={() => {
                    // Here you would integrate with your payment processor (Stripe, PayPal, etc.)
                    alert('Redirecting to payment for Tiny Tigers Membership ($59.95 biweekly)...');
                  }}
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-heading text-brand-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-brand-textMuted mb-8">
              Contact us today to begin your free week trial
            </p>
            <div className="space-x-4">
              <a 
                href="/contact" 
                className="inline-block bg-brand-red hover:bg-brand-redHover text-white py-3 px-8 rounded-lg font-medium transition-colors"
              >
                Start Your Free Week
              </a>
              <a 
                href="/schedule" 
                className="inline-block border border-brand-border hover:border-brand-red text-brand-white hover:text-brand-red py-3 px-8 rounded-lg font-medium transition-colors"
              >
                View Schedule
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 