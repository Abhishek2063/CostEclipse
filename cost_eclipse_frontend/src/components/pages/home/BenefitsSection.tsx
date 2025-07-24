import { Card } from '@/components/ui/card';
import { Check, User, Users } from 'lucide-react';

export function BenefitsSection() {
  const personalBenefits = [
    'Track every expense automatically',
    'Set and achieve savings goals',
    'Get insights into spending patterns',
    'Never lose a receipt again',
    'Budget alerts and reminders',
    'Export data for tax season',
    'Secure cloud backup',
    'Works offline'
  ];

  const groupBenefits = [
    'Split bills fairly and transparently',
    'Track group trips and events',
    'Settle debts automatically',
    'Real-time expense sharing',
    'Multiple payment methods',
    'Group spending analytics',
    'Participant notifications',
    'Export group reports'
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Benefits for Every Financial Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether managing personal finances or group expenses, CostEclipse has you covered.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Personal Benefits */}
          <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Personal Finance</h3>
              <p className="text-muted-foreground">
                Take complete control of your individual financial journey
              </p>
            </div>

            <div className="space-y-4">
              {personalBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-success" />
                  </div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-center">
                <span className="font-semibold">Perfect for:</span> Students, freelancers, professionals, and anyone wanting better financial control
              </p>
            </div>
          </Card>

          {/* Group Benefits */}
          <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Group Expenses</h3>
              <p className="text-muted-foreground">
                Simplify shared expenses and eliminate money conflicts
              </p>
            </div>

            <div className="space-y-4">
              {groupBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-success" />
                  </div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
              <p className="text-sm text-center">
                <span className="font-semibold">Perfect for:</span> Roommates, travel groups, teams, families, and friend circles
              </p>
            </div>
          </Card>
        </div>

        {/* Combined Value Proposition */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-primary/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              One App, Complete Financial Control
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Why use multiple apps when CostEclipse handles both personal and group finances seamlessly?
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-2">1 App</div>
                <div className="text-sm text-muted-foreground">Instead of 3-4 different tools</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Financial visibility</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success mb-2">Unlimited</div>
                <div className="text-sm text-muted-foreground">Groups and goals</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}