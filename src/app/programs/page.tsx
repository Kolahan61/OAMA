'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Loader2 } from 'lucide-react';

interface Program {
  id: string;
  name: string;
  description: string;
  targetAgeGroup: {
    min: number;
    max: number | null;
    label: string;
  };
  skillLevels: string[];
  isActive: boolean;
  iconUrl: string;
  colorCode: string;
  schedule: {
    day: string;
    times: string[];
  }[];
  instructors: {
    name: string;
    title: string;
    bio: string;
    imageUrl: string;
  }[];
  benefits: string[];
  requirements: string[];
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'bjj' | 'muay-thai' | 'kids'>('all');

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/programs`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setPrograms(data);
      } catch (err) {
        console.error('Error fetching programs:', err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const filteredPrograms = selectedCategory === 'all'
    ? programs
    : programs.filter(program => program.id.startsWith(selectedCategory));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
            <span className="ml-2 text-lg">Loading programs...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Programs</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bebas-neue mb-6">
            Our Martial Arts Programs
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our comprehensive range of martial arts programs designed for all ages and skill levels.
            Whether you're a beginner or an experienced practitioner, we have the perfect program for you.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium border-2 transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-gray-900 hover:bg-gray-50'
              }`}
            >
              All Programs
            </button>
            <button
              onClick={() => setSelectedCategory('bjj')}
              className={`px-6 py-2 rounded-full font-medium border-2 transition-all ${
                selectedCategory === 'bjj'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-gray-900 hover:bg-gray-50'
              }`}
            >
              Brazilian Jiu-Jitsu
            </button>
            <button
              onClick={() => setSelectedCategory('muay-thai')}
              className={`px-6 py-2 rounded-full font-medium border-2 transition-all ${
                selectedCategory === 'muay-thai'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-gray-900 hover:bg-gray-50'
              }`}
            >
              Muay Thai
            </button>
            <button
              onClick={() => setSelectedCategory('kids')}
              className={`px-6 py-2 rounded-full font-medium border-2 transition-all ${
                selectedCategory === 'kids'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-gray-900 hover:bg-gray-50'
              }`}
            >
              Kids Programs
            </button>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform"
              >
                {/* Program Image */}
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    src={program.iconUrl}
                    alt={program.name}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{ backgroundColor: program.colorCode }}
                  ></div>
                </div>

                {/* Program Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bebas-neue text-gray-900 mb-2">{program.name}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>

                  {/* Quick Info */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-semibold mr-2">Age Group:</span>
                      {program.targetAgeGroup?.label || 'All Ages'}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-semibold mr-2">Skill Levels:</span>
                      {program.skillLevels.join(', ')}
                    </div>
                  </div>

                  {/* Benefits Preview */}
                  {program.benefits && program.benefits.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {program.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Button */}
                  <Link
                    href={`/programs/${program.id}`}
                    className="group inline-flex items-center bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-all w-full justify-center"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bebas-neue mb-6">
            Ready to Start Your Martial Arts Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join us for a free week of training and experience our programs firsthand.
            No commitment required.
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

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bebas-neue text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-2">Do I need any prior experience?</h3>
              <p className="text-gray-600">
                No prior experience is needed. Our programs are designed to accommodate
                beginners and we'll teach you everything you need to know.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What should I bring to class?</h3>
              <p className="text-gray-600">
                For your first class, comfortable workout clothes and water are all you need.
                We'll provide guidance on required equipment as you progress.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">How often should I train?</h3>
              <p className="text-gray-600">
                We recommend training 2-3 times per week to start. This allows for proper
                recovery while maintaining steady progress.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Is martial arts training safe?</h3>
              <p className="text-gray-600">
                Safety is our top priority. Our certified instructors ensure proper technique
                and progression, and we maintain a controlled training environment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 