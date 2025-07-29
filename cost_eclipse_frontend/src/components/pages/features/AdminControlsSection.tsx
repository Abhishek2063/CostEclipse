import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Users, 
  CreditCard, 
  MessageSquare,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Lock,
  Activity
} from 'lucide-react';

export function AdminControlsSection() {
  const adminFeatures = [
    {
      id: 'user-management',
      title: 'Comprehensive User Management',
      description: 'Complete oversight of user accounts, permissions, and activity monitoring',
      icon: Users,
      color: 'bg-blue-500',
      stats: {
        totalUsers: '75,429',
        activeToday: '12,847',
        newThisWeek: '2,156'
      },
      capabilities: [
        'User account creation and suspension',
        'Role-based permission management',
        'Bulk user operations and data export',
        'Activity monitoring and audit trails',
        'Support ticket integration'
      ]
    },
    {
      id: 'subscription-tracking',
      title: 'Subscription & Billing Analytics',
      description: 'Monitor subscription metrics, revenue trends, and customer lifecycle',
      icon: CreditCard,
      color: 'bg-green-500',
      stats: {
        monthlyRevenue: '$847,230',
        churnRate: '2.3%',
        avgLifetime: '18 months'
      },
      capabilities: [
        'Real-time revenue tracking and forecasting',
        'Subscription tier analytics and conversions',
        'Payment failure monitoring and recovery',
        'Customer lifetime value calculations',
        'Automated billing and invoice management'
      ]
    },
    {
      id: 'feedback-overview',
      title: 'User Feedback & Support Hub',
      description: 'Centralized feedback collection, analysis, and support ticket management',
      icon: MessageSquare,
      color: 'bg-purple-500',
      stats: {
        satisfaction: '96.8%',
        avgResponse: '2.4 hours',
        resolvedTickets: '1,247'
      },
      capabilities: [
        'Integrated feedback collection and analysis',
        'Support ticket routing and prioritization',
        'Customer satisfaction tracking',
        'Feature request voting and roadmap planning',
        'Automated response templates and workflows'
      ]
    },
    {
      id: 'usage-analytics',
      title: 'Advanced Usage Analytics',
      description: 'Deep insights into platform usage, feature adoption, and performance metrics',
      icon: BarChart3,
      color: 'bg-orange-500',
      stats: {
        dailyActive: '45,230',
        featureAdoption: '78%',
        sessionLength: '24 min'
      },
      capabilities: [
        'Real-time usage analytics and heatmaps',
        'Feature adoption tracking and A/B testing',
        'Performance monitoring and optimization',
        'Custom dashboard creation and reporting',
        'Data export and API access for integrations'
      ]
    }
  ];

  const systemMetrics = {
    uptime: 99.97,
    avgResponseTime: 180,
    errorRate: 0.02,
    activeConnections: 8429
  };

  return (
    <section id="admin-controls" className="py-16 lg:py-24 bg-gradient-to-br from-muted/30 to-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-red-500 to-orange-500 text-white">
            🛡️ Super Admin Dashboard
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Enterprise-Grade Admin Controls
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive administrative tools for platform management, user oversight, 
            and business intelligence with enterprise security and compliance features.
          </p>
        </div>

        {/* System Health Overview */}
        <Card className="p-6 lg:p-8 mb-12 bg-gradient-to-br from-background to-accent/20 border-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <Shield className="h-6 w-6 text-success" />
              System Health & Performance
            </h3>
            <Badge className="bg-success text-white">All Systems Operational</Badge>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-success">{systemMetrics.uptime}%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
              <Progress value={systemMetrics.uptime} className="h-2" />
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-500">{systemMetrics.avgResponseTime}ms</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-500">{systemMetrics.errorRate}%</div>
              <div className="text-sm text-muted-foreground">Error Rate</div>
              <Progress value={2} className="h-2" />
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-500">{systemMetrics.activeConnections.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
              <Progress value={60} className="h-2" />
            </div>
          </div>
        </Card>

        {/* Admin Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {adminFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.id} className="p-6 lg:p-8 hover:shadow-xl transition-all duration-300">
                <div className="space-y-6">
                  {/* Feature Header */}
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-3 gap-4 py-4 bg-accent/30 rounded-lg">
                    {Object.entries(feature.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-bold text-sm">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Capabilities */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Key Capabilities:</h4>
                    <div className="space-y-2">
                      {feature.capabilities.map((capability, capIndex) => (
                        <div key={capIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {capability}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mock Dashboard Preview */}
                  <div className="bg-background/60 p-4 rounded-lg border">
                    <h5 className="font-medium text-xs mb-3 text-muted-foreground uppercase tracking-wide">
                      Dashboard Preview
                    </h5>
                    
                    {feature.id === 'user-management' && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span>Active Users</span>
                          <Badge variant="outline" className="text-xs">Live</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Premium Users</span>
                            <span className="font-medium">23,847 (68%)</span>
                          </div>
                          <Progress value={68} className="h-1" />
                          <div className="flex justify-between text-xs">
                            <span>Free Users</span>
                            <span className="font-medium">11,289 (32%)</span>
                          </div>
                          <Progress value={32} className="h-1" />
                        </div>
                      </div>
                    )}

                    {feature.id === 'subscription-tracking' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <div className="text-muted-foreground">MRR Growth</div>
                            <div className="font-bold text-success">+12.5%</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Conversion</div>
                            <div className="font-bold text-primary">8.4%</div>
                          </div>
                        </div>
                        <div className="h-8 bg-accent rounded flex items-end justify-around p-1">
                          {[40, 55, 45, 70, 60, 85].map((height, i) => (
                            <div 
                              key={i} 
                              className="bg-green-500 rounded-t w-1"
                              style={{ height: `${height}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    )}

                    {feature.id === 'feedback-overview' && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span>Support Tickets</span>
                          <div className="flex gap-2">
                            <Badge className="bg-green-500 text-white text-xs">34 Resolved</Badge>
                            <Badge className="bg-yellow-500 text-white text-xs">12 Pending</Badge>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">Satisfaction Score</div>
                          <div className="flex items-center gap-2">
                            <Progress value={97} className="h-2 flex-1" />
                            <span className="text-xs font-medium">4.8/5</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {feature.id === 'usage-analytics' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <div className="text-muted-foreground">Page Views</div>
                            <div className="font-bold">1.2M today</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">API Calls</div>
                            <div className="font-bold">847K</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Activity className="h-3 w-3 text-green-500" />
                          <span className="text-success">Peak usage: 2:30 PM</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Security & Compliance Panel */}
        <Card className="p-6 lg:p-8 bg-gradient-to-br from-red-50 to-orange-50 border-red-200 dark:from-red-950/20 dark:to-orange-950/20 dark:border-red-800">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-6 w-6 text-red-500" />
            <h3 className="text-xl font-bold">Security & Compliance Dashboard</h3>
            <Badge className="bg-red-500 text-white">Admin Only</Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-red-700 dark:text-red-400">Security Monitoring</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Failed Login Attempts</span>
                  <Badge variant="outline" className="text-xs">23 today</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Suspicious Activities</span>
                  <Badge variant="outline" className="text-xs">2 flagged</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Data Backup Status</span>
                  <Badge className="bg-green-500 text-white text-xs">Complete</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-red-700 dark:text-red-400">Compliance Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>SOC 2 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>Audit Due: 30 days</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-red-700 dark:text-red-400">Quick Actions</h4>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Export Audit Logs
                </Button>
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Generate Compliance Report
                </Button>
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Review Security Alerts
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}