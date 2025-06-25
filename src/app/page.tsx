import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
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
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        
        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Welcome to The Ottawa Academy of Martial Arts
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 drop-shadow-md">
            Forge Strength, Discipline, and Confidence through Martial Arts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link 
              href="/free-week"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors drop-shadow-lg"
            >
              Start Your Journey
            </Link>
            <Link 
              href="/schedule"
              className="inline-block bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors drop-shadow-lg"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🥋</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p className="text-gray-600">
              Learn from experienced black belt instructors with years of competition and teaching experience.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">All Levels Welcome</h3>
            <p className="text-gray-600">
              Whether you're a complete beginner or experienced practitioner, we have classes for you.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏆</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Competition Team</h3>
            <p className="text-gray-600">
              Join our competition team and test your skills in local and international tournaments.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Training?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join us for a free trial class and experience the benefits of BJJ
          </p>
          <Link 
            href="/free-week"
            className="inline-block bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Book Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
} 