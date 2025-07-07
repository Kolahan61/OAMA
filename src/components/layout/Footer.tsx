import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const quickLinks = [
  { href: '/programs', label: 'Programs' },
  { href: '/memberships', label: 'Memberships' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/contact', label: 'Contact' },
  { href: '/free-week', label: 'Free Week Trial' },
];

const programLinks = [
  { href: '/programs/bjj/adults', label: 'Adult BJJ' },
  { href: '/programs/muay-thai/adults', label: 'Adult Muay Thai' },
  { href: '/programs/bjj/kids', label: 'Kids BJJ' },
  { href: '/programs/muay-thai/kids', label: 'Kids Muay Thai' },
  { href: '/programs/tiny-tigers', label: 'Tiny Tigers' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-brand-textMuted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-brand-white text-xl font-bebas-neue mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:text-brand-white transition-colors"
              >
                <MapPin className="w-5 h-5 mr-2" />
                <span>123 Main Street, Ottawa, ON K1S 5B6</span>
              </a>
              <a 
                href="tel:+16135551234"
                className="flex items-center hover:text-brand-white transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                <span>(613) 555-1234</span>
              </a>
              <a 
                href="mailto:info@oama.ca"
                className="flex items-center hover:text-brand-white transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                <span>info@oama.ca</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-brand-white text-xl font-bebas-neue mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="hover:text-brand-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-brand-white text-xl font-bebas-neue mb-4">Programs</h3>
            <ul className="space-y-2">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="hover:text-brand-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media and Newsletter */}
          <div>
            <h3 className="text-brand-white text-xl font-bebas-neue mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-textMuted hover:text-brand-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-textMuted hover:text-brand-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-textMuted hover:text-brand-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </div>
            <div>
              <h4 className="text-brand-white text-lg mb-2">Newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-brand-border text-brand-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-brand-primary flex-grow"
                />
                <button
                  type="submit"
                  className="bg-brand-primary text-white px-4 py-2 rounded-r hover:bg-brand-primary-dark transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-brand-border text-center">
          <p className="text-sm">
            © {currentYear} Ottawa Academy of Martial Arts. All rights reserved.
          </p>
          <p className="text-sm mt-2">
            Train hard, stay humble, respect all
          </p>
        </div>
      </div>
    </footer>
  );
} 