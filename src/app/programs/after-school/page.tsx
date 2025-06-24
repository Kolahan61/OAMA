export default function AfterSchoolPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              After School Program
            </h1>
            <p className="text-xl text-brand-red font-medium">Ages 5–12</p>
          </div>

          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-brand-textMuted leading-relaxed mb-6">
                Our After School Program offers a fun, structured environment for kids ages 5 to 12. We provide school pick-up from select locations, 
                followed by martial arts training, fitness activities, and personal development. The program runs until 5:30 PM and includes dedicated 
                time for homework, quiet play, and life skills. It's the perfect way for kids to stay active, engaged, and confident in a supportive setting.
              </p>
              
              <h2 className="text-2xl font-heading text-brand-white mb-4">Program Features</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>School pick-up from select locations</li>
                <li>Martial arts training and instruction</li>
                <li>Dedicated homework time with supervision</li>
                <li>Fitness activities and games</li>
                <li>Character development and life skills</li>
                <li>Program runs until 5:30 PM</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Daily Schedule</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>School pick-up and arrival</li>
                <li>Snack time and settling in</li>
                <li>Homework assistance and quiet study</li>
                <li>Martial arts training session</li>
                <li>Fitness activities and free play</li>
                <li>Life skills and character building</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-brand-textMuted mb-6">
              Give your child a safe, structured, and enriching after-school experience.
            </p>
            <div className="space-x-4">
              <button className="bg-brand-red hover:bg-brand-redHover text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Enroll Now
              </button>
              <button className="border border-brand-border hover:border-brand-red text-brand-white hover:text-brand-red font-semibold px-8 py-3 rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 