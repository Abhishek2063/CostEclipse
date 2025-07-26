import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Eye, 
  Database, 
  Share2, 
  Settings,
  Calendar,
  Mail,
  Download,
  FileText,
  Lock,
  Globe,
  AlertCircle
} from 'lucide-react';

export function PrivacyPolicySection() {
  const privacySections = [
    {
      id: 'collection',
      icon: Database,
      title: 'Information We Collect',
      color: 'from-blue-500 to-cyan-500',
      content: [
        {
          category: 'Personal Information',
          description: 'Name, email address, phone number, occupation, income and saving goals to personalize your financial management experience.',
          examples: ['Full name and profile details', 'Email for account verification', 'Phone number for security alerts', 'Financial goals and preferences']
        },
        {
          category: 'Usage Data',
          description: 'Session logs, clicked events, feature interactions, and app usage patterns to improve our service.',
          examples: ['Pages visited and time spent', 'Feature usage analytics', 'Performance metrics', 'Error logs for debugging']
        },
        {
          category: 'Device Information',
          description: 'IP address, device type, browser type, and technical specifications for security and optimization.',
          examples: ['Browser and OS information', 'Screen resolution and device type', 'IP address for security', 'Location data (if permitted)']
        }
      ]
    },
    {
      id: 'usage',
      icon: Settings,
      title: 'How We Use Your Information',
      color: 'from-green-500 to-emerald-500',
      content: [
        {
          category: 'Service Improvement',
          description: 'Enhance app experience, personalize dashboards, and develop new features based on user needs.',
          examples: ['Customize expense categories', 'Improve recommendation algorithms', 'Optimize user interface', 'Develop new features']
        },
        {
          category: 'Communication',
          description: 'Notify users of critical updates, security alerts, and important account information.',
          examples: ['Security notifications', 'Feature announcements', 'Account updates', 'Support communications']
        },
        {
          category: 'Analytics',
          description: 'Analyze financial trends using aggregated, non-identifiable data to improve our services.',
          examples: ['Usage pattern analysis', 'Performance optimization', 'Feature adoption tracking', 'Industry insights (anonymized)']
        }
      ]
    },
    {
      id: 'sharing',
      icon: Share2,
      title: 'Data Sharing & Third-Parties',
      color: 'from-purple-500 to-violet-500',
      content: [
        {
          category: 'No Data Sales',
          description: 'We do not sell, rent, or trade your personal information to third parties for marketing purposes.',
          examples: ['No marketing data sales', 'No user profile trading', 'No advertising partnerships with data', 'No third-party analytics for marketing']
        },
        {
          category: 'Service Providers',
          description: 'Limited data is shared with trusted service providers to enable app functionality under strict agreements.',
          examples: ['Firebase for authentication', 'PostgreSQL for data storage', 'Email service providers', 'Payment processors (future)']
        },
        {
          category: 'Legal Requirements',
          description: 'We may disclose information when required by law or to protect our rights and users.',
          examples: ['Court orders and subpoenas', 'Law enforcement requests', 'Fraud prevention', 'Terms of service violations']
        }
      ]
    },
    {
      id: 'rights',
      icon: Eye,
      title: 'User Control & Rights',
      color: 'from-orange-500 to-red-500',
      content: [
        {
          category: 'Data Access',
          description: 'Access your personal data anytime through your profile settings or by contacting support.',
          examples: ['Download your data', 'View all stored information', 'Request data reports', 'Export financial records']
        },
        {
          category: 'Data Deletion',
          description: 'Request deletion of your account and all associated personal data at any time.',
          examples: ['Complete account deletion', 'Selective data removal', 'Right to be forgotten', '30-day deletion guarantee']
        },
        {
          category: 'Privacy Controls',
          description: 'Disable notifications, adjust sharing preferences, and control data usage settings.',
          examples: ['Notification preferences', 'Data sharing controls', 'Analytics opt-out', 'Cookie management']
        }
      ]
    }
  ];

  const dataRetention = [
    { type: 'Account Data', period: 'While account is active', description: 'Personal profile and preferences' },
    { type: 'Financial Data', period: '7 years after deletion', description: 'For legal compliance and tax purposes' },
    { type: 'Usage Analytics', period: '2 years', description: 'Aggregated usage patterns' },
    { type: 'Support Tickets', period: '3 years', description: 'Customer service records' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-accent/30 to-primary/5 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-primary to-success text-white">
              <Shield className="mr-2 h-4 w-4" />
              Privacy Policy
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Your Privacy is Non-Negotiable
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              At CostEclipse, your privacy is non-negotiable. This policy outlines what data we collect, 
              how we use it, and your rights. We believe in complete transparency about your financial data.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Effective Date: July 26, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Last Updated: July 26, 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {privacySections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.id} className="overflow-hidden">
                  {/* Section Header */}
                  <div className={`p-6 lg:p-8 bg-gradient-to-r ${section.color} text-white`}>
                    <div className="flex items-center gap-4">
                      <Icon className="h-8 w-8" />
                      <h2 className="text-2xl lg:text-3xl font-bold">{section.title}</h2>
                    </div>
                  </div>

                  {/* Section Content */}
                  <div className="p-6 lg:p-8 space-y-8">
                    {section.content.map((item, index) => (
                      <div key={index} className="space-y-4">
                        <h3 className="text-xl font-bold text-foreground">{item.category}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          {item.examples.map((example, exampleIndex) => (
                            <div key={exampleIndex} className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-muted-foreground">{example}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Retention */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-muted/30 to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gradient-to-r from-secondary to-primary text-white">
                <Database className="mr-2 h-4 w-4" />
                Data Retention
              </Badge>
              <h2 className="text-3xl font-bold mb-4">How Long We Keep Your Data</h2>
              <p className="text-muted-foreground">
                We retain your data only as long as necessary for platform functionality or legal compliance.
              </p>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-accent/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">Data Type</th>
                      <th className="text-left p-4 font-semibold">Retention Period</th>
                      <th className="text-left p-4 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {dataRetention.map((item, index) => (
                      <tr key={index} className="hover:bg-accent/20">
                        <td className="p-4 font-medium">{item.type}</td>
                        <td className="p-4 text-primary font-medium">{item.period}</td>
                        <td className="p-4 text-muted-foreground">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact & Rights */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Privacy Rights */}
              <Card className="p-6 lg:p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Eye className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold">Your Privacy Rights</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <div className="font-medium">Right to Access</div>
                        <div className="text-sm text-muted-foreground">View all data we have about you</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <div className="font-medium">Right to Deletion</div>
                        <div className="text-sm text-muted-foreground">Request complete data removal</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <div className="font-medium">Right to Rectification</div>
                        <div className="text-sm text-muted-foreground">Correct inaccurate information</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <div className="font-medium">Right to Portability</div>
                        <div className="text-sm text-muted-foreground">Export your data in standard formats</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Contact Information */}
              <Card className="p-6 lg:p-8 bg-gradient-to-br from-primary/5 to-success/5 border-primary/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold">Privacy Contact</h3>
                  </div>
                  <p className="text-muted-foreground">
                    For privacy concerns, data access requests, or questions about this policy, contact our dedicated privacy team.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="font-medium">privacy@costeclipse.app</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <span className="font-medium">24-48 hour response time</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 pt-4">
                    <Button className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90">
                      <Download className="mr-2 h-4 w-4" />
                      Download Your Data
                    </Button>
                    <Button variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Privacy Team
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Policy Updates */}
            <Card className="mt-8 p-6 lg:p-8 bg-gradient-to-br from-warning/10 to-primary/5 border-warning/20">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">Policy Updates</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this privacy policy from time to time. We will notify you of any material changes 
                    by email and prominently display a notice in the app. Your continued use of CostEclipse after 
                    any policy changes constitutes your acceptance of the updated policy.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}