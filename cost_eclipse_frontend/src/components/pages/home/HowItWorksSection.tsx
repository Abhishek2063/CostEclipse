import { Card } from '@/components/ui/card';
import { ArrowRight, UserPlus, Camera, BarChart3 } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      icon: UserPlus,
      title: 'Sign Up & Set Goals',
      description: 'Create your account in minutes and set up your financial goals, budget categories, and preferences.',
      features: ['Quick onboarding', 'Goal setting wizard', 'Category customization']
    },
    {
      step: '02',
      icon: Camera,
      title: 'Track Expenses Effortlessly',
      description: 'Add expenses with receipt scanning, manual entry, or automatic bank sync. Create groups for shared expenses.',
      features: ['Receipt OCR scanning', 'Manual entry', 'Group creation']
    },
    {
      step: '03',
      icon: BarChart3,
      title: 'Gain Financial Insights',
      description: 'Analyze spending patterns, track goal progress, and make informed decisions with detailed reports.',
      features: ['Interactive charts', 'Progress tracking', 'Custom reports']
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From setup to insights in minutes. CostEclipse makes financial management effortless.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 relative">
            {/* Connection Lines for Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary to-secondary -translate-y-1/2 z-0"></div>
            <div className="hidden lg:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary to-secondary -translate-y-1/2 z-0"></div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative z-10">
                  <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-background">
                    {/* Step Number */}
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-lg">
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center justify-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Next Arrow for Mobile */}
                    {index < steps.length - 1 && (
                      <div className="lg:hidden flex justify-center mt-8">
                        <ArrowRight className="h-6 w-6 text-primary" />
                      </div>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Interactive Demo CTA */}
          {/* <div className="text-center mt-16">
            <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-primary/20">
              <h3 className="text-2xl font-bold mb-4">See It in Action</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Experience CostEclipse with our interactive demo. No signup required.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                Try Interactive Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </div> */}
        </div>
      </div>
    </section>
  );
}