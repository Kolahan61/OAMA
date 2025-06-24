export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-brand-textMuted">
              Get in touch with The Ottawa Academy of Martial Arts
            </p>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* Contact Details */}
            <div className="bg-brand-surface border border-brand-border rounded-lg p-8">
              <h2 className="text-2xl font-heading text-brand-white mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start">
                  <div className="text-brand-red text-2xl mr-4">📞</div>
                  <div>
                    <h3 className="text-brand-white font-medium mb-1">Phone</h3>
                    <a 
                      href="tel:613-728-0880" 
                      className="text-brand-textMuted hover:text-brand-red transition-colors"
                    >
                      613-728-0880
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="text-brand-red text-2xl mr-4">✉️</div>
                  <div>
                    <h3 className="text-brand-white font-medium mb-1">Email</h3>
                    <a 
                      href="mailto:info@oama.ca" 
                      className="text-brand-textMuted hover:text-brand-red transition-colors"
                    >
                      info@oama.ca
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start">
                  <div className="text-brand-red text-2xl mr-4">🌐</div>
                  <div>
                    <h3 className="text-brand-white font-medium mb-1">Website</h3>
                    <a 
                      href="https://www.oama.ca" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-textMuted hover:text-brand-red transition-colors"
                    >
                      www.oama.ca
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start">
                  <div className="text-brand-red text-2xl mr-4">📍</div>
                  <div>
                    <h3 className="text-brand-white font-medium mb-1">Address</h3>
                    <address className="text-brand-textMuted not-italic">
                      1810 Carling Ave<br />
                      Ottawa, ON K2A 1J2
                    </address>
                    <a 
                      href="https://maps.google.com/?q=1810+Carling+Ave,+Ottawa,+ON+K2A+1J2" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-red hover:text-red-400 transition-colors text-sm mt-1 inline-block"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-brand-surface border border-brand-border rounded-lg p-8">
              <h2 className="text-2xl font-heading text-brand-white mb-6">Send us a Message</h2>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-brand-white font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-brand-white font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-brand-white font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-brand-white font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-brand-white font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-lg text-brand-white focus:outline-none focus:border-brand-red resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-red hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-heading text-brand-white mb-4">Visit Our Academy</h2>
            <p className="text-brand-textMuted mb-6">
              Come by for a tour of our facility and see what makes OAMA special. 
              We're conveniently located on Carling Avenue in Ottawa.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-brand-red font-medium mb-2">Parking</h3>
                <p className="text-brand-textMuted text-sm">Free parking available on-site</p>
              </div>
              <div>
                <h3 className="text-brand-red font-medium mb-2">Transit Access</h3>
                <p className="text-brand-textMuted text-sm">Accessible by OC Transpo</p>
              </div>
              <div>
                <h3 className="text-brand-red font-medium mb-2">Facility Tour</h3>
                <p className="text-brand-textMuted text-sm">Walk-ins welcome during class hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 