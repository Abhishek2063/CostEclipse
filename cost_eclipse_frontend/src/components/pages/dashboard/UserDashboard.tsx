import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { 
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Target,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Lightbulb,
  Eye,
  MoreHorizontal,
  Plus,
  Bell,
  Filter
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

export function UserDashboard() {
  // Mock data for charts
  const incomeExpenseData = [
    { month: 'Jan', income: 45000, expenses: 32000 },
    { month: 'Feb', income: 47000, expenses: 35000 },
    { month: 'Mar', income: 45000, expenses: 28000 },
    { month: 'Apr', income: 52000, expenses: 38000 },
    { month: 'May', income: 48000, expenses: 42000 },
    { month: 'Jun', income: 50000, expenses: 36000 },
  ];

  const expenseCategoryData = [
    { name: 'Food & Dining', value: 12000, color: '#4f46e5' },
    { name: 'Transportation', value: 8000, color: '#7c3aed' },
    { name: 'Entertainment', value: 6000, color: '#10b981' },
    { name: 'Shopping', value: 4500, color: '#f59e0b' },
    { name: 'Bills & Utilities', value: 3500, color: '#ef4444' },
    { name: 'Others', value: 2000, color: '#6b7280' },
  ];

  const recentTransactions = [
    { id: 1, type: 'expense', category: 'Food', description: 'Lunch at Cafe Coffee Day', amount: 450, date: '2 hours ago', icon: '🍽️' },
    { id: 2, type: 'income', category: 'Salary', description: 'Monthly Salary Credit', amount: 45000, date: '1 day ago', icon: '💰' },
    { id: 3, type: 'expense', category: 'Transport', description: 'Uber Ride', amount: 280, date: '2 days ago', icon: '🚗' },
    { id: 4, type: 'expense', category: 'Shopping', description: 'Amazon Purchase', amount: 1200, date: '3 days ago', icon: '🛒' },
    { id: 5, type: 'income', category: 'Freelance', description: 'Web Design Project', amount: 8000, date: '4 days ago', icon: '💻' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Goa Trip', date: 'Dec 15-20', budget: 15000, spent: 8500, participants: 4 },
    { id: 2, title: 'Birthday Party', date: 'Dec 28', budget: 5000, spent: 2000, participants: 8 },
  ];

  const insights = [
    {
      type: 'tip',
      title: 'Saving Opportunity',
      message: 'You can save ₹2,400 monthly by reducing dining out expenses by 20%.',
      action: 'Set Budget Alert',
      icon: Lightbulb,
      color: 'text-success'
    },
    {
      type: 'warning',
      title: 'Budget Alert',
      message: 'Entertainment spending is 30% higher than usual this month.',
      action: 'Review Expenses',
      icon: AlertTriangle,
      color: 'text-warning'
    },
    {
      type: 'info',
      title: 'Investment Suggestion',
      message: 'You have ₹12,000 idle cash. Consider investing in SIP.',
      action: 'Explore Options',
      icon: TrendingUp,
      color: 'text-primary'
    }
  ];

  // Calculate current month totals
  const currentMonthIncome = 50000;
  const currentMonthExpenses = 36000;
  const netSavings = currentMonthIncome - currentMonthExpenses;
  const budgetUsed = 72; // percentage

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground mt-1">
            Here's your financial overview for December 2024
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Filter className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 flex-1 sm:flex-none">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Add Transaction</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Current Month Income */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">Current Month Income</p>
              <p className="text-xl sm:text-2xl font-bold text-success tabular-nums">₹{currentMonthIncome.toLocaleString()}</p>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-success mr-1 flex-shrink-0" />
                <span className="text-success">+8.5%</span>
                <span className="text-muted-foreground ml-1 hidden sm:inline">vs last month</span>
              </div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
            </div>
          </div>
        </Card>

        {/* Current Month Expenses */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">Current Month Expenses</p>
              <p className="text-xl sm:text-2xl font-bold text-destructive tabular-nums">₹{currentMonthExpenses.toLocaleString()}</p>
              <div className="flex items-center mt-2 text-sm">
                <ArrowDownRight className="h-4 w-4 text-success mr-1 flex-shrink-0" />
                <span className="text-success">-3.2%</span>
                <span className="text-muted-foreground ml-1 hidden sm:inline">vs last month</span>
              </div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
            </div>
          </div>
        </Card>

        {/* Net Savings */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">Net Savings</p>
              <p className="text-xl sm:text-2xl font-bold text-primary tabular-nums">₹{netSavings.toLocaleString()}</p>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-success mr-1 flex-shrink-0" />
                <span className="text-success">+15.8%</span>
                <span className="text-muted-foreground ml-1 hidden sm:inline">vs last month</span>
              </div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <PiggyBank className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
          </div>
        </Card>

        {/* Budget Used */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">Budget Used</p>
              <p className="text-xl sm:text-2xl font-bold">{budgetUsed}%</p>
              <div className="mt-3">
                <Progress value={budgetUsed} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1 tabular-nums">₹26,000 of ₹36,000</p>
              </div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Income vs Expense Trend */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-lg font-semibold">Income vs Expense Trend</h3>
              <p className="text-sm text-muted-foreground hidden sm:block">Monthly comparison for 2024</p>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={incomeExpenseData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="month" 
                  className="text-xs" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-xs" 
                  tick={{ fontSize: 12 }}
                  width={50}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 3 }}
                  name="Income"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 3 }}
                  name="Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Expense Category Breakdown */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-lg font-semibold">Expense Categories</h3>
              <p className="text-sm text-muted-foreground hidden sm:block">December 2024 breakdown</p>
            </div>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            <div className="h-48 w-48 sm:h-64 sm:w-64 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {expenseCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2 sm:space-y-3 w-full lg:w-auto">
              {expenseCategoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm font-medium truncate">{category.name}</span>
                  </div>
                  <span className="text-sm font-semibold tabular-nums flex-shrink-0">₹{category.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Transactions */}
        <Card className="xl:col-span-2 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <p className="text-sm text-muted-foreground hidden sm:block">Latest financial activities</p>
            </div>
            <Button variant="outline" size="sm">
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">All</span>
            </Button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="text-xl sm:text-2xl flex-shrink-0">{transaction.icon}</div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base truncate">{transaction.description}</p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <span className="truncate">{transaction.category}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline truncate">{transaction.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`font-semibold text-sm sm:text-base tabular-nums ${
                    transaction.type === 'income' ? 'text-success' : 'text-destructive'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Events & Insights */}
        <div className="space-y-4 sm:space-y-6">
          {/* Upcoming Events */}
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <Badge variant="secondary">{upcomingEvents.length}</Badge>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 bg-accent/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm sm:text-base truncate">{event.title}</h4>
                    <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Budget Progress</span>
                      <span className="tabular-nums">₹{event.spent.toLocaleString()} / ₹{event.budget.toLocaleString()}</span>
                    </div>
                    <Progress value={(event.spent / event.budget) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">{event.participants} participants</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Insights */}
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Smart Insights</h3>
            <div className="space-y-3 sm:space-y-4">
              {insights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div key={index} className="p-3 bg-accent/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${insight.color}`} />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{insight.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{insight.message}</p>
                        <Button variant="link" size="sm" className="h-auto p-0 mt-2 text-xs">
                          {insight.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}