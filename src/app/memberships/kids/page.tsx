'use client';

import Link from 'next/link';

export default function KidsMembershipPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              Kids Membership
            </h1>
            <p className="text-xl text-brand-red font-medium mb-6">Ages 6-15</p>
          </div>

          {/* Pricing Card */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-12 text-center">
            <div className="text-5xl font-bold text-brand-red mb-2">$79.95</div>
            <div className="text-xl text-brand-textMuted mb-4">biweekly</div>
            <p className="text-brand-textMuted mb-6">
               Access to Kids BJJ, Kids Muay Thai, and competition training programs
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
                <h3 className="text-xl font-heading text-brand-red mb-4">Martial Arts Training</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Kids BJJ classes (all levels)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Kids Muay Thai classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Kids Comp training (Mon-Thu)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Homeschool BJJ program</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-heading text-brand-red mb-4">Character Development</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Leadership skills training</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Discipline and respect lessons</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Confidence building activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">✓</span>
                    <span className="text-brand-textMuted">Goal setting & achievement</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-brand-border">
              <h3 className="text-xl font-heading text-brand-red mb-4">Additional Programs & Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <ul className="space-y-3">
                   <li className="flex items-start">
                     <span className="text-brand-red mr-3">✓</span>
                     <span className="text-brand-textMuted">Belt progression system</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-brand-red mr-3">✓</span>
                     <span className="text-brand-textMuted">Regular progress assessments</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-brand-red mr-3">✓</span>
                     <span className="text-brand-textMuted">Character building focus</span>
                   </li>
                 </ul>
                                 <ul className="space-y-3">
                   <li className="flex items-start">
                     <span className="text-brand-red mr-3">✓</span>
                     <span className="text-brand-textMuted">Age-appropriate instruction</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-brand-red mr-3">✓</span>
                     <span className="text-brand-textMuted">Safe learning environment</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-brand-red mr-3">✓</span>
                     <span className="text-brand-textMuted">Expert instruction</span>
                   </li>
                 </ul>
              </div>
            </div>
          </div>

          {/* Age Groups */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-heading text-brand-white mb-6">Program Structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-heading text-brand-red mb-3">Class Schedule</h4>
                <ul className="text-brand-textMuted space-y-2">
                  <li>• Daily classes (Monday-Friday)</li>
                  <li>• After school timing (5:30-6:15 PM)</li>
                  <li>• Saturday morning options</li>
                  <li>• Competition training (4:45-5:30 PM)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-heading text-brand-red mb-3">Skills Development</h4>
                <ul className="text-brand-textMuted space-y-2">
                  <li>• Self-defense techniques</li>
                  <li>• Physical fitness & coordination</li>
                  <li>• Mental discipline & focus</li>
                  <li>• Social skills & teamwork</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-heading text-brand-white mb-6">Why Choose Our Kids Program?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">🥋</span>
                    <div>
                      <div className="text-brand-white font-medium">Expert Instruction</div>
                      <div className="text-brand-textMuted text-sm">Qualified instructors with experience teaching children</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">👥</span>
                                         <div>
                       <div className="text-brand-white font-medium">Individual Attention</div>
                       <div className="text-brand-textMuted text-sm">Personalized instruction for optimal learning</div>
                     </div>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">🏆</span>
                    <div>
                      <div className="text-brand-white font-medium">Character Building</div>
                      <div className="text-brand-textMuted text-sm">Focus on values, respect, and personal growth</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-red mr-3">🛡️</span>
                    <div>
                      <div className="text-brand-white font-medium">Safe Environment</div>
                      <div className="text-brand-textMuted text-sm">Structured, supervised, and supportive atmosphere</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-heading text-brand-white mb-4">
              Give Your Child the Gift of Martial Arts
            </h3>
            <p className="text-brand-textMuted mb-8">
              Ready to enroll your child? Purchase your membership above or view our class schedule to get started.
            </p>
            <Link 
              href="/schedule" 
              className="inline-block border border-brand-border hover:border-brand-red text-brand-white hover:text-brand-red py-4 px-8 rounded-lg font-medium transition-colors text-lg"
            >
              View Kids Schedule
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 