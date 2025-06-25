export default function MuayThaiAdultsPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              Muay Thai – Adults
            </h1>
            <p className="text-xl text-brand-red font-medium">Ages 16+</p>
          </div>

          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-brand-textMuted leading-relaxed mb-6">
                Our Adult Muay Thai classes offer authentic striking training for all experience levels — from beginners to fighters. 
                Learn powerful techniques, improve your cardio, and join a motivated community that pushes you to grow.
              </p>
              
              <h2 className="text-2xl font-heading text-brand-white mb-4">What You'll Learn</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Traditional Muay Thai techniques and combinations</li>
                <li>Striking fundamentals: punches, kicks, elbows, and knees</li>
                <li>Clinch work and close-range fighting</li>
                <li>Pad work and heavy bag training</li>
                <li>Conditioning and strength building</li>
                <li>Competition preparation (for those interested)</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Benefits</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Exceptional cardiovascular fitness</li>
                <li>Full-body strength and conditioning</li>
                <li>Practical self-defense skills</li>
                <li>Stress relief and mental clarity</li>
                <li>Supportive community environment</li>
                <li>Authentic martial arts training</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-brand-textMuted mb-6">
              Ready to train in the art of eight limbs?
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