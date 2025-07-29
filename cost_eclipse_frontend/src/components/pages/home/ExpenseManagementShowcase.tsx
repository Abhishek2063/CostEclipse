import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  CreditCard, 
  Smartphone, 
  TrendingUp, 
  TrendingDown,
  MapPin,
  Clock,
  Receipt,
  Zap,
  ShoppingCart,
  Car,
  Home,
  Coffee,
  Plane
} from 'lucide-react';

export function ExpenseManagementShowcase() {
  const expenseCategories = [
    { name: 'Food & Dining', amount: 1247.50, budget: 1500, icon: Coffee, color: 'bg-blue-500', trend: '+12%' },
    { name: 'Transportation', amount: 456.30, budget: 600, icon: Car, color: 'bg-green-500', trend: '-8%' },
    { name: 'Shopping', amount: 892.75, budget: 800, icon: ShoppingCart, color: 'bg-purple-500', trend: '+15%' },
    { name: 'Bills & Utilities', amount: 234.80, budget: 350, icon: Home, color: 'bg-orange-500', trend: '-2%' },
    { name: 'Entertainment', amount: 189.40, budget: 300, icon: Plane, color: 'bg-pink-500', trend: '+5%' }
  ];

  const recentExpenses = [
    {
      id: 1,
      merchant: 'Starbucks Coffee',
      amount: 12.45,
      category: 'Food & Dining',
      date: '2 hours ago',
      location: 'Downtown',
      method: 'Credit Card',
      receipt: true,
      icon: Coffee,
      verified: true
    },
    {
      id: 2,
      merchant: 'Uber Ride',
      amount: 18.30,
      category: 'Transportation',
      date: '5 hours ago',
      location: 'Airport',
      method: 'Mobile Pay',
      receipt: false,
      icon: Car,
      verified: true
    },
    {
      id: 3,
      merchant: 'Amazon Purchase',
      amount: 67.89,
      category: 'Shopping',
      date: '1 day ago',
      location: 'Online',
      method: 'Credit Card',
      receipt: true,
      icon: ShoppingCart,
      verified: true
    },
    {
      id: 4,
      merchant: 'Pacific Gas & Electric',
      amount: 89.56,
      category: 'Bills & Utilities',
      date: '2 days ago',
      location: 'Auto Pay',
      method: 'Bank Transfer',
      receipt: true,
      icon: Zap,
      verified: true
    }
  ];

  const monthlyInsights = {
    totalExpenses: 3420.75,
    budgetUsed: 68.4,
    topCategory: 'Food & Dining',
    avgDaily: 113.69,
    receiptsScanned: 47,
    autoTracked: 156
  };

  const trackingMethods = [
    {
      icon: Camera,
      title: 'Receipt Scanning',
      description: 'Snap photos to instantly log expenses',
      stats: '95% accuracy',
      color: 'text-blue-500'
    },
    {
      icon: CreditCard,
      title: 'Bank Integration',
      description: 'Automatic transaction import',
      stats: '2.3k transactions',
      color: 'text-green-500'
    },
    {
      icon: Smartphone,
      title: 'Manual Entry',
      description: 'Quick add with smart suggestions',
      stats: '<30 seconds',
      color: 'text-purple-500'
    },
    {
      icon: Zap,
      title: 'Smart Categorization',
      description: 'AI-powered expense classification',
      stats: '99.2% accuracy',
      color: 'text-orange-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-accent/30 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Advanced Expense Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform how you track, categorize, and analyze your expenses with intelligent automation and detailed insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Expense Categories Overview */}
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Category Breakdown</h3>
              <Badge variant="outline" className="tabular-nums">
                This Month: ${monthlyInsights.totalExpenses.toLocaleString()}
              </Badge>
            </div>

            <div className="space-y-4">
              {expenseCategories.map((category, index) => {
                const Icon = category.icon;
                const percentage = (category.amount / category.budget) * 100;
                const isOverBudget = percentage > 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Budget: ${category.budget.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold tabular-nums ${isOverBudget ? 'text-error' : 'text-foreground'}`}>
                          ${category.amount.toLocaleString()}
                        </div>
                        <div className={`text-sm flex items-center gap-1 ${
                          category.trend.startsWith('+') ? 'text-error' : 'text-success'
                        }`}>
                          {category.trend.startsWith('+') ? 
                            <TrendingUp className="h-3 w-3" /> : 
                            <TrendingDown className="h-3 w-3" />
                          }
                          {category.trend}
                        </div>
                      </div>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className={`h-2 ${isOverBudget ? '[&>div]:bg-error' : '[&>div]:bg-success'}`}
                    />
                    {isOverBudget && (
                      <p className="text-xs text-error">Over budget by ${(category.amount - category.budget).toFixed(2)}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Monthly Insights */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Monthly Insights</h3>
            <div className="space-y-6">
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                <div className="text-2xl font-bold tabular-nums">${monthlyInsights.totalExpenses.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Expenses</div>
                <div className="text-xs text-success mt-1">12% below last month</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold tabular-nums">{monthlyInsights.budgetUsed}%</div>
                  <div className="text-xs text-muted-foreground">Budget Used</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold tabular-nums">${monthlyInsights.avgDaily}</div>
                  <div className="text-xs text-muted-foreground">Avg Daily</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Top Category</span>
                  <span className="text-sm font-medium">{monthlyInsights.topCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Receipts Scanned</span>
                  <span className="text-sm font-medium tabular-nums">{monthlyInsights.receiptsScanned}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Auto Tracked</span>
                  <span className="text-sm font-medium tabular-nums">{monthlyInsights.autoTracked}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Expenses */}
        <Card className="p-6 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Expenses</h3>
            <Button variant="outline" size="sm">
              <Receipt className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentExpenses.map((expense) => {
              const Icon = expense.icon;
              return (
                <div key={expense.id} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{expense.merchant}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {expense.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {expense.location}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {expense.method}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold tabular-nums">${expense.amount}</div>
                    <div className="text-sm text-muted-foreground">{expense.category}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Expense Tracking Methods */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Multiple Ways to Track</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the method that works best for each situation - from instant receipt scanning to automatic bank integration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trackingMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`w-16 h-16 bg-gradient-to-br from-accent to-accent/50 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`h-8 w-8 ${method.color}`} />
                </div>
                <h4 className="font-semibold mb-2">{method.title}</h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {method.description}
                </p>
                <Badge variant="outline" className="tabular-nums">
                  {method.stats}
                </Badge>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}