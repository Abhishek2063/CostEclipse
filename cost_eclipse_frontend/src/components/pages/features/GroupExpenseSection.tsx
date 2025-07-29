import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Calendar, 
  Calculator,
  Share2,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  Plus
} from 'lucide-react';

export function GroupExpenseSection() {
  const groupFeatures = [
    {
      id: 'event-management',
      title: 'Smart Event & Trip Management',
      subtitle: 'Organize Groups Effortlessly',
      description: 'Create and manage group events, trips, and shared activities with ease. Add participants, set budgets, and track expenses in real-time with automatic expense distribution.',
      icon: Calendar,
      highlights: [
        'Create events in seconds with templates',
        'Add participants with email invites',
        'Set group budgets and spending limits',
        'Real-time expense tracking and notifications',
        'Automatic expense splitting calculations',
        'Event timeline and activity feed'
      ],
      stats: {
        events_created: '25k+',
        avg_participants: '6.3',
        success_rate: '94%'
      },
      mockData: {
        event: {
          name: 'Bali Adventure 2024',
          participants: [
            { name: 'Alex Chen', avatar: 'AC', status: 'active', paid: 1240, owes: 0 },
            { name: 'Sarah Kim', avatar: 'SK', status: 'active', paid: 980, owes: 260 },
            { name: 'Mike Johnson', avatar: 'MJ', status: 'pending', paid: 750, owes: 490 },
            { name: 'Emma Davis', avatar: 'ED', status: 'active', paid: 1100, owes: 140 },
            { name: 'Tom Wilson', avatar: 'TW', status: 'active', paid: 1430, owes: -190 }
          ],
          totalBudget: 6000,
          totalSpent: 5500,
          duration: '7 days',
          location: 'Bali, Indonesia'
        }
      }
    },
    {
      id: 'expense-splitting',
      title: 'Advanced Expense Splitting & Settlement',
      subtitle: 'Fair Splits, Zero Conflicts',
      description: 'Split expenses fairly with multiple algorithms - equal splits, custom amounts, percentage-based, or item-by-item divisions. Smart settlement suggestions minimize the number of transactions needed.',
      icon: Calculator,
      highlights: [
        'Multiple splitting methods (equal, custom, percentage)',
        'Item-by-item bill splitting with receipt scanning',
        'Smart settlement optimization algorithms',
        'Tax and tip calculations included',
        'Currency conversion for international groups',
        'Payment integration with Venmo, PayPal, Zelle'
      ],
      stats: {
        split_accuracy: '100%',
        conflicts_reduced: '89%',
        settlement_time: '65% faster'
      },
      mockData: {
        recentExpenses: [
          {
            id: 1,
            name: 'Beachfront Villa Rental',
            amount: 1800,
            paidBy: 'Alex Chen',
            splitType: 'Equal',
            participants: 5,
            perPerson: 360,
            date: '2 hours ago',
            category: 'Accommodation'
          },
          {
            id: 2,
            name: 'Traditional Balinese Dinner',
            amount: 285,
            paidBy: 'Sarah Kim',
            splitType: 'Custom',
            participants: 4,
            perPerson: 71.25,
            date: '1 day ago',
            category: 'Food & Dining'
          },
          {
            id: 3,
            name: 'Scuba Diving Adventure',
            amount: 450,
            paidBy: 'Tom Wilson',
            splitType: 'Selected',
            participants: 3,
            perPerson: 150,
            date: '2 days ago',
            category: 'Activities'
          }
        ],
        settlements: [
          { from: 'Mike Johnson', to: 'Tom Wilson', amount: 190 },
          { from: 'Sarah Kim', to: 'Alex Chen', amount: 260 },
          { from: 'Emma Davis', to: 'Alex Chen', amount: 140 }
        ]
      }
    },
    {
      id: 'tracking-analytics',
      title: 'Group Analytics & Contribution Tracking',
      subtitle: 'Insights for Better Group Decisions',
      description: 'Get detailed analytics on group spending patterns, individual contributions, and expense categories. Make informed decisions for future events with comprehensive reports.',
      icon: Users,
      highlights: [
        'Real-time contribution tracking',
        'Spending pattern analysis',
        'Category-wise expense breakdown',
        'Individual vs group averages',
        'Predictive budget recommendations',
        'Exportable reports for record keeping'
      ],
      stats: {
        insights_generated: '15+',
        savings_achieved: '23%',
        user_satisfaction: '96%'
      },
      mockData: {
        categoryBreakdown: [
          { name: 'Accommodation', amount: 1800, percentage: 33, color: 'bg-blue-500' },
          { name: 'Food & Dining', amount: 1650, percentage: 30, color: 'bg-green-500' },
          { name: 'Activities', amount: 1200, percentage: 22, color: 'bg-purple-500' },
          { name: 'Transportation', amount: 600, percentage: 11, color: 'bg-orange-500' },
          { name: 'Miscellaneous', amount: 250, percentage: 4, color: 'bg-pink-500' }
        ],
        insights: [
          'Food spending is 15% above average for similar trips',
          'Tom has contributed 26% more than the group average',
          'Accommodation costs are within budget range'
        ]
      }
    }
  ];

  return (
    <section id="group" className="py-16 lg:py-24 bg-gradient-to-br from-muted/30 to-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-secondary to-primary text-white">
            Group Expense Management
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Simplify Group Finances Forever
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            No more awkward money conversations or complex calculations. 
            Split bills fairly, track contributions transparently, and settle up automatically.
          </p>
        </div>

        <div className="space-y-24">
          {groupFeatures && groupFeatures.length > 0 && groupFeatures.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div key={feature.id} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Content Side */}
                <div className={`lg:col-span-5 space-y-8 ${index === 1 ? 'lg:order-2' : ''}`}>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl flex items-center justify-center">
                        <Icon className="h-7 w-7 text-secondary" />
                      </div>
                      <Badge variant="secondary" className="font-medium">
                        Group Feature
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-lg text-secondary font-medium mb-4">{feature.subtitle}</p>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Key Features:</h4>
                    <div className="grid gap-3">
                      {feature.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-6 border-t">
                    {Object.entries(feature.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-secondary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key.replace(/_/g, ' ')}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button size="lg" className="bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 group">
                    Try Group Features
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Large UI Preview Side */}
                <div className={`lg:col-span-7 ${index === 1 ? 'lg:order-1' : ''}`}>
                  <Card className="p-6 lg:p-8 bg-background border-2 hover:shadow-2xl transition-all duration-300">
                    {feature.id === 'event-management' && (
                      <div className="space-y-6">
                        {/* Event Header */}
                        <div className="flex items-start justify-between pb-4 border-b">
                          <div className="space-y-2">
                            <h4 className="font-bold text-xl">{feature.mockData.event && feature.mockData.event.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {feature.mockData.event && feature.mockData.event.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {feature.mockData.event && feature.mockData.event.duration}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              ${feature.mockData.event && feature.mockData.event.totalSpent.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              of ${feature.mockData.event && feature.mockData.event.totalBudget.toLocaleString()} budget
                            </div>
                            <Progress 
                              value={feature.mockData.event &&  (feature.mockData.event.totalSpent / feature.mockData.event.totalBudget) * 100} 
                              className="w-24 h-2 mt-2"
                            />
                          </div>
                        </div>

                        {/* Participants */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-semibold">Participants ({feature.mockData.event && feature.mockData.event.participants.length})</h5>
                            <Button size="sm" variant="outline">
                              <Plus className="h-4 w-4 mr-1" />
                              Add Person
                            </Button>
                          </div>
                          <div className="space-y-3">
                            {feature.mockData.event && feature.mockData.event.participants.map((participant, i) => (
                              <div key={i} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarFallback className="text-sm font-semibold">
                                      {participant.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-sm">{participant.name}</div>
                                    <div className={`text-xs flex items-center gap-1 ${
                                      participant.status === 'active' ? 'text-success' : 
                                      participant.status === 'pending' ? 'text-warning' : 'text-muted-foreground'
                                    }`}>
                                      {participant.status === 'active' && <CheckCircle className="h-3 w-3" />}
                                      {participant.status === 'pending' && <AlertTriangle className="h-3 w-3" />}
                                      {participant.status}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right text-sm">
                                  <div className="font-semibold">Paid: ${participant.paid}</div>
                                  <div className={`text-xs ${
                                    participant.owes > 0 ? 'text-error' : 
                                    participant.owes < 0 ? 'text-success' : 'text-muted-foreground'
                                  }`}>
                                    {participant.owes > 0 ? `Owes: $${participant.owes}` :
                                     participant.owes < 0 ? `Owed: $${Math.abs(participant.owes)}` :
                                     'Even'}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 gap-3 pt-4">
                          <Button variant="outline" className="gap-2">
                            <Share2 className="h-4 w-4" />
                            Share Event
                          </Button>
                          <Button className="gap-2">
                            <Calculator className="h-4 w-4" />
                            Add Expense
                          </Button>
                        </div>
                      </div>
                    )}

                    {feature.id === 'expense-splitting' && (
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-4 border-b">
                          <h4 className="font-bold text-xl">Recent Expenses</h4>
                          <Badge variant="outline">Auto-Split Enabled</Badge>
                        </div>

                        {/* Expense List */}
                        <div className="space-y-4">
                          {feature.mockData.recentExpenses && feature.mockData.recentExpenses.map((expense) => (
                            <div key={expense.id} className="p-4 bg-accent/30 rounded-lg border">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h6 className="font-semibold">{expense.name}</h6>
                                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                                    <span>Paid by {expense.paidBy}</span>
                                    <span>•</span>
                                    <span>{expense.date}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold">${expense.amount}</div>
                                  <Badge variant="outline" className="text-xs">
                                    {expense.category}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Split: {expense.splitType} • {expense.participants} people
                                </span>
                                <span className="font-medium">
                                  ${expense.perPerson.toFixed(2)} per person
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Settlement Suggestions */}
                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                          <h6 className="font-semibold mb-3 text-primary">Smart Settlement Suggestions</h6>
                          <div className="space-y-2">
                            {feature.mockData.settlements && feature.mockData.settlements.map((settlement, i) => (
                              <div key={i} className="flex items-center justify-between text-sm">
                                <span>{settlement.from} → {settlement.to}</span>
                                <span className="font-medium">${settlement.amount}</span>
                              </div>
                            ))}
                          </div>
                          <Button size="sm" className="w-full mt-3">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Send Payment Requests
                          </Button>
                        </div>
                      </div>
                    )}

                    {feature.id === 'tracking-analytics' && (
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-4 border-b">
                          <h4 className="font-bold text-xl">Group Analytics</h4>
                          <Badge variant="outline">Real-time Data</Badge>
                        </div>

                        {/* Category Breakdown */}
                        <div>
                          <h6 className="font-semibold mb-4">Spending by Category</h6>
                          <div className="space-y-3">
                            {feature.mockData.categoryBreakdown && feature.mockData.categoryBreakdown.map((category, i) => (
                              <div key={i} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">{category.name}</span>
                                  <span className="text-sm text-muted-foreground">
                                    ${category.amount} ({category.percentage}%)
                                  </span>
                                </div>
                                <Progress value={category.percentage} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* AI Insights */}
                        <div className="bg-success/5 p-4 rounded-lg border border-success/20">
                          <h6 className="font-semibold mb-3 text-success">💡 Smart Insights</h6>
                          <div className="space-y-2">
                            {feature.mockData.insights && feature.mockData.insights.map((insight, i) => (
                              <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                                • {insight}
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* Export Options */}
                        <div className="grid grid-cols-2 gap-3">
                          <Button variant="outline" size="sm">
                            Export PDF
                          </Button>
                          <Button variant="outline" size="sm">
                            Send Report
                          </Button>
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