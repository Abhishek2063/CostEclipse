import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Calendar,
  Target,
  Filter,
  Download,
  Eye,
  ArrowRight
} from 'lucide-react';

export function AnalyticsSection() {
  const analyticsFeatures = [
    {
      title: 'Interactive Financial Dashboard',
      description: 'Get a complete 360° view of your financial health with customizable widgets, real-time updates, and intelligent insights.',
      callouts: [
        { 
          id: 1, 
          x: 25, 
          y: 20, 
          title: 'Monthly Overview', 
          description: 'Income vs expenses with trend indicators',
          metric: '+12.5%'
        },
        { 
          id: 2, 
          x: 70, 
          y: 30, 
          title: 'Category Breakdown', 
          description: 'Interactive pie chart with drill-down capability',
          metric: '8 categories'
        },
        { 
          id: 3, 
          x: 30, 
          y: 75, 
          title: 'Quick Actions', 
          description: 'One-click expense addition and goal updates',
          metric: '<3 seconds'
        },
        { 
          id: 4, 
          x: 75, 
          y: 70, 
          title: 'Goal Progress', 
          description: 'Visual savings goal tracking with milestones',
          metric: '3 active goals'
        }
      ],
      mockData: {
        income: 5240,
        expenses: 3180,
        savings: 2060,
        categories: [
          { name: 'Food', value: 35, amount: 1113 },
          { name: 'Transport', value: 20, amount: 636 },
          { name: 'Shopping', value: 18, amount: 572 },
          { name: 'Bills', value: 15, amount: 477 },
          { name: 'Other', value: 12, amount: 382 }
        ]
      }
    },
    {
      title: 'Advanced Reporting & Analytics',
      description: 'Generate comprehensive reports with custom date ranges, automated insights, and export capabilities for tax preparation and financial planning.',
      callouts: [
        { 
          id: 1, 
          x: 20, 
          y: 25, 
          title: 'Smart Filters', 
          description: 'Date ranges, categories, and custom criteria',
          metric: '15+ filters'
        },
        { 
          id: 2, 
          x: 65, 
          y: 20, 
          title: 'Trend Analysis', 
          description: 'AI-powered spending pattern recognition',
          metric: '94% accuracy'
        },
        { 
          id: 3, 
          x: 80, 
          y: 65, 
          title: 'Export Options', 
          description: 'PDF, CSV, Excel formats with tax summaries',
          metric: '3 formats'
        },
        { 
          id: 4, 
          x: 25, 
          y: 80, 
          title: 'Automated Insights', 
          description: 'Weekly financial health reports via email',
          metric: 'Weekly delivery'
        }
      ],
      mockData: {
        reportTypes: ['Monthly Summary', 'Category Analysis', 'Tax Report', 'Budget vs Actual'],
        insights: [
          'Spending decreased 8% vs last month',
          'Food expenses trending upward',
          'On track to meet Q4 savings goal'
        ],
        exportFormats: ['PDF Report', 'Excel Spreadsheet', 'CSV Data']
      }
    }
  ];

  return (
    <section id="analytics" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary text-white">
            Analytics & Insights
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Transform Data Into Financial Wisdom
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Powerful analytics tools that turn your financial data into actionable insights, 
            helping you make smarter decisions and achieve your financial goals faster.
          </p>
        </div>

        <div className="space-y-20">
          {analyticsFeatures.map((feature, index) => (
            <div key={index} className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content Side */}
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                      {index === 0 ? <BarChart3 className="h-7 w-7 text-primary" /> : <PieChart className="h-7 w-7 text-primary" />}
                    </div>
                    <Badge variant="outline" className="font-medium">
                      Analytics Dashboard
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="space-y-6">
                  <h4 className="font-semibold text-foreground">Analytics Capabilities:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {index === 0 ? (
                      <>
                        <div className="flex items-center gap-3">
                          <Eye className="h-5 w-5 text-primary" />
                          <span className="text-sm">Real-time updates</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Filter className="h-5 w-5 text-primary" />
                          <span className="text-sm">Custom filters</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <TrendingUp className="h-5 w-5 text-primary" />
                          <span className="text-sm">Trend analysis</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Target className="h-5 w-5 text-primary" />
                          <span className="text-sm">Goal tracking</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-primary" />
                          <span className="text-sm">Date ranges</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Download className="h-5 w-5 text-primary" />
                          <span className="text-sm">Export options</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <BarChart3 className="h-5 w-5 text-primary" />
                          <span className="text-sm">Visual reports</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <PieChart className="h-5 w-5 text-primary" />
                          <span className="text-sm">AI insights</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-6 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">15+</div>
                    <div className="text-xs text-muted-foreground">Chart Types</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-secondary">2 sec</div>
                    <div className="text-xs text-muted-foreground">Load Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-success">100%</div>
                    <div className="text-xs text-muted-foreground">Accurate</div>
                  </div>
                </div>

                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 group">
                  Explore Analytics
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Interactive Dashboard Preview with Callouts */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Card className="p-6 lg:p-8 bg-background border-2 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Dashboard Container */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-accent/30 to-primary/5 rounded-lg border relative">
                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-sm">
                      <h4 className="font-semibold text-lg">{feature.title.split(' ')[1]} Dashboard</h4>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-success rounded-full"></div>
                        <div className="w-3 h-3 bg-warning rounded-full"></div>
                        <div className="w-3 h-3 bg-error rounded-full"></div>
                      </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="p-4 space-y-4 h-full">
                      {index === 0 ? (
                        // Financial Dashboard Mock
                        <>
                          {/* Top Stats */}
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-background/60 p-3 rounded-lg border">
                              <div className="text-xs text-muted-foreground">Income</div>
                              <div className="font-bold text-success text-sm">${feature.mockData.income && feature.mockData.income.toLocaleString()}</div>
                            </div>
                            <div className="bg-background/60 p-3 rounded-lg border">
                              <div className="text-xs text-muted-foreground">Expenses</div>
                              <div className="font-bold text-error text-sm">${feature.mockData.expenses && feature.mockData.expenses.toLocaleString()}</div>
                            </div>
                            <div className="bg-background/60 p-3 rounded-lg border">
                              <div className="text-xs text-muted-foreground">Savings</div>
                              <div className="font-bold text-primary text-sm">${feature.mockData.savings && feature.mockData.savings.toLocaleString()}</div>
                            </div>
                          </div>

                          {/* Chart Area */}
                          <div className="grid grid-cols-2 gap-3 flex-1">
                            {/* Bar Chart */}
                            <div className="bg-background/60 rounded-lg p-3 border">
                              <div className="text-xs text-muted-foreground mb-2">Monthly Trend</div>
                              <div className="h-16 flex items-end justify-around">
                                {[40, 65, 45, 80, 35, 70].map((height, i) => (
                                  <div 
                                    key={i} 
                                    className="bg-gradient-to-t from-primary to-success rounded-t w-2"
                                    style={{ height: `${height}%` }}
                                  ></div>
                                ))}
                              </div>
                            </div>

                            {/* Pie Chart */}
                            <div className="bg-background/60 rounded-lg p-3 border">
                              <div className="text-xs text-muted-foreground mb-2">Categories</div>
                              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-conic from-blue-500 via-green-500 via-purple-500 via-orange-500 to-pink-500 relative">
                                <div className="absolute inset-2 bg-background rounded-full"></div>
                              </div>
                            </div>
                          </div>

                          {/* Goals Section */}
                          <div className="bg-background/60 rounded-lg p-3 border">
                            <div className="text-xs text-muted-foreground mb-2">Emergency Fund</div>
                            <Progress value={84} className="h-2 mb-1" />
                            <div className="text-xs text-success">$8,400 / $10,000</div>
                          </div>
                        </>
                      ) : (
                        // Reports Dashboard Mock
                        <>
                          {/* Filter Bar */}
                          <div className="flex gap-2 mb-4">
                            <Badge variant="outline" className="text-xs">This Month</Badge>
                            <Badge variant="outline" className="text-xs">All Categories</Badge>
                            <Badge variant="outline" className="text-xs">Income & Expenses</Badge>
                          </div>

                          {/* Report Sections */}
                          <div className="space-y-3">
                            {feature.mockData.reportTypes && feature.mockData.reportTypes.slice(0, 3).map((reportType, i) => (
                              <div key={i} className="bg-background/60 p-3 rounded-lg border flex justify-between items-center">
                                <span className="text-xs font-medium">{reportType}</span>
                                <Badge variant="outline" className="text-xs">Ready</Badge>
                              </div>
                            ))}
                          </div>

                          {/* Insights Panel */}
                          <div className="bg-success/10 p-3 rounded-lg border border-success/20">
                            <div className="text-xs font-medium text-success mb-2">💡 Key Insights</div>
                            <div className="space-y-1">
                              {feature.mockData.insights && feature.mockData.insights.slice(0, 2).map((insight, i) => (
                                <div key={i} className="text-xs text-muted-foreground">• {insight}</div>
                              ))}
                            </div>
                          </div>

                          {/* Export Options */}
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-6">PDF</Button>
                            <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-6">Excel</Button>
                            <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-6">CSV</Button>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Interactive Callout Points */}
                    {feature.callouts.map((callout) => (
                      <div
                        key={callout.id}
                        className="absolute group cursor-pointer z-10"
                        style={{ left: `${callout.x}%`, top: `${callout.y}%` }}
                      >
                        {/* Callout Dot */}
                        <div className="w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse group-hover:animate-none transition-all duration-200 flex items-center justify-center">
                          <div className="w-2 h-2 bg-background rounded-full"></div>
                        </div>
                        
                        {/* Callout Tooltip */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-background border rounded-lg p-4 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 w-64">
                          <div className="font-semibold text-sm mb-1">{callout.title}</div>
                          <div className="text-xs text-muted-foreground mb-2 leading-relaxed">{callout.description}</div>
                          <Badge variant="secondary" className="text-xs">
                            {callout.metric}
                          </Badge>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-background border-r border-b rotate-45 -mt-1"></div>
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