'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FreeWeekSignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    membershipType: '',
    childAge: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    parentName: '',
    parentEmail: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend/CRM
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const isChildMembership = formData.membershipType === 'kids' || formData.membershipType === 'tiny-tigers';

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-brand-dark pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-brand-surface border border-brand-border rounded-lg p-8">
              <div className="text-6xl mb-6">🎉</div>
              <h1 className="text-4xl font-heading text-brand-white mb-4">
                Welcome to OAMA!
              </h1>
              <p className="text-xl text-brand-textMuted mb-6">
                Thank you for signing up for your FREE WEEK! We'll contact you within 24 hours to schedule your first class.
              </p>
              <div className="bg-brand-red text-white p-4 rounded-lg mb-6">
                <p className="font-bold">What happens next?</p>
                <ul className="text-left mt-2 space-y-1">
                  <li>• We'll call you to schedule your first class</li>
                  <li>• Come in comfortable workout clothes</li>
                  <li>• Bring water and a positive attitude!</li>
                  <li>• No equipment needed - we provide everything</li>
                </ul>
              </div>
              <Link 
                href="/"
                className="inline-block bg-brand-red text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              Start Your FREE WEEK!
            </h1>
            <p className="text-xl text-brand-textMuted">
              Fill out the form below and we'll get you started on your martial arts journey
            </p>
          </div>

          {/* Form */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Membership Type Selection */}
              <div>
                <label htmlFor="membershipType" className="block text-brand-white font-medium mb-2">
                  Which program are you interested in? *
                </label>
                                                  <select
                   id="membershipType"
                   name="membershipType"
                   value={formData.membershipType}
                   onChange={handleInputChange}
                   required
                   className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red"
                 >
                   <option value="" disabled>Select a program</option>
                   <option value="adults">Adults Program (Ages 16+)</option>
                   <option value="kids">Kids Program (Ages 6-15)</option>
                   <option value="tiny-tigers">Tiny Tigers (Ages 4-6)</option>
                 </select>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-brand-white font-medium mb-2">
                    {isChildMembership ? "Child's First Name" : "First Name"} *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-brand-white font-medium mb-2">
                    {isChildMembership ? "Child's Last Name" : "Last Name"} *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              {/* Child Age for Kids/Tiny Tigers */}
              {isChildMembership && (
                <div>
                  <label htmlFor="childAge" className="block text-brand-white font-medium mb-2">
                    Child's Age *
                  </label>
                  <input
                    type="number"
                    id="childAge"
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleInputChange}
                    required
                    min={formData.membershipType === 'tiny-tigers' ? 3 : 7}
                    max={formData.membershipType === 'tiny-tigers' ? 6 : 17}
                    className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red"
                  />
                </div>
              )}

              {/* Parent Information for Kids */}
              {isChildMembership && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="parentName" className="block text-brand-white font-medium mb-2">
                        Parent/Guardian Name *
                      </label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red"
                      />
                    </div>
                    <div>
                      <label htmlFor="parentEmail" className="block text-brand-white font-medium mb-2">
                        Parent Email *
                      </label>
                      <input
                        type="email"
                        id="parentEmail"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-brand-white font-medium mb-2">
                    {isChildMembership ? "Additional Email" : "Email"} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required={!isChildMembership}
                    className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-brand-white font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              {/* Emergency Contact for Kids */}
              {isChildMembership && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="emergencyContact" className="block text-brand-white font-medium mb-2">
                      Emergency Contact Name *
                    </label>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div>
                    <label htmlFor="emergencyPhone" className="block text-brand-white font-medium mb-2">
                      Emergency Contact Phone *
                    </label>
                    <input
                      type="tel"
                      id="emergencyPhone"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red"
                    />
                  </div>
                </div>
              )}

              {/* Medical Conditions */}
              <div>
                <label htmlFor="medicalConditions" className="block text-brand-white font-medium mb-2">
                  Medical Conditions or Injuries (Optional)
                </label>
                <textarea
                  id="medicalConditions"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Please list any medical conditions, injuries, or physical limitations we should be aware of..."
                  className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="bg-brand-red text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
                >
                  Start My FREE WEEK!
                </button>
                <p className="text-brand-textMuted text-sm mt-4">
                  By submitting this form, you agree to be contacted by OAMA regarding your free week trial.
                </p>
              </div>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
              <h3 className="text-xl font-heading text-brand-white mb-4">What to Expect</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-brand-textMuted">
                <div>
                  <div className="text-brand-red text-2xl mb-2">📞</div>
                  <p className="font-medium">We'll Call You</p>
                  <p className="text-sm">Within 24 hours to schedule</p>
                </div>
                <div>
                  <div className="text-brand-red text-2xl mb-2">👕</div>
                  <p className="font-medium">Comfortable Clothes</p>
                  <p className="text-sm">Athletic wear recommended</p>
                </div>
                <div>
                  <div className="text-brand-red text-2xl mb-2">🥋</div>
                  <p className="font-medium">No Equipment Needed</p>
                  <p className="text-sm">We provide everything</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 