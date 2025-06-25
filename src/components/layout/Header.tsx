'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import LoginButton from '../ui/LoginButton'

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)
  const [isMembershipsOpen, setIsMembershipsOpen] = useState(false)
  const [isCampsOpen, setIsCampsOpen] = useState(false)
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

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

  // Combine dynamic classes for header
  const headerClasses = `
    fixed w-full top-0 z-50
    bg-brand-dark border-b border-brand-border
    transition-all duration-300
    ${!isMobile && !isScrollingUp ? '-translate-y-full' : 'translate-y-0'}
    ${hasScrolled ? 'shadow-md' : ''}
  `.trim()

  return (
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
                <div key={link.label} className="group relative">
                  <Link href={link.href} className="flex items-center text-brand-textMuted hover:text-brand-white transition-colors">
                    {link.label}
                    <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                  </Link>
                  {/* Dropdown Menu */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max max-w-4xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 bg-brand-surface border border-brand-border rounded-lg shadow-xl p-8">
                    {link.subLinks ? (
                      // Programs dropdown layout
                      <>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-6">
                          {link.subLinks?.map((col) => (
                            <div key={col.category}>
                              <h3 className="font-heading text-xl text-brand-red mb-4">{col.category}</h3>
                              <ul className="space-y-3">
                                {col.links.map((subLink) => (
                                  <li key={subLink.href}>
                                    <Link href={subLink.href} className="block group/item">
                                      <div className="text-brand-white font-medium group-hover/item:text-brand-red transition-colors">
                                        {subLink.label}
                                      </div>
                                      <div className="text-brand-textMuted text-sm mt-1 group-hover/item:text-brand-textMuted">
                                        {subLink.description}
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-brand-border pt-6">
                          <h4 className="font-heading text-lg text-brand-red mb-4">Special Programs</h4>
                          <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                            {link.specialPrograms?.map((specialProgram) => (
                              <Link key={specialProgram.href} href={specialProgram.href} className="block group/special">
                                <div className="text-brand-white font-medium group-hover/special:text-brand-red transition-colors">
                                  {specialProgram.label}
                                </div>
                                <div className="text-brand-textMuted text-sm mt-1 group-hover/special:text-brand-textMuted">
                                  {specialProgram.description}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : link.membershipLinks ? (
                      // Memberships dropdown layout
                      <div className="space-y-4">
                        {link.membershipLinks?.map((membership) => (
                          <Link key={membership.href} href={membership.href} className="block group/membership p-4 border border-brand-border rounded-lg hover:border-brand-red transition-colors">
                            <div className="text-brand-white font-medium group-hover/membership:text-brand-red transition-colors mb-2">
                              {membership.label}
                            </div>
                            <div className="text-brand-textMuted text-sm group-hover/membership:text-brand-textMuted">
                              {membership.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      // Camps dropdown layout
                      <div className="space-y-4">
                        {link.campLinks?.map((camp) => (
                          <Link key={camp.href} href={camp.href} className="block group/camp">
                            <div className="text-brand-white font-medium group-hover/camp:text-brand-red transition-colors">
                              {camp.label}
                            </div>
                            <div className="text-brand-textMuted text-sm mt-1 group-hover/camp:text-brand-textMuted">
                              {camp.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Link key={link.label} href={link.href} className="text-brand-textMuted hover:text-brand-white transition-colors">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Desktop Login Button */}
            <div className="hidden md:block">
              <LoginButton />
            </div>
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-brand-white hover:text-brand-red"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[64px] left-0 w-full h-[calc(100vh-64px)] overflow-y-auto bg-brand-dark border-t border-brand-border">
          <nav className="flex flex-col space-y-2 p-4">
            {/* Mobile Login Button */}
            <div className="mb-4 pb-4 border-b border-brand-border">
              <LoginButton />
            </div>
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <button
                    onClick={() => {
                      if (link.label === 'Programs') {
                        setIsProgramsOpen(!isProgramsOpen)
                      } else if (link.label === 'Memberships') {
                        setIsMembershipsOpen(!isMembershipsOpen)
                      } else if (link.label === 'Camps') {
                        setIsCampsOpen(!isCampsOpen)
                      }
                    }}
                    className="w-full flex justify-between items-center text-lg text-brand-textMuted hover:text-brand-white transition-colors py-2"
                  >
                    {link.label}
                    <ChevronDown className={`w-5 h-5 transition-transform ${
                      (link.label === 'Programs' && isProgramsOpen) || 
                      (link.label === 'Memberships' && isMembershipsOpen) || 
                      (link.label === 'Camps' && isCampsOpen) ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {((link.label === 'Programs' && isProgramsOpen) || (link.label === 'Memberships' && isMembershipsOpen) || (link.label === 'Camps' && isCampsOpen)) && (
                    <div className="pl-4 pt-2 pb-2 border-l border-brand-border ml-2">
                      {link.subLinks && (
                        <>
                          {link.subLinks?.map((col) => (
                            <div key={col.category} className="mb-2">
                              <h4 className="font-bold text-brand-white text-md mb-1">{col.category}</h4>
                              <ul className="space-y-1">
                                {col.links.map((subLink) => (
                                  <li key={subLink.href}>
                                    <Link href={subLink.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-brand-textMuted hover:text-brand-red transition-colors py-1">
                                      {subLink.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <div className="mt-2 pt-2 border-t border-brand-border">
                            <ul className="space-y-1">
                              {link.specialPrograms?.map((specialProgram) => (
                                <li key={specialProgram.href}>
                                  <Link href={specialProgram.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-brand-textMuted hover:text-brand-red transition-colors py-1">
                                    {specialProgram.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                      {link.membershipLinks && (
                        <ul className="space-y-2">
                                                     {link.membershipLinks?.map((membership) => (
                             <li key={membership.href}>
                               <Link href={membership.href} onClick={() => setIsMobileMenuOpen(false)} className="block border border-brand-border rounded p-3 hover:border-brand-red transition-colors">
                                 <div className="text-brand-white font-medium mb-1">{membership.label}</div>
                                 <div className="text-brand-textMuted text-xs">
                                   {membership.description}
                                 </div>
                               </Link>
                             </li>
                           ))}
                        </ul>
                      )}
                      {link.campLinks && (
                        <ul className="space-y-1">
                          {link.campLinks?.map((camp) => (
                            <li key={camp.href}>
                              <Link href={camp.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-brand-textMuted hover:text-brand-red transition-colors py-1">
                                {camp.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg text-brand-textMuted hover:text-brand-white transition-colors py-2"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  )
} 