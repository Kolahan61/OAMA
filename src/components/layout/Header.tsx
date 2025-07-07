'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react'
import LoginButton from '../ui/LoginButton'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/contexts/ToastContext'
import LoginModal from '../LoginModal'

const navLinks = [
  { href: '/', label: 'Home' },
  {
    href: '/programs',
    label: 'Programs',
    dropdown: true,
    subLinks: [
      {
        category: 'Muay Thai',
        links: [
          { 
            href: '/programs/muay-thai/kids', 
            label: 'Kids (Ages 6–15)',
            description: 'Build discipline, confidence, and fitness through striking drills and pad work.'
          },
          { 
            href: '/programs/muay-thai/adults', 
            label: 'Adults (Ages 16+)',
            description: 'Authentic striking training for all levels, from beginners to fighters.'
          },
        ],
      },
      {
        category: 'Brazilian Jiu-Jitsu',
        links: [
          { 
            href: '/programs/bjj/kids', 
            label: 'Kids (Ages 6–15)',
            description: 'Practical self-defense and grappling fundamentals in a fun environment.'
          },
          { 
            href: '/programs/bjj/adults', 
            label: 'Adults (Ages 16+)',
            description: 'Develop real grappling skills for fitness, self-defense, or competition.'
          },
        ],
      },
    ],
    specialPrograms: [
      {
        href: '/programs/tiny-tigers',
        label: 'Tiny Tigers (Ages 4–6)',
        description: 'Beginner martial arts program focusing on coordination and listening skills.'
      },
      {
        href: '/programs/womens-only',
        label: "Women's-Only Programs",
        description: 'Muay Thai and BJJ classes in a welcoming, female-focused environment.'
      },
      {
        href: '/programs/after-school',
        label: 'After School Program (Ages 5–12)',
        description: 'Structured environment with school pick-up, training, and homework time.'
      },
      {
        href: '/programs/birthday-parties',
        label: 'Birthday Parties',
        description: 'Martial arts-themed birthday parties with games and mini-lessons.'
      },
    ],
  },
  {
    href: '/memberships',
    label: 'Memberships',
    dropdown: true,
    membershipLinks: [
      {
        href: '/memberships/adults',
        label: 'Adults Membership',
        description: 'Full access to all Adult BJJ and Muay Thai classes.'
      },
      {
        href: '/memberships/kids',
        label: 'Kids Membership',
        description: 'Access to Kids BJJ, Kids Muay Thai, and After School programs.'
      },
      {
        href: '/memberships/tiny-tigers',
        label: 'Tiny Tigers Membership',
        description: 'Perfect starter program for ages 4-6 focusing on coordination.'
      },
    ],
  },
  {
    href: '/camps',
    label: 'Camps',
    dropdown: true,
    campLinks: [
      {
        href: '/camps/pd-day',
        label: 'PD Day Camps (Ages 5–12)',
        description: 'Full day of martial arts and character-building for school closure days.'
      },
      {
        href: '/camps/summer',
        label: 'Summer Camps (Ages 5–12)',
        description: 'Weekly themed camps with martial arts training and creative challenges.'
      },
      {
        href: '/camps/march-break',
        label: 'March Break Camp (Ages 5–12)',
        description: 'High-energy week of martial arts, teamwork, and hands-on activities.'
      },
    ],
  },
  { href: '/schedule', label: 'Schedule' },
  { href: '/about', label: 'About' },
  { href: '/articles', label: 'Articles' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)
  const [isMembershipsOpen, setIsMembershipsOpen] = useState(false)
  const [isCampsOpen, setIsCampsOpen] = useState(false)
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    // Check if we're on mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is Tailwind's md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Handle scroll events
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Add shadow when scrolled
      setHasScrolled(currentScrollY > 10)

      // Don't handle scroll direction on mobile
      if (isMobile) return

      // Determine scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsScrollingUp(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrollingUp(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [lastScrollY, isMobile])

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setIsProgramsOpen(false)
    setIsMembershipsOpen(false)
    setIsCampsOpen(false)
  }

  // Combine dynamic classes for header
  const headerClasses = `
    fixed w-full top-0 z-50
    bg-brand-dark border-b border-brand-border
    transition-all duration-300
    ${!isMobile && !isScrollingUp ? '-translate-y-full' : 'translate-y-0'}
    ${hasScrolled ? 'shadow-md' : ''}
  `.trim()

  const handleLogout = async () => {
    try {
      await logout()
      showToast('Successfully logged out', 'success')
    } catch (error) {
      showToast('Failed to log out', 'error')
    }
  }

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-brand-primary text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <a href="tel:+16135551234" className="flex items-center hover:text-brand-white/80 transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                <span>(613) 555-1234</span>
              </a>
              <a href="mailto:info@oama.ca" className="flex items-center hover:text-brand-white/80 transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@oama.ca</span>
              </a>
            </div>
            <Link 
              href="/free-week" 
              className="bg-brand-primary-dark hover:bg-brand-primary-darker px-4 py-1 rounded transition-colors"
            >
              Start Your Free Week
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={headerClasses}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image 
                src="/images/logos/OAMA Logo white.png" 
                alt="Ottawa Academy of Martial Arts" 
                width={200} 
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div 
                    key={link.label} 
                    className="group relative"
                    onMouseEnter={() => {
                      closeAllDropdowns()
                      if (link.href === '/programs') setIsProgramsOpen(true)
                      if (link.href === '/memberships') setIsMembershipsOpen(true)
                      if (link.href === '/camps') setIsCampsOpen(true)
                    }}
                    onMouseLeave={() => {
                      if (link.href === '/programs') setIsProgramsOpen(false)
                      if (link.href === '/memberships') setIsMembershipsOpen(false)
                      if (link.href === '/camps') setIsCampsOpen(false)
                    }}
                  >
                    <Link 
                      href={link.href} 
                      className="flex items-center text-brand-textMuted hover:text-brand-white transition-colors"
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                    </Link>

                    {/* Programs Dropdown */}
                    {link.href === '/programs' && isProgramsOpen && (
                      <div className="absolute top-full left-0 w-[600px] bg-brand-dark border border-brand-border rounded-lg shadow-lg p-6 grid grid-cols-2 gap-6">
                        <div className="space-y-6">
                          {link.subLinks?.map((category) => (
                            <div key={category.category}>
                              <h3 className="text-brand-white font-semibold mb-2">{category.category}</h3>
                              <div className="space-y-4">
                                {category.links.map((subLink) => (
                                  <Link
                                    key={subLink.href}
                                    href={subLink.href}
                                    className="block group"
                                  >
                                    <span className="block text-brand-white group-hover:text-brand-primary transition-colors">
                                      {subLink.label}
                                    </span>
                                    <span className="text-sm text-brand-textMuted group-hover:text-brand-white transition-colors">
                                      {subLink.description}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <h3 className="text-brand-white font-semibold mb-2">Special Programs</h3>
                          <div className="space-y-4">
                            {link.specialPrograms?.map((program) => (
                              <Link
                                key={program.href}
                                href={program.href}
                                className="block group"
                              >
                                <span className="block text-brand-white group-hover:text-brand-primary transition-colors">
                                  {program.label}
                                </span>
                                <span className="text-sm text-brand-textMuted group-hover:text-brand-white transition-colors">
                                  {program.description}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Memberships Dropdown */}
                    {link.href === '/memberships' && isMembershipsOpen && (
                      <div className="absolute top-full left-0 w-[400px] bg-brand-dark border border-brand-border rounded-lg shadow-lg p-6">
                        <div className="space-y-4">
                          {link.membershipLinks?.map((membership) => (
                            <Link
                              key={membership.href}
                              href={membership.href}
                              className="block group"
                            >
                              <span className="block text-brand-white group-hover:text-brand-primary transition-colors">
                                {membership.label}
                              </span>
                              <span className="text-sm text-brand-textMuted group-hover:text-brand-white transition-colors">
                                {membership.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Camps Dropdown */}
                    {link.href === '/camps' && isCampsOpen && (
                      <div className="absolute top-full left-0 w-[400px] bg-brand-dark border border-brand-border rounded-lg shadow-lg p-6">
                        <div className="space-y-4">
                          {link.campLinks?.map((camp) => (
                            <Link
                              key={camp.href}
                              href={camp.href}
                              className="block group"
                            >
                              <span className="block text-brand-white group-hover:text-brand-primary transition-colors">
                                {camp.label}
                              </span>
                              <span className="text-sm text-brand-textMuted group-hover:text-brand-white transition-colors">
                                {camp.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-brand-textMuted hover:text-brand-white transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-brand-white hover:text-brand-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Login Button (Desktop) */}
            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-[#e31414] hover:text-red-600 font-medium"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-sm text-[#e31414] hover:text-red-600 font-medium"
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-brand-dark border-t border-brand-border">
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-4">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    {link.dropdown ? (
                      <div>
                        <button
                          onClick={() => {
                            if (link.href === '/programs') setIsProgramsOpen(!isProgramsOpen)
                            if (link.href === '/memberships') setIsMembershipsOpen(!isMembershipsOpen)
                            if (link.href === '/camps') setIsCampsOpen(!isCampsOpen)
                          }}
                          className="flex items-center justify-between w-full text-brand-white py-2"
                        >
                          {link.label}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              (link.href === '/programs' && isProgramsOpen) ||
                              (link.href === '/memberships' && isMembershipsOpen) ||
                              (link.href === '/camps' && isCampsOpen)
                                ? 'rotate-180'
                                : ''
                            }`}
                          />
                        </button>

                        {/* Programs Mobile Dropdown */}
                        {link.href === '/programs' && isProgramsOpen && (
                          <div className="pl-4 space-y-4 mt-2">
                            {link.subLinks?.map((category) => (
                              <div key={category.category}>
                                <h3 className="text-brand-white font-semibold mb-2">{category.category}</h3>
                                <div className="space-y-2">
                                  {category.links.map((subLink) => (
                                    <Link
                                      key={subLink.href}
                                      href={subLink.href}
                                      className="block text-brand-textMuted hover:text-brand-white transition-colors"
                                    >
                                      {subLink.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <div>
                              <h3 className="text-brand-white font-semibold mb-2">Special Programs</h3>
                              <div className="space-y-2">
                                {link.specialPrograms?.map((program) => (
                                  <Link
                                    key={program.href}
                                    href={program.href}
                                    className="block text-brand-textMuted hover:text-brand-white transition-colors"
                                  >
                                    {program.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Memberships Mobile Dropdown */}
                        {link.href === '/memberships' && isMembershipsOpen && (
                          <div className="pl-4 space-y-2 mt-2">
                            {link.membershipLinks?.map((membership) => (
                              <Link
                                key={membership.href}
                                href={membership.href}
                                className="block text-brand-textMuted hover:text-brand-white transition-colors"
                              >
                                {membership.label}
                              </Link>
                            ))}
                          </div>
                        )}

                        {/* Camps Mobile Dropdown */}
                        {link.href === '/camps' && isCampsOpen && (
                          <div className="pl-4 space-y-2 mt-2">
                            {link.campLinks?.map((camp) => (
                              <Link
                                key={camp.href}
                                href={camp.href}
                                className="block text-brand-textMuted hover:text-brand-white transition-colors"
                              >
                                {camp.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className="block text-brand-textMuted hover:text-brand-white transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
                {/* Login Button (Mobile) */}
                <div className="pt-4">
                  {user ? (
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                      <button
                        onClick={handleLogout}
                        className="text-sm text-[#e31414] hover:text-red-600 font-medium"
                      >
                        Log Out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="text-sm text-[#e31414] hover:text-red-600 font-medium"
                    >
                      Log In
                    </button>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
} 