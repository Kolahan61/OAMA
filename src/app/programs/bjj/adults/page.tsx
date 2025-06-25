export default function BJJAdultsPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              Brazilian Jiu-Jitsu – Adults
            </h1>
            <p className="text-xl text-brand-red font-medium">Ages 16+</p>
          </div>

          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-brand-textMuted leading-relaxed mb-6">
                Whether you're training for fitness, self-defense, or competition, our Adult BJJ classes help you develop real grappling skills. 
                Learn submissions, escapes, and strategy in a supportive, ego-free environment.
              </p>
              
              <h2 className="text-2xl font-heading text-brand-white mb-4">What You'll Learn</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Fundamental and advanced BJJ techniques</li>
                <li>Guard work, submissions, and escapes</li>
                <li>Positional control and transitions</li>
                <li>Competition strategies and techniques</li>
                <li>Self-defense applications</li>
                <li>Mental game and problem-solving</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Benefits</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Full-body functional fitness</li>
                <li>Practical self-defense skills</li>
                <li>Mental resilience and problem-solving</li>
                <li>Stress relief and mindfulness</li>
                <li>Supportive community environment</li>
                <li>Personal growth and confidence</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-brand-textMuted mb-6">
              Ready to join the gentle art and transform your fitness and mindset?
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