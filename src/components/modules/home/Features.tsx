import {
  BookOpen,
  BarChart3,
  Users,
  Lock,
  Clock,
  Zap,
} from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Interactive Courses',
    description: 'Create engaging courses with multimedia content, assignments, and real-time discussions.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Advanced Analytics',
    description: 'Track student progress with detailed insights and generate comprehensive reports.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Collaboration Tools',
    description: 'Enable seamless communication between educators and students with built-in messaging.',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and compliance with international data protection standards.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Flexible Learning',
    description: 'Learn at your own pace with lifetime access to course materials and updates.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Fast & Reliable',
    description: '99.9% uptime guarantee with lightning-fast performance globally.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Powerful Features for Modern Learning
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Everything you need to create, manage, and scale your online educational programs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <div className="text-primary">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-foreground/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
