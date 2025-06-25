export default function SummerCampsPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              Summer Camps
            </h1>
            <p className="text-xl text-brand-red font-medium">Ages 5–12</p>
          </div>

          {/* Main Content */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-brand-textMuted leading-relaxed mb-6">
                Our Summer Camps are packed with exciting weekly themes, physical activity, and creative challenges. Each week combines martial arts training with fun, engaging activities designed to build confidence, discipline, and teamwork in a supportive environment.
              </p>
              
              <h2 className="text-2xl font-heading text-brand-white mb-4">Camp Features</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Two 45-minute Martial Arts lessons daily</li>
                <li>Daily Character Development lessons</li>
                <li>Professional instruction from Martial Arts teachers and camp counselors</li>
                <li>Themed crafts, games, and challenges</li>
                <li>Martial Arts Grading at the end of each week</li>
                <li>Full-week and single-day registration options available</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Weekly Themes</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Ninja Week - Stealth, agility, and ancient warrior skills</li>
                <li>Superhero Week - Channel your inner hero with special powers training</li>
                <li>Around the World - Explore martial arts from different cultures</li>
                <li>Animal Kingdom - Learn movements inspired by nature's fighters</li>
                <li>Space Adventure - Martial arts training in the galaxy</li>
                <li>Pirates & Warriors - Adventure-themed activities and challenges</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Daily Activities</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Morning martial arts training session</li>
                <li>Character development and life skills</li>
                <li>Themed crafts and creative projects</li>
                <li>Team building games and challenges</li>
                <li>Afternoon martial arts session</li>
                <li>Group activities and free play</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Benefits</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Skill progression with weekly grading ceremonies</li>
                <li>Enhanced creativity through themed activities</li>
                <li>Strong friendships and social skills</li>
                <li>Physical fitness and coordination</li>
                <li>Confidence building and personal growth</li>
                <li>Memorable summer experiences</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-brand-textMuted mb-6">
              Give your child an unforgettable summer filled with adventure, learning, and new friendships!
            </p>
            <div className="space-x-4">
              <button className="bg-brand-red hover:bg-brand-redHover text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Register Now
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