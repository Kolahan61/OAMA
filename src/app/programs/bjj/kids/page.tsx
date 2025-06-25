export default function BJJKidsPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              Brazilian Jiu-Jitsu – Kids
            </h1>
            <p className="text-xl text-brand-red font-medium">Ages 6–15</p>
          </div>

          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-brand-textMuted leading-relaxed mb-6">
                The Kids BJJ program teaches practical self-defense, grappling fundamentals, and respect — all through engaging, 
                hands-on training. Kids gain confidence, focus, and problem-solving skills on and off the mats.
              </p>
              
              <h2 className="text-2xl font-heading text-brand-white mb-4">What Your Child Will Learn</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Basic BJJ positions and movements</li>
                <li>Fundamental submissions and escapes</li>
                <li>Self-defense techniques and applications</li>
                <li>Rolling (sparring) in a controlled environment</li>
                <li>Problem-solving and strategic thinking</li>
                <li>Respect, discipline, and teamwork</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Benefits</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Enhanced problem-solving abilities</li>
                <li>Improved flexibility and coordination</li>
                <li>Increased self-confidence and resilience</li>
                <li>Better focus and concentration</li>
                <li>Practical self-defense skills</li>
                <li>Character development and respect</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-brand-textMuted mb-6">
              Help your child develop confidence and problem-solving skills through the gentle art.
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