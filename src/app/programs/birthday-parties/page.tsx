export default function BirthdayPartiesPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              Birthday Parties
            </h1>
            <p className="text-xl text-brand-red font-medium">Unforgettable Martial Arts Celebrations</p>
          </div>

          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-brand-textMuted leading-relaxed mb-6">
                Make your child's special day unforgettable with a martial arts-themed birthday party! We provide a fun, active experience 
                with games, mini-lessons, and time for cake and celebration — no martial arts experience needed.
              </p>
              
              <h2 className="text-2xl font-heading text-brand-white mb-4">Party Includes</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>90-minute party experience</li>
                <li>Age-appropriate martial arts games and activities</li>
                <li>Mini martial arts lessons for all guests</li>
                <li>Dedicated party host and instructor</li>
                <li>Time for cake, presents, and celebration</li>
                <li>No martial arts experience required</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">Party Activities</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Fun martial arts-themed games</li>
                <li>Basic technique demonstrations</li>
                <li>Team building activities</li>
                <li>Photo opportunities with equipment</li>
                <li>Birthday ceremony and recognition</li>
                <li>Safe, supervised fun for all ages</li>
              </ul>

              <h2 className="text-2xl font-heading text-brand-white mb-4">What We Provide</h2>
              <ul className="list-disc list-inside text-brand-textMuted space-y-2 mb-6">
                <li>Professional martial arts instructors</li>
                <li>All necessary equipment and space</li>
                <li>Tables and chairs for cake/presents</li>
                <li>Clean, safe party environment</li>
                <li>Memorable experience for the birthday child</li>
                <li>Stress-free planning for parents</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-brand-textMuted mb-6">
              Ready to plan an action-packed birthday celebration your child will never forget?
            </p>
            <div className="space-x-4">
              <button className="bg-brand-red hover:bg-brand-redHover text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Book Party
              </button>
              <button className="border border-brand-border hover:border-brand-red text-brand-white hover:text-brand-red font-semibold px-8 py-3 rounded-lg transition-colors">
                Get Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 