import Link from 'next/link';

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <section className="bg-brand-surface border-b border-brand-border py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-6 font-bold">
            Our Programs
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover the perfect martial arts program for you. From beginner-friendly classes to advanced training, 
            we offer something for every age and skill level.
          </p>
        </div>
      </section>

      {/* Programs Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Muay Thai Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-brand-red mb-4">MUAY THAI</h2>
            <div className="h-48 w-full bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-gray-400 text-lg">Muay Thai Image Placeholder</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kids Muay Thai */}
            <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-24 w-24 bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-400 text-xs text-center">Kids MT<br/>Icon</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-brand-white mb-2">Kids (Ages 6–15)</h3>
                  <p className="text-brand-textMuted leading-relaxed">
                    Build discipline, confidence, and fitness through striking drills and pad work in a fun, structured class.
                  </p>
                </div>
              </div>
              <Link 
                href="/programs/muay-thai/kids" 
                className="inline-block bg-brand-red hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
              >
                Learn More
              </Link>
            </div>

            {/* Adults Muay Thai */}
            <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-24 w-24 bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-400 text-xs text-center">Adult MT<br/>Icon</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-brand-white mb-2">Adults (Ages 16+)</h3>
                  <p className="text-brand-textMuted leading-relaxed">
                    Authentic Muay Thai training suitable for all experience levels, from beginners to competitive fighters.
                  </p>
                </div>
              </div>
              <Link 
                href="/programs/muay-thai/adults" 
                className="inline-block bg-brand-red hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Brazilian Jiu-Jitsu Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-brand-red mb-4">BRAZILIAN JIU-JITSU</h2>
            <div className="h-48 w-full bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-gray-400 text-lg">Brazilian Jiu-Jitsu Image Placeholder</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kids BJJ */}
            <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-24 w-24 bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-400 text-xs text-center">Kids BJJ<br/>Icon</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-brand-white mb-2">Kids (Ages 6–15)</h3>
                  <p className="text-brand-textMuted leading-relaxed">
                    Learn practical self-defense and grappling skills in a positive and encouraging setting.
                  </p>
                </div>
              </div>
              <Link 
                href="/programs/bjj/kids" 
                className="inline-block bg-brand-red hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
              >
                Learn More
              </Link>
            </div>

            {/* Adults BJJ */}
            <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-24 w-24 bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-400 text-xs text-center">Adult BJJ<br/>Icon</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-brand-white mb-2">Adults (Ages 16+)</h3>
                  <p className="text-brand-textMuted leading-relaxed">
                    Train in real grappling techniques to build strength, flexibility, and self-defense skills, or prepare for competition.
                  </p>
                </div>
              </div>
              <Link 
                href="/programs/bjj/adults" 
                className="inline-block bg-brand-red hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Special Programs Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-brand-red mb-4">SPECIAL PROGRAMS</h2>
            <div className="h-48 w-full bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-gray-400 text-lg">Special Programs Image Placeholder</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tiny Tigers */}
            <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-24 w-24 bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-400 text-xs text-center">Tiny Tigers<br/>Icon</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-brand-white mb-2">Tiny Tigers (Ages 4–6)</h3>
                  <p className="text-brand-textMuted leading-relaxed">
                    A beginner martial arts class that focuses on listening skills, movement, and coordination in a fun environment.
                  </p>
                </div>
              </div>
              <Link 
                href="/programs/tiny-tigers" 
                className="inline-block bg-brand-red hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
              >
                Learn More
              </Link>
            </div>

            {/* After School Program */}
            <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-24 w-24 bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-400 text-xs text-center">After School<br/>Icon</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-brand-white mb-2">After School Program (Ages 5–12)</h3>
                  <p className="text-brand-textMuted leading-relaxed">
                    Includes school pick-up, martial arts training, and structured time for snacks and homework.
                  </p>
                </div>
              </div>
              <Link 
                href="/programs/after-school" 
                className="inline-block bg-brand-red hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
              >
                Learn More
              </Link>
            </div>

            {/* Women's-Only Programs */}
            <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-24 w-24 bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-400 text-xs text-center">Women's<br/>Icon</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-brand-white mb-2">Women's-Only Programs</h3>
                  <p className="text-brand-textMuted leading-relaxed">
                    Female-focused Muay Thai and BJJ classes that foster empowerment, fitness, and self-defense.
                  </p>
                </div>
              </div>
              <Link 
                href="/programs/womens-only" 
                className="inline-block bg-brand-red hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
              >
                Learn More
              </Link>
            </div>

            {/* Birthday Parties */}
            <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-24 w-24 bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-400 text-xs text-center">Birthday<br/>Icon</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-brand-white mb-2">Birthday Parties</h3>
                  <p className="text-brand-textMuted leading-relaxed">
                    Action-packed martial arts birthday parties that include mini-lessons, games, and fun activities.
                  </p>
                </div>
              </div>
              <Link 
                href="/programs/birthday-parties" 
                className="inline-block bg-brand-red hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-brand-surface border border-brand-border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-brand-white mb-4">Ready to Get Started?</h2>
          <p className="text-brand-textMuted mb-6 max-w-2xl mx-auto">
            Join our community and discover the benefits of martial arts training. 
            Try your first week free and see which program is right for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/free-week" 
              className="bg-brand-red hover:bg-red-600 text-white px-8 py-3 rounded-md transition-colors font-medium"
            >
              Start Your Free Week
            </Link>
            <Link 
              href="/schedule" 
              className="border border-brand-border hover:border-brand-red text-brand-white hover:text-brand-red px-8 py-3 rounded-md transition-colors font-medium"
            >
              View Schedule
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
} 