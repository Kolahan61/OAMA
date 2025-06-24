export default function WomensOnlyPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              Women's-Only Programs
            </h1>
            <p className="text-xl text-brand-red font-medium">Empowering Women Through Martial Arts</p>
          </div>

          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-brand-textMuted leading-relaxed mb-6">
                Our Women's-Only Programs feature Muay Thai (striking) and Brazilian Jiu-Jitsu (grappling), offering a complete martial arts 
                experience in a welcoming, female-focused space. Whether you're a beginner or have previous training, these classes are a powerful 
                way to build technique, strength, and confidence — all while training alongside other women.
              </p>
              
              <h2 className="text-2xl font-heading text-brand-white mb-4">Program Offerings</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Women's-Only Muay Thai classes</li>
                <li>Women's-Only Brazilian Jiu-Jitsu sessions</li>
                <li>Self-defense workshops and techniques</li>
                <li>Strength and conditioning training</li>
                <li>Supportive, judgment-free environment</li>
                <li>All skill levels welcome</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Benefits</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Build confidence and self-esteem</li>
                <li>Learn practical self-defense skills</li>
                <li>Improve physical fitness and strength</li>
                <li>Connect with like-minded women</li>
                <li>Comfortable learning environment</li>
                <li>Stress relief and mental wellness</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-brand-textMuted mb-6">
              Join a supportive community of women dedicated to growth and empowerment.
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