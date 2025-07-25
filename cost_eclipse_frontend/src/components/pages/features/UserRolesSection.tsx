import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  User, 
  Building, 
  Laptop,
  DollarSign,
  TrendingUp,
  Target,
  Users,
  Calendar,
  Receipt,
  PieChart,
  Calculator
} from 'lucide-react';

export function UserRolesSection() {
  const userTypes = [
    {
      id: 'salary-person',
      title: 'Salary Employee',
      subtitle: 'Steady Income Management',
      description: 'Perfect for 9-to-5 professionals with regular salaries who want to optimize their monthly budgets and build long-term wealth.',
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      badge: 'Most Popular',
      badgeColor: 'bg-blue-500',
      benefits: [
        'Monthly budget templates optimized for salary cycles',
        'Automatic recurring expense tracking',
        'Retirement and emergency fund goal templates',
        'Tax-optimized savings recommendations',
        'Paycheck-to-paycheck analysis and optimization'
      ],
      features: [
        { icon: Calendar, label: 'Salary Schedule Sync', description: 'Align budgets with pay periods' },
        { icon: Target, label: 'Long-term Goals', description: 'Retirement and wealth building' },
        { icon: TrendingUp, label: 'Investment Tracking', description: '401k and portfolio monitoring' }
      ],
      stats: {
        users: '45k+',
        avg_savings: '$847/month',
        goal_achievement: '89%'
      },
      mockData: {
        monthlySalary: 5200,
        expenses: 3400,
        savings: 1800,
        emergencyFund: { current: 15600, target: 20000 },
        categories: ['Housing: $1,400', 'Food: $650', 'Transport: $450', 'Savings: $1,800']
      }
    },
    {
      id: 'business-owner',
      title: 'Business Owner',
      subtitle: 'Entrepreneurial Finance Control',
      description: 'Designed for entrepreneurs and business owners who need to manage both personal and business expenses with advanced cash flow tracking.',
      icon: Building,
      color: 'from-green-500 to-green-600',
      badge: 'Pro Features',
      badgeColor: 'bg-green-500',
      benefits: [
        'Separate business and personal expense tracking',
        'Cash flow forecasting and trend analysis',
        'Tax deduction identification and categorization',
        'Quarterly and annual business reporting',
        'Multi-entity financial management'
      ],
      features: [
        { icon: PieChart, label: 'P&L Tracking', description: 'Business profit & loss monitoring' },
        { icon: Receipt, label: 'Tax Prep', description: 'Automated expense categorization' },
        { icon: Calculator, label: 'Cash Flow', description: 'Predictive financial modeling' }
      ],
      stats: {
        users: '12k+',
        avg_revenue: '$85k/year',
        tax_savings: '22%'
      },
      mockData: {
        monthlyRevenue: 12500,
        businessExpenses: 8200,
        personalExpenses: 2800,
        netProfit: 1500,
        taxDeductions: { identified: 47, amount: 3200 },
        categories: ['Office: $2,400', 'Marketing: $1,800', 'Travel: $1,200', 'Personal: $2,800']
      }
    },
    {
      id: 'freelancer',
      title: 'Freelancer',
      subtitle: 'Flexible Income Optimization',
      description: 'Built for creative professionals and independent contractors with irregular income who need flexible budgeting and project-based expense tracking.',
      icon: Laptop,
      color: 'from-purple-500 to-purple-600',
      badge: 'Creative Pro',
      badgeColor: 'bg-purple-500',
      benefits: [
        'Variable income budgeting with income smoothing',
        'Project-based expense tracking and profitability',
        'Client payment tracking and invoicing reminders',
        'Feast or famine financial planning tools',
        'Gig economy tax optimization features'
      ],
      features: [
        { icon: DollarSign, label: 'Income Smoothing', description: 'Manage irregular payments' },
        { icon: Users, label: 'Client Tracking', description: 'Monitor project profitability' },
        { icon: Target, label: 'Buffer Goals', description: 'Build financial stability' }
      ],
      stats: {
        users: '18k+',
        avg_projects: '8/month',
        income_growth: '34%'
      },
      mockData: {
        monthlyIncome: 6800,
        expenses: 3600,
        activeProjects: 5,
        avgProjectValue: 1360,
        buffer: { current: 8400, target: 12000 },
        categories: ['Equipment: $800', 'Software: $340', 'Marketing: $600', 'Personal: $2,400']
      }
    },
    {
      id: 'personal-user',
      title: 'Personal User',
      subtitle: 'Simple Money Management',
      description: 'Perfect for individuals who want straightforward expense tracking without complex business features - ideal for students, retirees, or casual users.',
      icon: User,
      color: 'from-orange-500 to-orange-600',
      badge: 'Easy Start',
      badgeColor: 'bg-orange-500',
      benefits: [
        'Simplified interface with essential features only',
        'Quick expense entry with smart categorization',
        'Basic budgeting and savings goal tracking',
        'Spending insights and trend visualization',
        'Family sharing for household expense management'
      ],
      features: [
        { icon: Receipt, label: 'Simple Tracking', description: 'Easy expense logging' },
        { icon: TrendingUp, label: 'Spending Insights', description: 'Understand your patterns' },
        { icon: Users, label: 'Family Sharing', description: 'Household budget management' }
      ],
      stats: {
        users: '32k+',
        time_saved: '15 min/day',
        satisfaction: '95%'
      },
      mockData: {
        monthlyBudget: 2800,
        expenses: 2340,
        remaining: 460,
        topCategories: ['Groceries: $680', 'Entertainment: $420', 'Gas: $280', 'Dining: $360'],
        savingsGoal: { current: 2400, target: 5000 },
        categories: ['Food: $1,060', 'Transport: $480', 'Fun: $420', 'Other: $380']
      }
    }
  ];

  return (
    <section id="user-roles" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary text-white">
            Personalized Experience
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Tailored for Every Financial Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you're a salary employee, business owner, freelancer, or personal user, 
            CostEclipse adapts to your unique financial needs with personalized features and workflows.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {userTypes.map((userType, index) => {
            const Icon = userType.icon;
            return (
              <Card key={userType.id} className="p-6 lg:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${userType.color} opacity-5`}></div>
                
                {/* Badge */}
                <div className="absolute  right-4">
                  <Badge className={`${userType.badgeColor} text-white font-medium`}>
                    {userType.badge}
                  </Badge>
                </div>

                <div className="relative space-y-6">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${userType.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{userType.title}</h3>
                      <p className="text-lg font-medium text-primary mb-2">{userType.subtitle}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {userType.description}
                      </p>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Specialized Features:</h4>
                    <div className="grid gap-3">
                      {userType.features.map((feature, featureIndex) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <div key={featureIndex} className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
                            <FeatureIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-sm">{feature.label}</div>
                              <div className="text-xs text-muted-foreground">{feature.description}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-sm">Key Benefits:</h5>
                    <div className="space-y-2">
                      {userType.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-t">
                    {Object.entries(userType.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-bold text-primary text-sm">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key.replace(/_/g, ' ')}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mock Data Preview */}
                  <div className="bg-accent/20 p-4 rounded-lg border">
                    <h6 className="font-medium text-sm mb-3">Sample Dashboard View</h6>
                    <div className="space-y-2 text-xs">
                      {userType.id === 'salary-person' && (
                        <>
                          <div className="flex justify-between">
                            <span>Monthly Salary:</span>
                            <span className="font-medium">${userType?.mockData?.monthlySalary?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Emergency Fund:</span>
                            <span className="font-medium">
                              ${userType.mockData.emergencyFund?.current?.toLocaleString()} / 
                              ${userType.mockData.emergencyFund?.target?.toLocaleString()}
                            </span>
                          </div>
                        </>
                      )}
                      {userType.id === 'business-owner' && (
                        <>
                          <div className="flex justify-between">
                            <span>Monthly Revenue:</span>
                            <span className="font-medium">${userType.mockData.monthlyRevenue?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax Deductions:</span>
                            <span className="font-medium">${userType.mockData.taxDeductions?.amount?.toLocaleString()}</span>
                          </div>
                        </>
                      )}
                      {userType.id === 'freelancer' && (
                        <>
                          <div className="flex justify-between">
                            <span>Active Projects:</span>
                            <span className="font-medium">{userType.mockData.activeProjects}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Financial Buffer:</span>
                            <span className="font-medium">
                              ${userType.mockData.buffer?.current?.toLocaleString()} / 
                              ${userType.mockData.buffer?.target?.toLocaleString()}
                            </span>
                          </div>
                        </>
                      )}
                      {userType.id === 'personal-user' && (
                        <>
                          <div className="flex justify-between">
                            <span>Budget Remaining:</span>
                            <span className="font-medium">${userType.mockData.remaining}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Savings Goal:</span>
                            <span className="font-medium">
                              ${userType.mockData.savingsGoal?.current?.toLocaleString()} / 
                              ${userType.mockData.savingsGoal?.target?.toLocaleString()}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button className={`w-full bg-gradient-to-r ${userType.color} hover:opacity-90 text-white`}>
                    Explore {userType.title} Features
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Customization Info */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Smart Personalization</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              CostEclipse automatically adapts its interface and features based on your usage patterns, 
              income type, and financial goals. Switch between user modes anytime as your needs evolve.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="gap-2">
                <User className="h-3 w-3" />
                Adaptive UI
              </Badge>
              <Badge variant="outline" className="gap-2">
                <Target className="h-3 w-3" />
                Smart Recommendations
              </Badge>
              <Badge variant="outline" className="gap-2">
                <TrendingUp className="h-3 w-3" />
                Learning Algorithms
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}