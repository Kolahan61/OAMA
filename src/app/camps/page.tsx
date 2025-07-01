import Link from 'next/link'

const camps = [
  {
    href: '/camps/pd-day',
    title: 'PD Day Camps',
    ages: 'Ages 5–12',
    summary:
      'Full day of fun, martial arts, and character-building activities for school closure days. Includes two martial arts lessons, themed crafts, games, and leadership sessions. Supervised by professional instructors, with snacks and lunch included.',
  },
  {
    href: '/camps/summer',
    title: 'Summer Camps',
    ages: 'Ages 5–12',
    summary:
      'Weekly themed camps packed with martial arts, creative challenges, and team-building games. Each week features unique themes (Ninja, Superhero, etc.), daily lessons, crafts, and grading ceremonies. Builds confidence, fitness, and friendships.',
  },
  {
    href: '/camps/march-break',
    title: 'March Break Camp',
    ages: 'Ages 5–12',
    summary:
      'High-energy week of martial arts, teamwork, and hands-on activities. Includes daily lessons, NERF battles, obstacle courses, crafts, and leadership workshops. Provides a safe, structured, and fun environment during school break.',
  },
]

export default function CampsPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">Camps</h1>
            <p className="text-xl text-brand-red font-medium">Explore our martial arts camps for kids ages 5–12</p>
          </div>
          <div className="grid gap-8 md:grid-cols-1">
            {camps.map((camp) => (
              <div
                key={camp.href}
                className="bg-brand-surface border border-brand-border rounded-lg p-8 flex flex-col md:flex-row items-start md:items-center justify-between shadow-lg"
              >
                <div className="flex-1 mb-4 md:mb-0">
                  <h2 className="text-2xl font-heading text-brand-white mb-2">{camp.title}</h2>
                  <p className="text-brand-red font-medium mb-2">{camp.ages}</p>
                  <p className="text-brand-textMuted mb-4">{camp.summary}</p>
                </div>
                <Link
                  href={camp.href}
                  className="bg-brand-red hover:bg-brand-redHover text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 