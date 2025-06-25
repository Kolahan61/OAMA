export default function AboutPage() {
  const instructors = [
    {
      name: "Matthew \"Hammer\" Hache",
      title: "Sensei",
      position: "Head Instructor & Owner",
      image: "/images/instructors/Matthew Hache.png",
      imagePosition: "center 5%", // Custom positioning for face centering
      description: "With over [X] years of experience in Brazilian Jiu-Jitsu, Sensei Matthew founded OAMA with the vision of creating a comprehensive martial arts academy that serves the Ottawa community.",
      achievements: [
        "Black Belt in Brazilian Jiu-Jitsu",
        "Academy Owner and Founder",
        "Competition achievements and certifications"
      ]
    },
    {
      name: "Justin Primrose",
      title: "Sensei",
      position: "BJJ Instructor",
      image: "/images/instructors/Justin Primrose.png",
      imagePosition: "center 30%",
      description: "Sensei Justin brings technical precision and deep knowledge of Brazilian Jiu-Jitsu to his instruction, helping students refine their technique.",
      achievements: [
        "Brazilian Jiu-Jitsu expertise",
        "Technical instruction specialist",
        "Competition experience"
      ]
    },
    {
      name: "Jo Maisonneuve",
      title: "Coach",
      position: "Women's Program Instructor",
      image: "/images/instructors/Jo Maisonneuve.png",
      imagePosition: "center 25%",
      description: "Coach Jo leads our women's programs, creating a supportive and empowering environment for female martial artists of all levels.",
      achievements: [
        "Women's martial arts specialist",
        "Empowerment through martial arts",
        "Inclusive training environment creator"
      ]
    },
    {
      name: "Aramiss Gadito",
      title: "Kru",
      position: "Kids and Muay Thai Instructor",
      image: "/images/instructors/Aramiss Gadito.png",
      imagePosition: "center 10%",
      description: "Kru Aramiss brings authentic Muay Thai knowledge and technique to OAMA, teaching both traditional methods and modern applications.",
      achievements: [
        "Traditional Muay Thai expertise",
        "Youth Muay Thai specialist",
        "Cultural martial arts knowledge"
      ]
    },
    {
      name: "Loubert Nicolas",
      title: "Coach",
      position: "Kids and Muay Thai Instructor",
      image: "/images/instructors/Loubert Nicolas.png",
      imagePosition: "center 15%",
      description: "Coach Loubert combines technical skill with motivational coaching, helping students develop both their Muay Thai abilities and confidence.",
      achievements: [
        "Muay Thai technical instruction",
        "Youth development specialist",
        "Motivational coaching expertise"
      ]
    },
    {
      name: "Ethan Major",
      title: "Sensei",
      position: "Kids and BJJ Instructor",
      image: "/images/instructors/Ethan Major.png",
      imagePosition: "center 25%",
      description: "Sensei Ethan works with both adult and youth students, bringing versatility and adaptability to his teaching approach.",
      achievements: [
        "Multi-age group instruction",
        "BJJ technical expertise",
        "Youth mentorship specialist"
      ]
    },
    {
      name: "Jake Tahan",
      title: "Sensei",
      position: "Kids BJJ & Tiny Tigers Instructor",
      image: "/images/instructors/Jake Tahan.png",
      imagePosition: "center 25%",
      description: "Sensei Jake specializes in working with young martial artists, bringing patience, enthusiasm, and expertise to every kids class.",
      achievements: [
        "Specialized in youth martial arts instruction",
        "Expert in child development through martial arts",
        "Tiny Tigers program developer"
      ]
    },
    {
      name: "Eric Nadon",
      title: "Sensei",
      position: "BJJ Instructor",
      image: "/images/instructors/Eric Nadon.png",
      imagePosition: "center 20%",
      description: "Sensei Eric is known for his analytical approach to BJJ, breaking down complex techniques into understandable components for students of all levels.",
      achievements: [
        "Advanced BJJ practitioner",
        "Technical analysis specialist",
        "Student development focused"
      ]
    },
    {
      name: "Ali Kolahan",
      title: "",
      position: "General Manager",
      image: "/images/instructors/Ali Kolahan.png",
      imagePosition: "center 23%",
      description: "Ali oversees the daily operations of OAMA, ensuring that every student receives the best possible experience and support.",
      achievements: [
        "Operations management expertise",
        "Student success coordinator",
        "Academy administration specialist"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">
              About OAMA
            </h1>
            <p className="text-xl text-brand-textMuted max-w-3xl mx-auto mb-8">
              Meet the dedicated team of instructors and staff who make The Ottawa Academy of Martial Arts 
              a premier destination for martial arts training in the nation's capital.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-16 text-center">
            <h2 className="text-3xl font-heading text-brand-white mb-4">Our Mission</h2>
            <p className="text-brand-textMuted text-lg leading-relaxed">
              At The Ottawa Academy of Martial Arts, we are committed to providing world-class martial arts instruction 
              in a supportive, inclusive environment. Our experienced team of instructors brings together decades of 
              combined experience in Brazilian Jiu-Jitsu, Muay Thai, and youth development to help every student 
              achieve their personal goals while building strength, discipline, and confidence.
            </p>
          </div>

          {/* Instructors Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading text-brand-white text-center mb-12">
              Meet Our Instructors & Staff
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructors.map((instructor, index) => (
                <div key={index} className="bg-brand-surface border border-brand-border rounded-lg p-6 hover:border-brand-red transition-colors">
                                     {/* Instructor Image */}
                   <div className="w-32 h-32 mx-auto mb-4 bg-brand-border rounded-full flex items-center justify-center overflow-hidden">
                     {instructor.image ? (
                       <img 
                         src={instructor.image} 
                         alt={instructor.name}
                         className="w-full h-full object-cover"
                         style={{
                           objectPosition: instructor.imagePosition || 'center 25%'
                         }}
                       />
                     ) : (
                       <div className="text-4xl text-brand-textMuted">👤</div>
                     )}
                   </div>
                  
                  {/* Instructor Info */}
                  <div className="text-center mb-4">
                                         <h3 className="text-xl font-heading text-brand-white mb-1">
                       {instructor.title && `${instructor.title} `}{instructor.name}
                     </h3>
                    <p className="text-brand-red font-medium">{instructor.position}</p>
                  </div>
                  
                  {/* Description */}
                  <p className="text-brand-textMuted text-sm mb-4 leading-relaxed">
                    {instructor.description}
                  </p>
                  
                  {/* Achievements */}
                  <div>
                    <h4 className="text-brand-white font-medium mb-2 text-sm">Specialties & Achievements:</h4>
                    <ul className="space-y-1">
                      {instructor.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="text-brand-textMuted text-xs flex items-start">
                          <span className="text-brand-red mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academy Values */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-heading text-brand-white text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🥋</div>
                <h3 className="text-xl font-heading text-brand-red mb-3">Excellence</h3>
                <p className="text-brand-textMuted">
                  We strive for excellence in everything we do, from instruction quality to facility maintenance, 
                  ensuring every student receives the best possible experience.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-heading text-brand-red mb-3">Community</h3>
                <p className="text-brand-textMuted">
                  We foster a welcoming, supportive community where students of all ages and skill levels 
                  can grow together and support each other's martial arts journey.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-heading text-brand-red mb-3">Growth</h3>
                <p className="text-brand-textMuted">
                  We believe in continuous improvement and personal growth, helping each student develop 
                  not just martial arts skills, but character, confidence, and life skills.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-heading text-brand-white mb-4">
              Ready to Join Our Community?
            </h3>
            <p className="text-brand-textMuted mb-8">
              Experience the OAMA difference with our expert instruction and supportive community.
            </p>
            <div className="space-x-4">
              <a 
                href="/free-week" 
                className="inline-block bg-brand-red hover:bg-red-700 text-white py-4 px-8 rounded-lg font-medium transition-colors text-lg"
              >
                Start Your Free Week
              </a>
              <a 
                href="/contact" 
                className="inline-block border border-brand-border hover:border-brand-red text-brand-white hover:text-brand-red py-4 px-8 rounded-lg font-medium transition-colors text-lg"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 