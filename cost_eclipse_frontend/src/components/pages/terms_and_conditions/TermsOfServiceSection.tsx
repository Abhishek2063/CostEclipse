import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  UserCheck, 
  RefreshCw, 
  AlertTriangle,
  Clock,
  Mail,
  Scale,
  Globe,
  CheckCircle
} from 'lucide-react';

export function TermsOfServiceSection() {
  const termsSection = [
    {
      id: 'account',
      icon: UserCheck,
      title: 'Account Responsibilities',
      color: 'from-blue-500 to-cyan-500',
      content: [
        {
          title: 'Accurate Information',
          description: 'You must provide accurate, current, and complete information during registration and keep your account information updated.',
          details: ['Use your real name and valid email address', 'Update profile information when changes occur', 'Provide accurate financial data for proper categorization', 'Notify us of any unauthorized account access']
        },
        {
          title: 'Account Security',
          description: 'You are responsible for maintaining the security of your login credentials and all activities under your account.',
          details: ['Use a strong, unique password', 'Do not share your login credentials', 'Enable two-factor authentication when available', 'Log out from shared or public devices']
        },
        {
          title: 'Age Requirements',
          description: 'You must be at least 18 years old to create an account. Users under 18 may use the service with parental supervision.',
          details: ['Valid age verification may be required', 'Parental consent for users under 18', 'Legal guardian responsibility for minors', 'Account termination if age requirements not met']
        }
      ]
    },
    {
      id: 'usage',
      icon: CheckCircle,
      title: 'Acceptable Use',
      color: 'from-green-500 to-emerald-500',
      content: [
        {
          title: 'Lawful Purposes',
          description: 'Use the platform only for lawful financial tracking purposes and in compliance with all applicable laws.',
          details: ['Track legitimate income and expenses only', 'Comply with tax reporting requirements', 'No money laundering or illegal activities', 'Respect intellectual property rights']
        },
        {
          title: 'Prohibited Activities',
          description: 'Do not attempt to reverse engineer, exploit, or compromise the app infrastructure or other users\' data.',
          details: ['No hacking or unauthorized access attempts', 'No data scraping or automated access', 'No malware or virus distribution', 'No spam or unsolicited communications']
        },
        {
          title: 'Content Guidelines',
          description: 'Any content you upload or share must be appropriate and not violate others\' rights or applicable laws.',
          details: ['No offensive or inappropriate content', 'No copyright infringement', 'No false or misleading information', 'Respect other users\' privacy']
        }
      ]
    },
    {
      id: 'liability',
      icon: Scale,
      title: 'Liability & Disclaimers',
      color: 'from-purple-500 to-violet-500',
      content: [
        {
          title: 'Financial Decisions',
          description: 'CostEclipse is not liable for losses incurred through financial decisions based on app data or recommendations.',
          details: ['App provides informational tools only', 'No investment or financial advice provided', 'Users responsible for their financial decisions', 'Consult professionals for major financial choices']
        },
        {
          title: 'Data Accuracy',
          description: 'Reports and analytics are for informational purposes only. Users are responsible for verifying accuracy.',
          details: ['Double-check important calculations', 'Verify data before making decisions', 'Report any calculation errors promptly', 'Maintain backup records as needed']
        },
        {
          title: 'Service Limitations',
          description: 'We provide the service "as is" without warranties and limit our liability to the extent permitted by law.',
          details: ['No guarantee of service availability', 'No warranty of error-free operation', 'Liability limited to service fees paid', 'Force majeure events excluded']
        }
      ]
    },
    {
      id: 'availability',
      icon: Globe,
      title: 'Service Availability',
      color: 'from-orange-500 to-red-500',
      content: [
        {
          title: 'Uptime Commitment',
          description: 'We strive for 99.9% uptime but do not guarantee uninterrupted access to the service.',
          details: ['Regular monitoring and maintenance', 'Redundant systems for reliability', 'Automatic failover capabilities', 'Performance optimization ongoing']
        },
        {
          title: 'Maintenance Windows',
          description: 'Planned downtime for maintenance will be communicated in advance through email and in-app notifications.',
          details: ['24-48 hours advance notice for planned maintenance', 'Emergency maintenance may occur without notice', 'Maintenance typically during low-usage hours', 'Status updates provided during outages']
        },
        {
          title: 'Service Modifications',
          description: 'We reserve the right to modify, update, or discontinue features with reasonable notice to users.',
          details: ['30 days notice for major feature changes', 'Backward compatibility when possible', 'Migration tools for deprecated features', 'User feedback considered in decisions']
        }
      ]
    }
  ];

  const terminationReasons = [
    'Violation of terms of service',
    'Fraudulent or illegal activity',
    'Abuse of other users or staff',
    'Repeated violations after warnings',
    'Non-payment of premium services',
    'Inactive account (after 2 years)'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-accent/30 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-primary to-success text-white">
              <FileText className="mr-2 h-4 w-4" />
              Terms of Service
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Fair Terms for Everyone
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Welcome to CostEclipse! By using our platform, you agree to these terms. 
              We've made them as clear and fair as possible — here's what you need to know.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Last Updated: July 26, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>Effective: July 26, 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {termsSection.map((section) => {
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
                        <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          {item.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{detail}</span>
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

      {/* Termination Policy */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-muted/30 to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Termination Reasons */}
              <Card className="p-6 lg:p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-warning" />
                    <h3 className="text-xl font-bold">Account Termination</h3>
                  </div>
                  <p className="text-muted-foreground">
                    We reserve the right to suspend or terminate access for users violating these terms. 
                    Common reasons include:
                  </p>
                  <div className="space-y-3">
                    {terminationReasons.map((reason, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{reason}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-warning/10 p-4 rounded-lg border border-warning/20">
                    <p className="text-sm text-muted-foreground">
                      <strong>Fair Warning:</strong> We believe in second chances. Most violations result in 
                      warnings before termination. Serious violations (illegal activity, fraud) may result 
                      in immediate termination.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Appeal Process */}
              <Card className="p-6 lg:p-8 bg-gradient-to-br from-primary/5 to-success/5 border-primary/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Scale className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold">Appeal Process</h3>
                  </div>
                  <p className="text-muted-foreground">
                    If you believe your account was terminated in error, you have the right to appeal our decision.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                      <div>
                        <div className="font-medium">Contact Support</div>
                        <div className="text-sm text-muted-foreground">Email legal@costeclipse.app within 30 days</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                      <div>
                        <div className="font-medium">Provide Evidence</div>
                        <div className="text-sm text-muted-foreground">Include relevant information and documentation</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                      <div>
                        <div className="font-medium">Review Process</div>
                        <div className="text-sm text-muted-foreground">We'll review and respond within 5 business days</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Agreement & Contact */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 lg:p-12 bg-gradient-to-br from-success/5 to-primary/5 border-success/20 text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Agreement Acceptance</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    By continuing to use CostEclipse, you acknowledge that you have read, understood, 
                    and agree to be bound by these terms of service. If you don't agree with any part 
                    of these terms, please discontinue use of our service.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-success to-primary hover:from-success/90 hover:to-primary/90">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Legal Team
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-5 w-5" />
                    Download Terms (PDF)
                  </Button>
                </div>
                <div className="flex justify-center gap-8 text-sm text-muted-foreground pt-6 border-t">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>legal@costeclipse.app</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Response within 2 business days</span>
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