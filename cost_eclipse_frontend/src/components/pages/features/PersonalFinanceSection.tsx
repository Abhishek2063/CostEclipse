import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  PieChart, 
  Target, 
  TrendingUp,
  Plus,
  ArrowRight,
  Check,
} from 'lucide-react';

export function PersonalFinanceSection() {
  const features = [
    {
      id: 'income-expense',
      title: 'Smart Income & Expense Tracking',
      subtitle: 'Automated Financial Recording',
      description: 'Effortlessly track every dollar with intelligent categorization, receipt scanning, and automatic bank integration. Never miss a transaction again.',
      icon: DollarSign,
      badge: 'Most Popular',
      benefits: [
        'Instant receipt scanning with 95% accuracy',
        'Automatic transaction categorization',
        'Multi-account bank integration',
        'Recurring transaction detection',
        'Real-time balance tracking'
      ],
      stats: {
        accuracy: '95%',
        time_saved: '10 hrs/month',
        transactions: '50k+ tracked'
      },
      mockData: {
        income: 5240,
        expenses: 3180,
        categories: [
          { name: 'Food & Dining', amount: 847, color: 'bg-blue-500' },
          { name: 'Transportation', amount: 456, color: 'bg-green-500' },
          { name: 'Shopping', amount: 623, color: 'bg-purple-500' },
          { name: 'Bills & Utilities', name_short: 'Bills', amount: 489, color: 'bg-orange-500' },
          { name: 'Entertainment', amount: 234, color: 'bg-pink-500' }
        ]
      }
    },
    {
      id: 'categorization',
      title: 'Intelligent Transaction Categorization',
      subtitle: 'AI-Powered Organization',
      description: 'Let AI automatically categorize your transactions with machine learning that gets smarter over time. Create custom categories for perfect organization.',
      icon: PieChart,
      badge: 'AI-Powered',
      benefits: [
        'Machine learning categorization',
        'Custom category creation',
        'Merchant recognition database',
        'Manual override options',
        'Category-based budgeting'
      ],
      stats: {
        accuracy: '92%',
        categories: '15 default',
        learning: 'Improves daily'
      },
      mockData: {
        totalExpenses: 3180,
        categories: [
          { name: 'Food & Dining', percentage: 35, amount: 1113, trend: '+12%' },
          { name: 'Transportation', percentage: 20, amount: 636, trend: '-5%' },
          { name: 'Shopping', percentage: 18, amount: 572, trend: '+8%' },
          { name: 'Bills & Utilities', percentage: 15, amount: 477, trend: '-2%' },
          { name: 'Entertainment', percentage: 12, amount: 382, trend: '+15%' }
        ]
      }
    },
    {
      id: 'savings-goals',
      title: 'Motivational Savings Goals',
      subtitle: 'Achieve Your Financial Dreams',
      description: 'Set meaningful goals with visual progress tracking, milestone celebrations, and automatic savings recommendations that keep you motivated.',
      icon: Target,
      badge: 'Goal Tracking',
      benefits: [
        'Visual progress dashboards',
        'Milestone celebrations',
        'Automatic savings suggestions',
        'Goal templates & categories',
        'Social sharing for accountability'
      ],
      stats: {
        completion_rate: '78%',
        avg_goal: '$8,500',
        users_with_goals: '68%'
      },
      mockData: {
        goals: [
          { name: 'Emergency Fund', target: 10000, current: 8400, percentage: 84, color: 'bg-green-500' },
          { name: 'Vacation to Japan', target: 5000, current: 3200, percentage: 64, color: 'bg-blue-500' },
          { name: 'New Laptop', target: 2500, current: 1890, percentage: 76, color: 'bg-purple-500' },
          { name: 'Car Down Payment', target: 15000, current: 6750, percentage: 45, color: 'bg-orange-500' }
        ]
      }
    },
    {
      id: 'analytics-charts',
      title: 'Rich Financial Analytics',
      subtitle: 'Data-Driven Insights',
      description: 'Visualize your financial patterns with interactive charts, trend analysis, and predictive insights that help you make informed decisions.',
      icon: TrendingUp,
      badge: 'Advanced Analytics',
      benefits: [
        'Interactive spending charts',
        'Monthly & yearly trend analysis',
        'Budget vs actual comparisons',
        'Predictive spending alerts',
        'Export capabilities for tax prep'
      ],
      stats: {
        chart_types: '12+',
        insights: '50+ metrics',
        export_formats: '3 formats'
      },
      mockData: {
        monthlyTrend: [
          { month: 'Jan', income: 4800, expenses: 3200 },
          { month: 'Feb', income: 4900, expenses: 3100 },
          { month: 'Mar', income: 5100, expenses: 3400 },
          { month: 'Apr', income: 4950, expenses: 3050 },
          { month: 'May', income: 5240, expenses: 3180 },
          { month: 'Jun', income: 5300, expenses: 3250 }
        ]
      }
    }
  ];

  return (
    <section id="personal" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-success text-white">
            Personal Finance Tools
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Master Your Personal Finances
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Powerful tools designed to give you complete control over your personal financial journey, 
            from daily expense tracking to long-term goal achievement.
          </p>
        </div>

        <div className="space-y-24">
          {features && features.length > 0 && features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={feature.id} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content Side */}
                <div className={`space-y-8 ${!isEven ? 'lg:col-start-2' : ''}`}>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-success/10 rounded-xl flex items-center justify-center">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <Badge variant="outline" className="font-medium">
                        {feature.badge}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-lg text-primary font-medium mb-4">{feature.subtitle}</p>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Key Capabilities:</h4>
                    <div className="space-y-3">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-success" />
                          </div>
                          <span className="text-sm leading-relaxed">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-6 border-t">
                    {Object.entries(feature.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key.replace(/_/g, ' ')}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 group">
                    Explore This Feature
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Mock UI Side */}
                <div className={`${!isEven ? 'lg:col-start-1' : ''}`}>
                  <Card className="p-6 lg:p-8 bg-gradient-to-br from-accent/50 to-primary/5 border-2 border-primary/10 hover:shadow-xl transition-all duration-300">
                    {/* Feature-specific UI Mock */}
                    {feature.id === 'income-expense' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-lg">Financial Overview</h4>
                          <Badge variant="outline">This Month</Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-success/10 p-4 rounded-lg border border-success/20">
                            <div className="flex items-center gap-2 text-success mb-2">
                              <TrendingUp className="h-4 w-4" />
                              <span className="text-sm font-medium">Income</span>
                            </div>
                            <div className="text-2xl font-bold">${feature.mockData.income && feature.mockData.income.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">+12% vs last month</div>
                          </div>

                          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                            <div className="flex items-center gap-2 text-primary mb-2">
                              <DollarSign className="h-4 w-4" />
                              <span className="text-sm font-medium">Expenses</span>
                            </div>
                            <div className="text-2xl font-bold">${feature.mockData.expenses && feature.mockData.expenses.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">-8% vs last month</div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h5 className="font-medium text-sm">Top Categories</h5>
                          {feature.mockData.categories && feature.mockData.categories.slice(0, 4).map((category: any, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-background/60 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 ${category?.color} rounded-full`}></div>
                                <span className="text-sm font-medium">{category.name_short || category.name}</span>
                              </div>
                              <span className="text-sm font-semibold">${category.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {feature.id === 'categorization' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-lg">Category Breakdown</h4>
                          <Badge variant="outline">${feature.mockData.totalExpenses && feature.mockData.totalExpenses.toLocaleString()}</Badge>
                        </div>

                        <div className="space-y-4">
                          {feature.mockData.categories && feature.mockData.categories.map((category: any, i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{category.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                                  <span className={`text-xs px-2 py-1 rounded ${
                                    category.trend.startsWith('+') ? 'bg-error/10 text-error' : 'bg-success/10 text-success'
                                  }`}>
                                    {category.trend}
                                  </span>
                                </div>
                              </div>
                              <Progress value={category.percentage} className="h-2" />
                              <div className="text-xs text-muted-foreground">${category.amount.toLocaleString()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {feature.id === 'savings-goals' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-lg">Savings Goals</h4>
                          <Button size="sm" variant="outline">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Goal
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {feature.mockData.goals && feature.mockData.goals.slice(0, 3).map((goal, i) => (
                            <div key={i} className="p-4 bg-background/60 rounded-lg border">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-sm">{goal.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                                </span>
                              </div>
                              <Progress value={goal.percentage} className="h-2 mb-2" />
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-success font-medium">{goal.percentage}% complete</span>
                                <span className="text-xs text-muted-foreground">
                                  ${(goal.target - goal.current).toLocaleString()} to go
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {feature.id === 'analytics-charts' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-lg">Financial Trends</h4>
                          <Badge variant="outline">6 Months</Badge>
                        </div>

                        <div className="space-y-4">
                          <div className="h-32 bg-background/60 rounded-lg p-4 flex items-end justify-around">
                            {feature.mockData.monthlyTrend && feature.mockData.monthlyTrend.map((month, i) => (
                              <div key={i} className="flex flex-col items-center gap-1">
                                <div className="flex flex-col items-center gap-1">
                                  <div 
                                    className="bg-success w-2 rounded-t"
                                    style={{ height: `${(month.income / 6000) * 60}px` }}
                                  ></div>
                                  <div 
                                    className="bg-primary w-2 rounded-t"
                                    style={{ height: `${(month.expenses / 6000) * 60}px` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-muted-foreground">{month.month}</span>
                              </div>
                            ))}
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-success rounded"></div>
                              <span className="text-xs">Income</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-primary rounded"></div>
                              <span className="text-xs">Expenses</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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