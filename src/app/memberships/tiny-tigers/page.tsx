'use client';

import Link from 'next/link';

export default function TinyTigersMembershipPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              Tiny Tigers Membership
            </h1>
            <p className="text-xl text-brand-red font-medium mb-6">Ages 4-6</p>
          </div>

          {/* Pricing Card */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-12 text-center">
            <div className="text-5xl font-bold text-brand-red mb-2">$59.95</div>
            <div className="text-xl text-brand-textMuted mb-4">biweekly</div>
            <p className="text-brand-textMuted mb-6">
              The perfect start to your child's martial arts journey
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
            <h2 className="text-3xl font-heading text-brand-white mb-6">What Your Little Tiger Will Learn</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-heading text-brand-red mb-4">Physical Development</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Basic motor skills & coordination</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Balance & flexibility training</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Age-appropriate martial arts movements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Fun fitness activities</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-heading text-brand-red mb-4">Character Building</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Listening & following directions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Respect for instructors & peers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Confidence building exercises</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Basic self-control skills</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-brand-border">
              <h3 className="text-xl font-heading text-brand-red mb-4">Program Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Expert instruction focused on young learners</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Interactive games & activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Positive reinforcement system</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Specialized instructors trained for young children</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Safe, supervised environment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Regular progress celebrations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Class Structure */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-heading text-brand-white mb-6">Class Structure & Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-heading text-brand-red mb-3">Weekly Schedule</h4>
                <ul className="text-brand-textMuted space-y-2">
                  <li>• Monday-Friday: 5:30-6:15 PM</li>
                  <li>• Wednesday Special: 4:45-5:30 PM</li>
                  <li>• Saturday: 9:15-10:00 AM</li>
                  <li>• 45-minute classes</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-heading text-brand-red mb-3">Typical Class Flow</h4>
                <ul className="text-brand-textMuted space-y-2">
                  <li>• Warm-up games (5 minutes)</li>
                  <li>• Martial arts skills (20 minutes)</li>
                  <li>• Character lesson (10 minutes)</li>
                  <li>• Fun activities & games (10 minutes)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Benefits for This Age Group */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-heading text-brand-white mb-6">Perfect for Ages 4-6</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">🎯</span>
                    <div>
                      <div className="text-brand-white font-medium">Attention Span Friendly</div>
                      <div className="text-brand-textMuted text-sm">Activities designed for short attention spans with frequent transitions</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">🌟</span>
                    <div>
                      <div className="text-brand-white font-medium">Developmental Appropriate</div>
                      <div className="text-brand-textMuted text-sm">Curriculum designed specifically for preschool development needs</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">👶</span>
                    <div>
                      <div className="text-brand-white font-medium">Safe Environment</div>
                      <div className="text-brand-textMuted text-sm">Specially designed space and equipment for young children</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">🎈</span>
                    <div>
                      <div className="text-brand-white font-medium">Fun-First Approach</div>
                      <div className="text-brand-textMuted text-sm">Learning through play with engaging, age-appropriate activities</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Progression Path */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-heading text-brand-white mb-6">Growth & Progression</h2>
            <div className="text-center">
              <p className="text-brand-textMuted mb-6">
                Our Tiny Tigers program provides the perfect foundation for your child's martial arts journey
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <div className="bg-brand-red rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <div className="text-brand-white font-medium">Tiny Tigers</div>
                  <div className="text-brand-textMuted text-sm">Ages 4-6</div>
                </div>
                <div className="text-brand-red text-2xl">→</div>
                <div className="text-center">
                  <div className="bg-brand-border rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                    <span className="text-brand-white font-bold text-xl">2</span>
                  </div>
                  <div className="text-brand-white font-medium">Kids Programs</div>
                  <div className="text-brand-textMuted text-sm">Ages 6-15</div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-heading text-brand-white mb-4">
              Start Your Little Tiger's Journey Today
            </h3>
            <p className="text-brand-textMuted mb-8">
              Ready to start your little tiger's journey? Purchase your membership above or view our class schedule.
            </p>
            <div className="space-x-4">
              <Link 
                href="/schedule" 
                className="inline-block border border-brand-border hover:border-brand-red text-brand-white hover:text-brand-red py-4 px-8 rounded-lg font-medium transition-colors text-lg"
              >
                View Schedule
              </Link>
              <Link 
                href="/programs/tiny-tigers" 
                className="inline-block border border-brand-border hover:border-brand-red text-brand-white hover:text-brand-red py-4 px-8 rounded-lg font-medium transition-colors text-lg"
              >
                Learn More About Program
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 