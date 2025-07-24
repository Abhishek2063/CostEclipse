import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Calendar, 
  Download,
  ArrowRight,
  Eye,
  Filter,
  RefreshCw
} from 'lucide-react';

export function AnalyticsSection() {
  const analyticsFeatures = [
    {
      title: 'Interactive Dashboard',
      description: 'Get a complete overview of your financial health with customizable widgets and real-time updates.',
      callouts: [
        { id: 1, x: 20, y: 15, title: 'Monthly Overview', description: 'Income vs expenses at a glance' },
        { id: 2, x: 70, y: 25, title: 'Spending Trends', description: 'Visual representation of spending patterns' },
        { id: 3, x: 25, y: 70, title: 'Quick Actions', description: 'Add expenses or income with one click' },
        { id: 4, x: 75, y: 80, title: 'Goal Progress', description: 'Track savings goals and milestones' }
      ]
    },
    {
      title: 'Advanced Reports',
      description: 'Generate detailed reports with custom date ranges, categories, and export options for tax preparation.',
      callouts: [
        { id: 1, x: 15, y: 20, title: 'Date Filters', description: 'Custom time periods and comparisons' },
        { id: 2, x: 60, y: 30, title: 'Category Analysis', description: 'Detailed breakdown by expense type' },
        { id: 3, x: 80, y: 60, title: 'Export Options', description: 'PDF, CSV, and Excel formats' },
        { id: 4, x: 30, y: 85, title: 'Tax Summary', description: 'Ready-to-use tax documentation' }
      ]
    }
  ];

  return (
    <section id="analytics" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Powerful Analytics & Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your financial data into actionable insights with interactive dashboards and comprehensive reports.
          </p>
        </div>

        <div className="space-y-20">
          {analyticsFeatures.map((feature, index) => (
            <div key={index} className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content Side */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                      {index === 0 ? <BarChart3 className="h-6 w-6 text-primary" /> : <PieChart className="h-6 w-6 text-primary" />}
                    </div>
                    <Badge variant="outline" className="font-medium">
                      Analytics
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Key Capabilities:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {index === 0 ? (
                      <>
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-primary" />
                          <span className="text-sm">Real-time updates</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-primary" />
                          <span className="text-sm">Custom filters</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 text-primary" />
                          <span className="text-sm">Auto-refresh</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="text-sm">Trend analysis</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="text-sm">Date ranges</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Download className="h-4 w-4 text-primary" />
                          <span className="text-sm">Export options</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-primary" />
                          <span className="text-sm">Visual charts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <PieChart className="h-4 w-4 text-primary" />
                          <span className="text-sm">Category breakdown</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">15+</div>
                    <div className="text-xs text-muted-foreground">Chart Types</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-secondary">5 sec</div>
                    <div className="text-xs text-muted-foreground">Load Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-success">100%</div>
                    <div className="text-xs text-muted-foreground">Accurate</div>
                  </div>
                </div>

                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                  Explore Analytics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Dashboard Screenshot with Callouts */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Card className="p-6 bg-background border-2 hover:shadow-xl transition-all duration-300">
                  {/* Dashboard Container */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-accent/30 to-primary/5 rounded-lg border relative overflow-hidden">
                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between p-4 border-b bg-background/50 backdrop-blur-sm">
                      <h4 className="font-semibold">{feature.title}</h4>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-success rounded-full"></div>
                        <div className="w-3 h-3 bg-warning rounded-full"></div>
                        <div className="w-3 h-3 bg-error rounded-full"></div>
                      </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="p-4 space-y-4">
                      {index === 0 ? (
                        // Interactive Dashboard Mock
                        <>
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            <Card className="p-3 bg-background/60">
                              <div className="text-xs text-muted-foreground">Income</div>
                              <div className="font-bold text-success">$4,250</div>
                            </Card>
                            <Card className="p-3 bg-background/60">
                              <div className="text-xs text-muted-foreground">Expenses</div>
                              <div className="font-bold text-error">$2,840</div>
                            </Card>
                            <Card className="p-3 bg-background/60">
                              <div className="text-xs text-muted-foreground">Savings</div>
                              <div className="font-bold text-primary">$1,410</div>
                            </Card>
                          </div>
                          
                          {/* Mock Chart */}
                          <div className="h-24 bg-background/60 rounded flex items-end justify-around p-2">
                            {[30, 45, 35, 60, 40, 55, 50].map((height, i) => (
                              <div 
                                key={i} 
                                className="bg-gradient-to-t from-primary to-secondary rounded-t w-3"
                                style={{ height: `${height}%` }}
                              ></div>
                            ))}
                          </div>
                          
                          {/* Quick Actions */}
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs">+ Expense</Button>
                            <Button size="sm" variant="outline" className="text-xs">+ Income</Button>
                          </div>
                        </>
                      ) : (
                        // Reports Interface Mock
                        <>
                          <div className="flex gap-2 mb-4">
                            <Badge variant="outline" className="text-xs">Jan 2024</Badge>
                            <Badge variant="outline" className="text-xs">All Categories</Badge>
                            <Badge variant="outline" className="text-xs">Export</Badge>
                          </div>
                          
                          {/* Mock Table */}
                          <div className="space-y-2">
                            {['Food & Dining', 'Transportation', 'Shopping', 'Entertainment'].map((category, i) => (
                              <div key={i} className="flex justify-between p-2 bg-background/60 rounded text-xs">
                                <span>{category}</span>
                                <span className="font-medium">${[456, 234, 189, 145][i]}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Export Buttons */}
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs">PDF</Button>
                            <Button size="sm" variant="outline" className="text-xs">CSV</Button>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Callout Points */}
                    {feature.callouts.map((callout) => (
                      <div
                        key={callout.id}
                        className="absolute group cursor-pointer"
                        style={{ left: `${callout.x}%`, top: `${callout.y}%` }}
                      >
                        {/* Callout Dot */}
                        <div className="w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse group-hover:animate-none transition-all duration-200 flex items-center justify-center">
                          <div className="w-2 h-2 bg-background rounded-full"></div>
                        </div>
                        
                        {/* Callout Tooltip */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-background border rounded-lg p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 w-48">
                          <div className="font-semibold text-sm">{callout.title}</div>
                          <div className="text-xs text-muted-foreground">{callout.description}</div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-background border-r border-b rotate-45"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}