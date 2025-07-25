import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Settings, 
  Wallet, 
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  PlusCircle,
  Target,
  Share2
} from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      id: 1,
      icon: User,
      title: 'Sign Up & Personalize',
      description: 'Start by creating your account and choosing your role — salaried, business owner, or freelancer. Customize preferences based on your financial habits.',
      detailedDescription: 'Our smart onboarding process adapts to your financial situation, providing personalized templates and recommendations from day one.',
      features: [
        'Quick 2-minute signup process',
        'Choose your financial profile',
        'Customize categories and preferences',
        'Set up your first financial goals'
      ],
      mockUI: {
        userTypes: ['💼 Salary Employee', '🏢 Business Owner', '💻 Freelancer', '👤 Personal User'],
        setupProgress: 85,
        categories: ['Food & Dining', 'Transportation', 'Entertainment', 'Bills & Utilities']
      }
    },
    {
      id: 2,
      icon: Wallet,
      title: 'Add Transactions & Create Events',
      description: 'Log daily income, expenses, and recurring bills. For group activities, create events and assign shared expenses.',
      detailedDescription: 'Effortlessly track your financial activities with intelligent categorization and seamless group expense management.',
      features: [
        'Instant receipt scanning',
        'Automatic transaction categorization',
        'Create group events in seconds',
        'Invite participants with one click'
      ],
      mockUI: {
        recentTransactions: [
          { name: 'Grocery Shopping', amount: 67.50, category: 'Food' },
          { name: 'Gas Station', amount: 45.00, category: 'Transport' },
          { name: 'Netflix Subscription', amount: 15.99, category: 'Entertainment' }
        ],
        groupEvent: {
          name: 'Weekend Trip',
          participants: 5,
          totalAmount: 1250
        }
      }
    },
    {
      id: 3,
      icon: BarChart3,
      title: 'Track, Analyze & Optimize',
      description: 'View your dashboards: monthly trends, savings goals, and category-wise breakdowns. Get AI-based insights to manage money better.',
      detailedDescription: 'Transform your financial data into actionable insights with powerful analytics and personalized recommendations.',
      features: [
        'Real-time financial dashboard',
        'Monthly trends and patterns',
        'Savings goal progress tracking',
        'AI-powered financial insights'
      ],
      mockUI: {
        monthlySpending: 3240,
        savingsGoal: { current: 8400, target: 10000 },
        insights: [
          'Spending decreased 12% this month',
          'On track to meet savings goal',
          'Food expenses trending upward'
        ],
        categories: [
          { name: 'Food', percentage: 35 },
          { name: 'Transport', percentage: 25 },
          { name: 'Entertainment', percentage: 20 },
          { name: 'Other', percentage: 20 }
        ]
      }
    },
    {
      id: 4,
      icon: Users,
      title: 'Collaborate or Go Solo',
      description: 'Whether solo or with friends, settle expenses, share summaries, or export reports effortlessly.',
      detailedDescription: 'Seamlessly switch between personal finance management and group collaboration as your needs change.',
      features: [
        'Smart expense settlement',
        'Automated report generation',
        'Multiple export formats',
        'Social sharing capabilities'
      ],
      mockUI: {
        pendingSettlements: [
          { person: 'Alex', amount: 24.50 },
          { person: 'Sarah', amount: 15.75 }
        ],
        reportTypes: ['Monthly Summary', 'Tax Report', 'Group Expenses'],
        shareOptions: ['Email', 'WhatsApp', 'PDF Export']
      }
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-gradient-to-br from-background via-accent/20 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-success text-white">
            How It Works
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Get Started in 4 Simple Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From signup to mastering your finances, CostEclipse makes every step intuitive and rewarding. 
            Join thousands who've transformed their financial lives in minutes, not months.
          </p>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 via-success/50 to-primary/30 -translate-y-1/2"></div>
            
            {/* Progress Indicator */}
            <div className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-primary to-success -translate-y-1/2 w-full animate-pulse"></div>

            <div className="grid grid-cols-4 gap-8 relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                
                return (
                  <div key={step.id} className="relative group">
                    {/* Curved Arrow Connector */}
                    {!isLast && (
                      <div className="absolute -right-7 top-73 z-10">
                        <ChevronRight className="h-6 w-6 text-primary/60 group-hover:text-primary transition-colors duration-300" />
                      </div>
                    )}

                    {/* Step Card */}
                    <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                      {/* Step Number Badge */}
                      <div className="absolute left-1/2 transform -translate-x-1/2">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-success rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {step.id}
                        </div>
                      </div>

                      <div className="space-y-6 pt-4">
                        {/* Icon */}
                        <div className="flex justify-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-success/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="text-center space-y-4">
                          <h3 className="text-xl font-bold">{step.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-2">
                          {step.features.slice(0, 3).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start gap-2 text-xs">
                              <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Mock UI Preview */}
                        <div className="bg-accent/30 p-4 rounded-lg">
                          <div className="text-xs text-muted-foreground mb-2 font-medium">Preview</div>
                          
                          {step.id === 1 && (
                            <div className="space-y-2">
                              <div className="text-xs">Choose your profile:</div>
                              <div className="grid grid-cols-2 gap-1">
                                {step.mockUI.userTypes?.slice(0, 2).map((type, i) => (
                                  <div key={i} className="text-xs bg-background/60 p-2 rounded text-center">
                                    {type}
                                  </div>
                                ))}
                              </div>
                              <div className="text-xs">Setup Progress: {step.mockUI.setupProgress}%</div>
                              <Progress value={step.mockUI.setupProgress} className="h-1" />
                            </div>
                          )}

                          {step.id === 2 && (
                            <div className="space-y-2">
                              <div className="text-xs">Recent Transactions:</div>
                              {step.mockUI.recentTransactions?.slice(0, 2).map((transaction, i) => (
                                <div key={i} className="flex justify-between text-xs bg-background/60 p-2 rounded">
                                  <span>{transaction.name}</span>
                                  <span className="font-medium">${transaction.amount}</span>
                                </div>
                              ))}
                              <div className="text-xs pt-1">
                                Group Event: {step.mockUI.groupEvent?.name} ({step.mockUI.groupEvent?.participants} people)
                              </div>
                            </div>
                          )}

                          {step.id === 3 && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>Monthly Spending:</span>
                                <span className="font-medium">${step.mockUI.monthlySpending}</span>
                              </div>
                              <div className="text-xs">Savings Goal Progress:</div>
                              <Progress 
                                value={step.mockUI.savingsGoal ? (step.mockUI.savingsGoal.current / step.mockUI.savingsGoal.target) * 100 : 0} 
                                className="h-2" 
                              />
                              <div className="text-xs text-center">
                                ${step.mockUI.savingsGoal?.current} / ${step.mockUI.savingsGoal?.target}
                              </div>
                            </div>
                          )}

                          {step.id === 4 && (
                            <div className="space-y-2">
                              <div className="text-xs">Pending Settlements:</div>
                              {step.mockUI.pendingSettlements?.map((settlement, i) => (
                                <div key={i} className="flex justify-between text-xs bg-background/60 p-2 rounded">
                                  <span>{settlement.person}</span>
                                  <span className="font-medium">${settlement.amount}</span>
                                </div>
                              ))}
                              <div className="text-xs pt-1">
                                Export: {step.mockUI.reportTypes?.slice(0, 2).join(', ')}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Stack */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={step.id} className="relative">
                {/* Connecting Line */}
                {!isLast && (
                  <div className="absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-primary to-success/50 z-0"></div>
                )}

                <Card className="p-6 relative">
                  <div className="flex gap-4">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0 space-y-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-success rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {step.id}
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-success/10 rounded-2xl flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                          {step.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {step.detailedDescription}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        {step.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Mobile Mock UI */}
                      <div className="bg-accent/30 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-3 font-medium">Live Preview</div>
                        
                        {step.id === 1 && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                              {step.mockUI.userTypes?.map((type, i) => (
                                <div key={i} className="text-sm bg-background/60 p-3 rounded text-center">
                                  {type}
                                </div>
                              ))}
                            </div>
                            <div className="text-sm">Setup Progress: {step.mockUI.setupProgress}%</div>
                            <Progress value={step.mockUI.setupProgress} className="h-2" />
                          </div>
                        )}

                        {step.id === 2 && (
                          <div className="space-y-3">
                            <div className="text-sm font-medium">Recent Activity</div>
                            {step.mockUI.recentTransactions?.map((transaction, i) => (
                              <div key={i} className="flex justify-between text-sm bg-background/60 p-3 rounded">
                                <span>{transaction.name}</span>
                                <span className="font-medium">${transaction.amount}</span>
                              </div>
                            ))}
                            <div className="bg-primary/10 p-3 rounded">
                              <div className="text-sm font-medium">{step.mockUI.groupEvent?.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {step.mockUI.groupEvent?.participants} participants • ${step.mockUI.groupEvent?.totalAmount}
                              </div>
                            </div>
                          </div>
                        )}

                        {step.id === 3 && (
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span>Monthly Spending:</span>
                              <span className="font-bold">${step.mockUI.monthlySpending}</span>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm">Savings Goal Progress</div>
                              <Progress 
                                value={step.mockUI.savingsGoal ? (step.mockUI.savingsGoal.current / step.mockUI.savingsGoal.target) * 100 : 0} 
                                className="h-2" 
                              />
                              <div className="text-xs text-center">
                                ${step.mockUI.savingsGoal?.current ?? 0} / ${step.mockUI.savingsGoal?.target ?? 0}
                              </div>
                            </div>
                            <div className="bg-success/10 p-3 rounded">
                              <div className="text-xs font-medium text-success">💡 AI Insights</div>
                              <div className="text-xs text-muted-foreground">
                                {step.mockUI.insights?.[0]}
                              </div>
                            </div>
                          </div>
                        )}

                        {step.id === 4 && (
                          <div className="space-y-3">
                            <div className="text-sm font-medium">Pending Settlements</div>
                            {step.mockUI.pendingSettlements?.map((settlement, i) => (
                              <div key={i} className="flex justify-between text-sm bg-background/60 p-3 rounded">
                                <span>{settlement.person}</span>
                                <span className="font-medium">${settlement.amount}</span>
                              </div>
                            ))}
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1 text-xs">
                                Export PDF
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 text-xs">
                                Share Report
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-success/5 border-primary/20">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Ready to Transform Your Financial Life?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join thousands who've already taken control of their finances. 
                  Start your journey today with our simple 4-step process.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 group">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                {/* <Button size="lg" variant="outline">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Demo
                </Button> */}
              </div>

              <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>2-minute setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Free forever plan</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}