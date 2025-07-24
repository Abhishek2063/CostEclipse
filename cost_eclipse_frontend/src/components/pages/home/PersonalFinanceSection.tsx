import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Camera, 
  Smartphone, 
  TrendingUp, 
  Target,
  ArrowRight,
  Check,
  Zap,
  Shield
} from 'lucide-react';

export function PersonalFinanceSection() {
  const features = [
    {
      id: 'expense-tracking',
      title: 'Smart Expense Tracking',
      subtitle: 'AI-Powered Recognition & Categorization',
      description: 'Never miss an expense again with intelligent tracking that learns from your habits and automatically categorizes transactions.',
      badge: 'Most Popular',
      badgeVariant: 'default' as const,
      icon: Camera,
      benefits: [
        'Instant receipt scanning with OCR technology',
        'Auto-categorization with 95% accuracy',
        'Recurring expense detection',
        'Multi-currency support',
        'Offline expense logging'
      ],
      stats: {
        accuracy: '95%',
        timesSaved: '10 hours/month',
        users: '45k+'
      },
      mockScreenshot: {
        title: 'Receipt Scanner Interface',
        description: 'Point, scan, done - expenses logged in seconds'
      }
    },
    {
      id: 'budget-management',
      title: 'Intelligent Budget Management',
      subtitle: 'Stay on Track with Smart Alerts',
      description: 'Create flexible budgets that adapt to your lifestyle with predictive analytics and proactive notifications.',
      badge: 'New',
      badgeVariant: 'secondary' as const,
      icon: TrendingUp,
      benefits: [
        'Flexible budget categories and limits',
        'Predictive spending analysis',
        'Smart alerts before overspending',
        'Monthly vs. weekly budget views',
        'Budget rollover and adjustments'
      ],
      stats: {
        accuracy: '87%',
        timesSaved: '5 hours/month',
        users: '38k+'
      },
      mockScreenshot: {
        title: 'Budget Dashboard',
        description: 'Visual budget tracking with real-time updates'
      }
    },
    {
      id: 'savings-goals',
      title: 'Motivational Savings Goals',
      subtitle: 'Achieve Your Financial Dreams',
      description: 'Set meaningful goals and stay motivated with progress tracking, milestones, and achievement celebrations.',
      badge: null,
      badgeVariant: 'outline' as const,
      icon: Target,
      benefits: [
        'Visual progress tracking',
        'Milestone celebrations',
        'Goal categories and templates',
        'Automatic savings recommendations',
        'Social sharing for accountability'
      ],
      stats: {
        accuracy: '78%',
        timesSaved: '2 hours/month',
        users: '32k+'
      },
      mockScreenshot: {
        title: 'Goals Overview',
        description: 'Track multiple goals with beautiful progress visualization'
      }
    },
    {
      id: 'mobile-first',
      title: 'Mobile-First Experience',
      subtitle: 'Financial Control in Your Pocket',
      description: 'Native mobile experience with offline capabilities, ensuring your financial data is always accessible.',
      badge: 'PWA Ready',
      badgeVariant: 'outline' as const,
      icon: Smartphone,
      benefits: [
        'Progressive Web App (PWA) technology',
        'Offline functionality',
        'Native mobile feel',
        'Push notifications',
        'Quick actions and shortcuts'
      ],
      stats: {
        accuracy: '99.9%',
        timesSaved: 'Always available',
        users: '50k+'
      },
      mockScreenshot: {
        title: 'Mobile Interface',
        description: 'Intuitive mobile design for on-the-go tracking'
      }
    }
  ];

  return (
    <section id="personal-finance" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Personal Finance Made Simple
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful tools designed to give you complete control over your personal financial journey.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={feature.id} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content Side */}
                <div className={`space-y-6 ${!isEven ? 'lg:col-start-2' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      {feature.badge && (
                        <Badge variant={feature.badgeVariant} className="font-medium">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-lg text-primary font-medium mb-3">{feature.subtitle}</p>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-success" />
                        </div>
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-primary">{feature.stats.accuracy}</div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-secondary">{feature.stats.timesSaved}</div>
                      <div className="text-xs text-muted-foreground">Time Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-success">{feature.stats.users}</div>
                      <div className="text-xs text-muted-foreground">Active Users</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                    Try This Feature
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Screenshot Side */}
                <div className={`${!isEven ? 'lg:col-start-1' : ''}`}>
                  <Card className="p-8 bg-gradient-to-br from-accent/50 to-primary/5 border-2 border-primary/10 hover:shadow-xl transition-all duration-300">
                    {/* Mock Screenshot */}
                    <div className="aspect-[4/3] bg-background rounded-lg border-2 border-border shadow-lg mb-4 p-6 relative overflow-hidden">
                      {/* Screenshot Header */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-error rounded-full"></div>
                          <div className="w-3 h-3 bg-warning rounded-full"></div>
                          <div className="w-3 h-3 bg-success rounded-full"></div>
                        </div>
                        <div className="text-xs text-muted-foreground">CostEclipse</div>
                      </div>

                      {/* Screenshot Content */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Icon className="h-8 w-8 text-primary" />
                          <div>
                            <div className="font-semibold">{feature.mockScreenshot.title}</div>
                            <div className="text-sm text-muted-foreground">{feature.mockScreenshot.description}</div>
                          </div>
                        </div>

                        {/* Mock UI Elements */}
                        <div className="space-y-2">
                          <div className="h-2 bg-primary/20 rounded-full w-3/4"></div>
                          <div className="h-2 bg-muted rounded-full w-1/2"></div>
                          <div className="h-2 bg-secondary/20 rounded-full w-2/3"></div>
                        </div>

                        {/* Mock Chart/Graph */}
                        <div className="mt-6 h-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-end justify-around p-2">
                          {[40, 60, 45, 80, 35, 70, 55].map((height, i) => (
                            <div 
                              key={i} 
                              className="bg-primary/40 rounded-t" 
                              style={{ height: `${height}%`, width: '8px' }}
                            ></div>
                          ))}
                        </div>
                      </div>

                      {/* Floating Elements */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                        <Zap className="h-4 w-4 text-success" />
                      </div>
                      <div className="absolute bottom-4 left-4 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                    </div>

                    {/* Screenshot Description */}
                    <div className="text-center">
                      <h4 className="font-semibold mb-1">{feature.mockScreenshot.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.mockScreenshot.description}</p>
                    </div>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}