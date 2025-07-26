import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Lock, 
  Key, 
  Database,
  Eye,
  AlertTriangle,
  CheckCircle,
  Mail,
  RefreshCw,
  Globe,
  Server,
  Zap,
  Users
} from 'lucide-react';

export function SecurityServiceSection() {
  const securityFeatures = [
    {
      id: 'authentication',
      title: 'Authentication & Encryption',
      icon: Key,
      color: 'from-blue-500 to-cyan-500',
      features: [
        {
          name: 'JWT Tokens',
          description: 'Secure access tokens for session management with automatic expiry and refresh.',
          implementation: 'Industry-standard JSON Web Tokens with RSA-256 encryption',
          benefits: ['Stateless authentication', 'Automatic token refresh', 'Cross-device security', 'Tamper-proof sessions']
        },
        {
          name: 'bcrypt Password Hashing',
          description: 'Military-grade password protection using salted hashing algorithms.',
          implementation: '12-round bcrypt hashing with unique salts per user',
          benefits: ['Rainbow table resistance', 'Brute force protection', 'Timing attack prevention', 'Future-proof security']
        },
        {
          name: 'HTTPS Encryption',
          description: 'End-to-end encryption for all data transmission between client and server.',
          implementation: 'TLS 1.3 with perfect forward secrecy and certificate pinning',
          benefits: ['256-bit encryption', 'Man-in-the-middle protection', 'Certificate validation', 'Secure data transmission']
        }
      ]
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Security',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      features: [
        {
          name: 'Helmet.js Protection',
          description: 'Comprehensive protection against common web vulnerabilities and attacks.',
          implementation: 'Content Security Policy, XSS protection, and security headers',
          benefits: ['XSS attack prevention', 'Clickjacking protection', 'MIME type sniffing prevention', 'Referrer policy enforcement']
        },
        {
          name: 'Rate Limiting',
          description: 'Advanced protection against brute-force attacks and API abuse.',
          implementation: 'Intelligent rate limiting with IP-based and user-based throttling',
          benefits: ['Brute force prevention', 'DDoS protection', 'API abuse prevention', 'Resource optimization']
        },
        {
          name: 'Session Management',
          description: 'Secure session handling with Redis for scalable multi-session support.',
          implementation: 'Redis-based session store with encryption and auto-expiry',
          benefits: ['Session isolation', 'Automatic cleanup', 'Scalable architecture', 'Memory efficiency']
        }
      ]
    },
    {
      id: 'monitoring',
      title: 'Monitoring & Auditing',
      icon: Eye,
      color: 'from-purple-500 to-violet-500',
      features: [
        {
          name: 'Activity Monitoring',
          description: 'Continuous monitoring of suspicious activities and security events.',
          implementation: 'Real-time logging with anomaly detection and alerting',
          benefits: ['Threat detection', 'Audit trail maintenance', 'Compliance reporting', 'Incident response']
        },
        {
          name: 'Admin Security Tools',
          description: 'Comprehensive administrative tools for monitoring user and system health.',
          implementation: 'Dashboard with real-time metrics and security indicators',
          benefits: ['User activity oversight', 'System health monitoring', 'Security incident tracking', 'Performance analytics']
        },
        {
          name: 'Automated Alerts',
          description: 'Proactive security alerts for suspicious activities and system issues.',
          implementation: 'Multi-channel alerting with severity-based escalation',
          benefits: ['Early threat detection', 'Rapid incident response', 'Automated notifications', 'Security team coordination']
        }
      ]
    },
    {
      id: 'storage',
      title: 'Data Storage & Protection',
      icon: Database,
      color: 'from-orange-500 to-red-500',
      features: [
        {
          name: 'PostgreSQL Security',
          description: 'Enterprise-grade database with encryption at rest and in transit.',
          implementation: 'AES-256 encryption with secure backup and recovery procedures',
          benefits: ['Data encryption at rest', 'Secure backups', 'Access control', 'Audit logging']
        },
        {
          name: 'Redis Security',
          description: 'Secure in-memory storage for sessions with automatic data expiry.',
          implementation: 'Memory encryption with AUTH and SSL/TLS connections',
          benefits: ['Encrypted memory storage', 'Automatic cleanup', 'Secure connections', 'Performance optimization']
        },
        {
          name: 'Data Isolation',
          description: 'Complete separation of user data with multi-tenant security architecture.',
          implementation: 'Row-level security with encrypted user boundaries',
          benefits: ['User data isolation', 'Compliance support', 'Privacy protection', 'Secure multi-tenancy']
        }
      ]
    }
  ];

  const securityStats = [
    { metric: '99.9%', label: 'Uptime Security', description: 'Reliable protection' },
    { metric: '<2ms', label: 'Security Check Time', description: 'No performance impact' },
    { metric: '256-bit', label: 'Encryption Standard', description: 'Military-grade security' },
    { metric: '24/7', label: 'Monitoring', description: 'Continuous protection' }
  ];

  const userSecurityTips = [
    {
      icon: Lock,
      title: 'Enable 2FA',
      description: 'Two-factor authentication adds an extra layer of security (coming soon)',
      action: 'Get notified when available'
    },
    {
      icon: Key,
      title: 'Use Strong Passwords',
      description: 'Create unique, complex passwords with a mix of letters, numbers, and symbols',
      action: 'Check password strength'
    },
    {
      icon: Eye,
      title: 'Review Activity Logs',
      description: 'Regularly check your account activity for any unauthorized access',
      action: 'View activity log'
    },
    {
      icon: RefreshCw,
      title: 'Keep Software Updated',
      description: 'Update your browser and device software for the latest security features',
      action: 'Check for updates'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-800 via-primary to-success relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:30px_30px]"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <Shield className="mr-2 h-4 w-4" />
              Security at CostEclipse
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Bank-Level Security for Your Financial Data
            </h1>
            <p className="text-xl opacity-90 leading-relaxed mb-8">
              We take your security seriously. CostEclipse is built with top-tier security practices 
              to ensure your financial data remains protected against threats and unauthorized access.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {securityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold mb-2">{stat.metric}</div>
                  <div className="font-semibold text-lg mb-1">{stat.label}</div>
                  <div className="text-sm opacity-80">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {securityFeatures.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.id} className="space-y-8">
                  {/* Category Header */}
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold">{category.title}</h2>
                  </div>

                  {/* Features Grid */}
                  <div className="grid lg:grid-cols-3 gap-8">
                    {category.features.map((feature, index) => (
                      <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300">
                        <div className="space-y-6">
                          {/* Feature Header */}
                          <div className="space-y-3">
                            <h3 className="text-xl font-bold">{feature.name}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                          </div>

                          {/* Implementation */}
                          <div className="bg-accent/30 p-4 rounded-lg">
                            <h4 className="font-semibold text-sm mb-2">Implementation:</h4>
                            <p className="text-sm text-muted-foreground">{feature.implementation}</p>
                          </div>

                          {/* Benefits */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-sm">Key Benefits:</h4>
                            <div className="space-y-2">
                              {feature.benefits.map((benefit, benefitIndex) => (
                                <div key={benefitIndex} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-muted-foreground">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Dashboard Preview */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-muted/30 to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Real-Time Security Monitoring</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our security team monitors threats 24/7 with advanced tools and automated systems 
                to keep your data safe.
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-background to-accent/20 border-2">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Threat Detection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-success to-emerald-600 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold">Threat Detection</h3>
                      <p className="text-sm text-muted-foreground">Real-time monitoring</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Security Level</span>
                      <span className="text-success font-medium">Excellent</span>
                    </div>
                    <Progress value={95} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      No threats detected in the last 24 hours
                    </div>
                  </div>
                </div>

                {/* System Health */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold">System Health</h3>
                      <p className="text-sm text-muted-foreground">All systems operational</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Uptime</span>
                      <span className="text-success font-medium">99.97%</span>
                    </div>
                    <Progress value={99.97} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      156 days since last security incident
                    </div>
                  </div>
                </div>

                {/* Active Users */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold">Active Protection</h3>
                      <p className="text-sm text-muted-foreground">Users secured</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Protected Users</span>
                      <span className="text-primary font-medium">75,429</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      100% of users protected by our security measures
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* User Security Tips */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gradient-to-r from-primary to-success text-white">
                Security Best Practices
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Your Role in Staying Secure</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                While we handle the technical security, here are some tips to keep your account extra safe.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {userSecurityTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-success/10 rounded-lg flex items-center justify-center mx-auto">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold">{tip.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        {tip.action}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Security Team */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-muted/30 to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 lg:p-12 bg-gradient-to-br from-primary/5 to-success/5 border-primary/20 text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Questions About Security?</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Our security team is here to help. Whether you have questions about our practices, 
                    need to report a security concern, or want to learn more about protecting your account.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90">
                    <Shield className="mr-2 h-5 w-5" />
                    Contact Security Team
                  </Button>
                  <Button variant="outline">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Report Security Issue
                  </Button>
                </div>
                <div className="flex justify-center gap-8 text-sm text-muted-foreground pt-6 border-t">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>security@costeclipse.app</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>Available 24/7 for security issues</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}