export default function MuayThaiKidsPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              Muay Thai – Kids
            </h1>
            <p className="text-xl text-brand-red font-medium">Ages 6–15</p>
          </div>

          {/* Main Content */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-brand-textMuted leading-relaxed mb-6">
                Our Kids Muay Thai program builds discipline, confidence, and fitness in a fun and structured environment. 
                Through striking drills, pad work, and controlled sparring, kids develop real-world self-defense skills 
                while staying active and focused.
              </p>
              
              <h2 className="text-2xl font-heading text-brand-white mb-4">What Your Child Will Learn</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Fundamental Muay Thai techniques and stances</li>
                <li>Striking drills with proper form and technique</li>
                <li>Pad work to develop power and precision</li>
                <li>Controlled sparring in a safe environment</li>
                <li>Self-defense skills and situational awareness</li>
                <li>Discipline, respect, and focus</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Benefits</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Improved physical fitness and coordination</li>
                <li>Enhanced self-confidence and discipline</li>
                <li>Better focus and concentration</li>
                <li>Stress relief and emotional regulation</li>
                <li>Strong foundation in martial arts</li>
                <li>Fun, engaging way to stay active</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-brand-textMuted mb-6">
              Ready to help your child build confidence and discipline through martial arts?
            </p>
            <div className="space-x-4">
              <button className="bg-brand-red hover:bg-brand-redHover text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Book a Free Trial
              </button>
              <button className="border border-brand-border hover:border-brand-red text-brand-white hover:text-brand-red font-semibold px-8 py-3 rounded-lg transition-colors">
                View Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 