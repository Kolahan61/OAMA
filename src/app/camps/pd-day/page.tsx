export default function PDDayCampsPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              PD Day Camps
            </h1>
            <p className="text-xl text-brand-red font-medium">Ages 5–12</p>
          </div>

          {/* Main Content */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-brand-textMuted leading-relaxed mb-6">
                Our PD Day Camps are a full day of fun, martial arts, and character-building activities. These single-day camps are perfect for school closure days, offering kids a structured, active, and enriching experience. Each camp includes two martial arts lessons, themed crafts and games, and focused lessons on leadership and personal growth.
              </p>
              
              <h2 className="text-2xl font-heading text-brand-white mb-4">Camp Features</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Two 45-minute Martial Arts lessons</li>
                <li>Character Development sessions</li>
                <li>Pre- and Post-Camp care (8:00 AM to 5:30 PM)</li>
                <li>Themed games, crafts, and group activities</li>
                <li>Supervision by professional instructors and experienced staff</li>
                <li>Nutritious snacks and lunch included</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Daily Schedule</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>8:00 AM - Pre-camp care and arrival</li>
                <li>9:00 AM - First martial arts lesson</li>
                <li>10:00 AM - Character development session</li>
                <li>11:00 AM - Themed games and activities</li>
                <li>12:00 PM - Lunch and quiet time</li>
                <li>1:00 PM - Crafts and creative activities</li>
                <li>2:30 PM - Second martial arts lesson</li>
                <li>3:30 PM - Group games and team building</li>
                <li>4:30 PM - Free play and post-camp care until pickup</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Benefits</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Safe, structured environment on PD days</li>
                <li>Physical activity and martial arts skill development</li>
                <li>Character building and leadership skills</li>
                <li>Social interaction with peers</li>
                <li>Creative expression through crafts and games</li>
                <li>Professional supervision and care</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-brand-textMuted mb-6">
              Register your child for our next PD Day Camp and give them an enriching day of learning and fun!
            </p>
            <div className="space-x-4">
              <button className="bg-brand-red hover:bg-brand-redHover text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Register Now
              </button>
              <button className="border border-brand-border hover:border-brand-red text-brand-white hover:text-brand-red font-semibold px-8 py-3 rounded-lg transition-colors">
                View Dates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 