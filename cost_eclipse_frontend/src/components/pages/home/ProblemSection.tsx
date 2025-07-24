import { Card } from '@/components/ui/card';
import { AlertTriangle, TrendingDown, Users, Target } from 'lucide-react';

export function ProblemSection() {
  const problems = [
    {
      icon: AlertTriangle,
      title: 'Lost Track of Spending',
      description: 'Without proper tracking, expenses pile up and budgets get blown without warning.',
      stat: '73%',
      statLabel: 'overspend monthly'
    },
    {
      icon: TrendingDown,
      title: 'No Financial Visibility',
      description: 'Lack of insights makes it impossible to identify spending patterns and optimize finances.',
      stat: '68%',
      statLabel: 'have no budget'
    },
    {
      icon: Users,
      title: 'Group Expense Chaos',
      description: 'Splitting bills and tracking shared expenses becomes a nightmare of spreadsheets and IOUs.',
      stat: '85%',
      statLabel: 'struggle with group expenses'
    },
    {
      icon: Target,
      title: 'Failed Savings Goals',
      description: 'Without clear tracking and motivation, financial goals remain wishful thinking.',
      stat: '91%',
      statLabel: 'miss their goals'
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Financial Management Shouldn't Be This Hard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Most people struggle with money management because traditional tools are complex, disconnected, and don't fit real life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-error" />
                  </div>
                  <h3 className="font-semibold mb-2">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="text-2xl font-bold text-error">{problem.stat}</div>
                  <div className="text-xs text-muted-foreground">{problem.statLabel}</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Solution Transition */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border">
          <h3 className="text-2xl font-bold mb-4">
            There's a <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Better Way</span>
          </h3>
          <p className="text-lg text-muted-foreground">
            CostEclipse transforms financial chaos into clarity with intelligent tracking, seamless collaboration, and actionable insights.
          </p>
        </div>
      </div>
    </section>
  );
}