import { CheckCircle2 } from 'lucide-react'

interface Benefit {
  title: string
  description: string
}

const teacherBenefits: Benefit[] = [
  {
    title: 'Save Time on Administration',
    description: 'Automate grading, attendance, and routine tasks.',
  },
  {
    title: 'Increase Student Engagement',
    description: 'Interactive content keeps students motivated and involved.',
  },
  {
    title: 'Better Learning Outcomes',
    description: 'Data-driven insights help you personalize teaching.',
  },
  {
    title: 'Easy Content Management',
    description: 'Organize and update course materials with a simple interface.',
  },
]

const studentBenefits: Benefit[] = [
  {
    title: 'Learn at Your Own Pace',
    description: 'Access materials anytime, anywhere, on any device.',
  },
  {
    title: 'Personalized Learning Path',
    description: 'Adaptive recommendations based on your progress.',
  },
  {
    title: 'Clear Progress Tracking',
    description: 'Understand your strengths and areas for improvement.',
  },
  {
    title: 'Connect with Peers',
    description: 'Collaborate and learn from classmates globally.',
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Benefits for Everyone
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Whether you're an educator or a student, EduFlow empowers you to succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Educators */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">For Educators</h3>
              <p className="text-foreground/70">
                Create impact with powerful tools designed for modern teaching.
              </p>
            </div>
            <div className="space-y-4">
              {teacherBenefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-foreground/70 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Students */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">For Students</h3>
              <p className="text-foreground/70">
                Master new skills with an intuitive learning platform.
              </p>
            </div>
            <div className="space-y-4">
              {studentBenefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-foreground/70 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
