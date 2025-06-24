export default function TinyTigersPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              Tiny Tigers
            </h1>
            <p className="text-xl text-brand-red font-medium">Ages 3–6</p>
          </div>

          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-brand-textMuted leading-relaxed mb-6">
                Tiny Tigers is our beginner martial arts program specially designed for young children. Classes are 45 minutes long 
                and focus on coordination, listening skills, focus, and basic martial arts movements — all taught through fun, 
                age-appropriate games and drills. It's an ideal first step toward building structure, discipline, and fitness in a positive environment.
              </p>
              
              <h2 className="text-2xl font-heading text-brand-white mb-4">What Your Child Will Learn</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Basic martial arts movements and stances</li>
                <li>Coordination and balance exercises</li>
                <li>Following instructions and listening skills</li>
                <li>Focus and attention span development</li>
                <li>Social interaction and teamwork</li>
                <li>Fun games that build martial arts foundations</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Program Features</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>45-minute classes perfect for young attention spans</li>
                <li>Age-appropriate games and activities</li>
                <li>Small class sizes for individual attention</li>
                <li>Positive reinforcement and encouragement</li>
                <li>Safe, structured learning environment</li>
                <li>Foundation for future martial arts training</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-brand-textMuted mb-6">
              Give your little one the best start in martial arts and life skills.
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