// src/app/page.tsx
'use client'; // This directive is crucial for client-side hooks like useState, useEffect

import React, { useEffect, useState } from 'react'; // Make sure React and hooks are imported
import Link from 'next/link'; // Keep your existing Link import
import Image from 'next/image';
import { ArrowRight, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

// Define the features data
const features = [
  {
    icon: '🥋',
    title: 'Expert Instructors',
    description: 'Learn from experienced black belt instructors with years of competition and teaching experience.',
  },
  {
    icon: '👥',
    title: 'All Levels Welcome',
    description: 'Whether you\'re a complete beginner or experienced practitioner, we have classes for you.',
  },
  {
    icon: '🏆',
    title: 'Competition Team',
    description: 'Join our competition team and test your skills in local and international tournaments.',
  },
];

// Define the programs data
const programs = [
  {
    title: 'Brazilian Jiu-Jitsu',
    description: 'Learn the art of ground fighting and submission grappling.',
    image: '/images/programs/bjj.jpg',
    href: '/programs/bjj/adults',
  },
  {
    title: 'Muay Thai',
    description: 'Master the art of eight limbs with authentic Thai boxing training.',
    image: '/images/programs/muay-thai.jpg',
    href: '/programs/muay-thai/adults',
  },
  {
    title: 'Kids Programs',
    description: 'Build confidence, discipline, and fitness in a fun, safe environment.',
    image: '/images/programs/kids.jpg',
    href: '/programs/bjj/kids',
  },
];

export default function HomePage() { // This is your main component
  const [backendStatus, setBackendStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        // Use a proper API endpoint that returns JSON instead of the root endpoint
        const response = await fetch('http://localhost:5000/api/memberships');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        await response.json(); // This should work now since /api/memberships returns JSON
        setBackendStatus('connected');
      } catch (err) {
        console.error("Failed to connect to backend:", err);
        setBackendStatus('error');
        setError(err instanceof Error ? err.message : String(err));
      }
    };

    checkBackendConnection();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Backend Status Banner */}
      <div className={`
        fixed top-0 left-0 right-0 z-50 transition-transform duration-300
        ${backendStatus === 'loading' ? 'translate-y-0' : 'translate-y-[-100%]'}
      `}>
        <div className="bg-brand-dark text-white py-2 px-4">
          <div className="container mx-auto flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            <span>Connecting to backend services...</span>
          </div>
        </div>
      </div>

      {backendStatus === 'error' && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white py-2 px-4">
          <div className="container mx-auto flex items-center justify-center">
            <XCircle className="w-5 h-5 mr-2" />
            <span>Error connecting to backend: {error}</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        >
          <source src="/videos/OAMA Landing page test  - V3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bebas-neue text-white mb-6">
            Transform Your Life Through Martial Arts
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join Ottawa's premier martial arts academy and discover the path to physical excellence and mental discipline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/free-week"
              className="group bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 flex items-center"
            >
              Start Your Free Week
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/schedule"
              className="bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bebas-neue text-center mb-12">Why Choose OAMA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-brand-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-primary/20 transition-colors">
                  <span className="text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-bebas-neue mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bebas-neue text-center mb-12">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Link
                key={index}
                href={program.href}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bebas-neue mb-2">{program.title}</h3>
                  <p className="text-gray-200 text-sm">{program.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bebas-neue mb-6">
            Ready to Begin Your Martial Arts Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join us for a free week of training and experience the transformative power of martial arts firsthand.
          </p>
          <Link
            href="/free-week"
            className="group inline-flex items-center bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
          >
            Start Your Free Week
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Backend Status Indicator */}
      <div className="fixed bottom-4 right-4 z-50">
        {backendStatus === 'connected' && (
          <div className="bg-green-600 text-white py-2 px-4 rounded-full flex items-center shadow-lg">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            <span>Backend Connected</span>
          </div>
        )}
      </div>
    </div>
  );
}
