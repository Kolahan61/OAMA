export default function MarchBreakCampPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              March Break Camp
            </h1>
            <p className="text-xl text-brand-red font-medium">Ages 5–12</p>
          </div>

          {/* Main Content */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-brand-textMuted leading-relaxed mb-6">
                Our March Break Camp offers a high-energy week of martial arts, teamwork, and hands-on activities. With a structured daily schedule, campers stay active while developing valuable life skills in a positive and safe environment.
              </p>
              
              <h2 className="text-2xl font-heading text-brand-white mb-4">Camp Features</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Daily Martial Arts instruction (two lessons per day)</li>
                <li>Character Development lessons</li>
                <li>Team-building games and creative activities</li>
                <li>Special events and themed sessions like NERF activities</li>
                <li>Pre- and Post-Camp care from 8:00 AM to 5:30 PM</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Daily Schedule</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>8:00 AM - Pre-camp care and arrival</li>
                <li>9:00 AM - First martial arts lesson</li>
                <li>10:00 AM - Character development session</li>
                <li>10:30 AM - Break and snack time</li>
                <li>11:00 AM - Team-building activities</li>
                <li>12:00 PM - Lunch and quiet time</li>
                <li>1:00 PM - Creative activities and crafts</li>
                <li>2:00 PM - Special themed sessions (NERF wars, obstacle courses)</li>
                <li>3:00 PM - Second martial arts lesson</li>
                <li>4:00 PM - Group games and team challenges</li>
                <li>5:00 PM - Free play and post-camp care until pickup</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Special Activities</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>NERF battle royale sessions</li>
                <li>Martial arts obstacle courses</li>
                <li>Team challenge competitions</li>
                <li>Leadership skill workshops</li>
                <li>Creative arts and crafts projects</li>
                <li>Group games and cooperative activities</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Benefits</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>High-energy activities to burn off excess energy</li>
                <li>Structured environment during school break</li>
                <li>Leadership and teamwork skill development</li>
                <li>Physical fitness and martial arts progression</li>
                <li>Social interaction and friendship building</li>
                <li>Character development and personal growth</li>
                <li>Safe, supervised care for working parents</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-brand-textMuted mb-6">
              Make your child's March Break memorable with our action-packed camp experience!
            </p>
            <div className="space-x-4">
              <button className="bg-brand-red hover:bg-brand-redHover text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Register Now
              </button>
              <button className="border border-brand-border hover:border-brand-red text-brand-white hover:text-brand-red font-semibold px-8 py-3 rounded-lg transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 