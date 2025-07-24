import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Calculator, 
  ArrowRight, 
  DollarSign, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Share2
} from 'lucide-react';

export function GroupExpenseSection() {
  const groupFeatures = [
    {
      id: 'bill-splitting',
      title: 'Intelligent Bill Splitting',
      subtitle: 'Fair Splits, Zero Conflicts',
      description: 'Split expenses fairly with flexible options - equal splits, custom amounts, or percentage-based divisions. Handle complex scenarios like tax, tips, and discounts effortlessly.',
      icon: Calculator,
      highlights: [
        'Multiple split methods (equal, custom, percentage)',
        'Tax and tip calculations included',
        'Itemized receipt splitting',
        'Currency conversion for international groups',
        'Offline expense recording'
      ],
      stats: {
        accuracy: '100%',
        conflicts: '-85%',
        timesSaved: '15 min/bill'
      },
      mockData: {
        event: 'Weekend Trip to Lake Tahoe',
        participants: ['Alex', 'Sarah', 'Mike', 'Jenny'],
        totalExpense: '$487.50',
        perPerson: '$121.88',
        recentExpenses: [
          { name: 'Dinner at Lakeside Grill', amount: '$156.40', participants: 4 },
          { name: 'Gas for Road Trip', amount: '$89.20', participants: 3 },
          { name: 'Grocery Shopping', amount: '$67.30', participants: 4 },
          { name: 'Cabin Rental', amount: '$240.00', participants: 4 }
        ]
      }
    },
    {
      id: 'group-analytics',
      title: 'Group Spending Analytics',
      subtitle: 'Insights for Smarter Group Decisions',
      description: 'Get detailed analytics on group spending patterns, member contributions, and expense categories. Make informed decisions for future events and identify spending trends.',
      icon: Users,
      highlights: [
        'Real-time spending dashboards',
        'Member contribution analysis',
        'Category-wise expense breakdown',
        'Spending trend predictions',
        'Comparative analysis across events'
      ],
      stats: {
        insights: '20+',
        savings: '22%',
        satisfaction: '96%'
      },
      mockData: {
        event: 'Office Team Building Event',
        participants: ['Emma', 'David', 'Lisa', 'Tom', 'Nina'],
        categories: [
          { name: 'Food & Drinks', amount: 340, percentage: 45, color: 'bg-primary' },
          { name: 'Activities', amount: 280, percentage: 37, color: 'bg-secondary' },
          { name: 'Transportation', amount: 90, percentage: 12, color: 'bg-success' },
          { name: 'Miscellaneous', amount: 45, percentage: 6, color: 'bg-warning' }
        ],
        totalSpent: '$755.00',
        averagePerPerson: '$151.00'
      }
    }
  ];

  return (
    <section id="group-expenses" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Group Expenses Made Fair & Simple
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No more awkward money conversations. Split bills fairly, track group spending, and settle up automatically.
          </p>
        </div>

        <div className="space-y-32">
          {groupFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isFirst = index === 0;
            
            return (
              <div key={feature.id} className="grid lg:grid-cols-5 gap-12 items-center">
                {/* Content Side */}
                <div className={`lg:col-span-2 space-y-6 ${isFirst ? '' : 'lg:order-2'}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <Badge variant="secondary" className="font-medium">
                        Group Feature
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-xl text-primary font-medium mb-4">{feature.subtitle}</p>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Key Features:</h4>
                    <div className="space-y-3">
                      {feature.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-6">
                    {Object.entries(feature.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      </div>
                    ))}
                  </div>

                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                    Try Group Features
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                {/* Large Screenshot/Demo Side */}
                <div className={`lg:col-span-3 ${isFirst ? '' : 'lg:order-1'}`}>
                  <Card className="p-8 bg-background border-2 hover:shadow-2xl transition-all duration-300">
                    {isFirst ? (
                      // Bill Splitting Interface
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-4 border-b">
                          <div>
                            <h4 className="font-bold text-lg">{feature.mockData.event}</h4>
                            <p className="text-sm text-muted-foreground">4 participants • 6 expenses</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{feature.mockData.totalExpense}</div>
                            <div className="text-sm text-muted-foreground">{feature.mockData.perPerson} per person</div>
                          </div>
                        </div>

                        {/* Participants */}
                        <div>
                          <h5 className="font-semibold mb-3">Participants</h5>
                          <div className="flex gap-3">
                            {feature.mockData.participants.map((participant, i) => (
                              <div key={i} className="flex items-center gap-2 bg-accent rounded-lg p-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs">{participant[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{participant}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recent Expenses */}
                        <div>
                          <h5 className="font-semibold mb-3">Recent Expenses</h5>
                          <div className="space-y-3">
                            {feature.mockData.recentExpenses.map((expense, i) => (
                              <div key={i} className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <DollarSign className="h-5 w-5 text-primary" />
                                  </div>
                                  <div>
                                    <div className="font-medium">{expense.name}</div>
                                    <div className="text-sm text-muted-foreground">{expense.participants} participants</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold">{expense.amount}</div>
                                  <div className="text-sm text-success">Split equally</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                          <Button className="flex-1">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share Summary
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Calculator className="mr-2 h-4 w-4" />
                            Settle Up
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // Group Analytics Interface
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-4 border-b">
                          <div>
                            <h4 className="font-bold text-lg">{feature.mockData.event}</h4>
                            <p className="text-sm text-muted-foreground">5 participants • Analytics Dashboard</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{feature.mockData.totalSpent}</div>
                            <div className="text-sm text-muted-foreground">{feature.mockData.averagePerPerson} average</div>
                          </div>
                        </div>

                        {/* Category Breakdown */}
                        <div>
                          <h5 className="font-semibold mb-4">Spending by Category</h5>
                          <div className="space-y-3">
                            {feature.mockData.categories.map((category, i) => (
                              <div key={i} className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="font-medium">{category.name}</span>
                                  <span className="text-sm text-muted-foreground">${category.amount} ({category.percentage}%)</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${category.color}`}
                                    style={{ width: `${category.percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Insights */}
                        <div className="grid grid-cols-2 gap-4">
                          <Card className="p-4 bg-success/10 border-success/20">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="h-5 w-5 text-success" />
                              <span className="font-medium text-success">On Budget</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Spending is 12% under projected budget</p>
                          </Card>
                          <Card className="p-4 bg-warning/10 border-warning/20">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertCircle className="h-5 w-5 text-warning" />
                              <span className="font-medium text-warning">Top Category</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Food & Drinks leading expenses</p>
                          </Card>
                        </div>

                        {/* Member Contributions */}
                        <div>
                          <h5 className="font-semibold mb-3">Member Contributions</h5>
                          <div className="space-y-2">
                            {['Emma', 'David', 'Lisa', 'Tom', 'Nina'].map((member, i) => {
                              const amounts = [180, 165, 145, 155, 110];
                              return (
                                <div key={i} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback className="text-xs">{member[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{member}</span>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold">${amounts[i]}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {amounts[i] > 151 ? '+' : ''}${(amounts[i] - 151).toFixed(0)} vs avg
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
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