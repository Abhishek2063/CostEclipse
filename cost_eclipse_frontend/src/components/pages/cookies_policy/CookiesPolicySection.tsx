import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Cookie, 
  Shield, 
  BarChart3, 
  Settings,
  Info,
  CheckCircle,
  XCircle,
  Mail,
  Wrench
} from 'lucide-react';

export function CookiesPolicySection() {
  const cookieTypes = [
    {
      id: 'essential',
      title: 'Essential Cookies',
      description: 'Required for login, secure areas, and basic functionality of the application.',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      required: true,
      examples: [
        'Authentication tokens',
        'Session management',
        'Security preferences',
        'Form data temporarily stored'
      ],
      details: 'These cookies are absolutely necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt out of these cookies.'
    },
    {
      id: 'analytical',
      title: 'Analytical Cookies',
      description: 'Help us understand how users interact with the platform to improve performance.',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      required: false,
      examples: [
        'Page views and navigation patterns',
        'Feature usage statistics',
        'Performance monitoring',
        'Error tracking and debugging'
      ],
      details: 'These cookies collect information about how you use our website, such as which pages you visit most often and if you get error messages. This helps us improve our service and user experience.'
    },
    {
      id: 'preference',
      title: 'Preference Cookies',
      description: 'Store user settings and interface choices for a personalized experience.',
      icon: Settings,
      color: 'from-purple-500 to-violet-500',
      required: false,
      examples: [
        'Dark/light mode preference',
        'Language settings',
        'Dashboard layout choices',
        'Notification preferences'
      ],
      details: 'These cookies remember your preferences and settings to provide you with a personalized experience. They help us remember your choices so you don\'t have to set them again.'
    }
  ];

  const thirdPartyServices = [
    {
      service: 'Firebase Analytics',
      purpose: 'User behavior analytics and crash reporting',
      dataShared: 'Anonymous usage statistics',
      optOut: 'Via cookie preferences'
    },
    {
      service: 'PostgreSQL',
      purpose: 'Primary database for application data',
      dataShared: 'Essential user and financial data',
      optOut: 'Cannot opt out (essential service)'
    },
    {
      service: 'Redis',
      purpose: 'Session management and caching',
      dataShared: 'Session tokens and temporary data',
      optOut: 'Cannot opt out (essential service)'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-accent/30 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-primary to-success text-white">
              <Cookie className="mr-2 h-4 w-4" />
              Cookies Policy
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Understanding Our Cookie Usage
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              CostEclipse uses cookies and similar technologies to improve your experience, 
              analyze usage, and personalize content. Here's everything you need to know about our cookie practices.
            </p>
          </div>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 lg:p-12 bg-gradient-to-br from-accent/30 to-primary/5 border-2">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Info className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">What Are Cookies?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Cookies are small text files stored on your device when you visit our website. 
                    They help websites remember user preferences, session information, and enable various 
                    functionalities that make your browsing experience smoother and more personalized.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-start gap-3 p-4 bg-background/60 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Small & Secure</div>
                        <div className="text-sm text-muted-foreground">Tiny files that don't harm your device</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-background/60 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Improve Experience</div>
                        <div className="text-sm text-muted-foreground">Remember your preferences and settings</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-muted/30 to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Types of Cookies We Use</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We use different types of cookies for various purposes. You can control most of these 
                through your browser settings or our cookie preferences.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {cookieTypes.map((cookieType) => {
                const Icon = cookieType.icon;
                return (
                  <Card key={cookieType.id} className="overflow-hidden">
                    {/* Header */}
                    <div className={`p-6 bg-gradient-to-r ${cookieType.color} text-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <Icon className="h-8 w-8" />
                        {cookieType.required ? (
                          <Badge className="bg-white/20 text-white">Required</Badge>
                        ) : (
                          <Badge className="bg-white/20 text-white">Optional</Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{cookieType.title}</h3>
                      <p className="text-white/90 text-sm">{cookieType.description}</p>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                      {/* Examples */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Examples:</h4>
                        <div className="space-y-2">
                          {cookieType.examples.map((example, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{example}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="bg-accent/30 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {cookieType.details}
                        </p>
                      </div>

                      {/* Control */}
                      <div className="flex items-center justify-between p-4 bg-background/60 rounded-lg">
                        <span className="font-medium text-sm">
                          {cookieType.required ? 'Always Active' : 'Enable Cookies'}
                        </span>
                        {cookieType.required ? (
                          <XCircle className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <Switch defaultChecked />
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Third Party Services */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We work with trusted third-party services to provide you with the best experience. 
                Here's what data we share and why.
              </p>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-accent/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">Service</th>
                      <th className="text-left p-4 font-semibold">Purpose</th>
                      <th className="text-left p-4 font-semibold">Data Shared</th>
                      <th className="text-left p-4 font-semibold">Opt-Out Option</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {thirdPartyServices.map((service, index) => (
                      <tr key={index} className="hover:bg-accent/20">
                        <td className="p-4 font-medium">{service.service}</td>
                        <td className="p-4 text-muted-foreground">{service.purpose}</td>
                        <td className="p-4 text-muted-foreground">{service.dataShared}</td>
                        <td className="p-4">
                          <Badge 
                            variant={service.optOut.includes('Cannot') ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {service.optOut}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Managing Cookies */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-muted/30 to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Browser Controls */}
              <Card className="p-6 lg:p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Wrench className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold">Managing Cookies</h3>
                  </div>
                  <p className="text-muted-foreground">
                    You can control cookies through your browser settings or our cookie preferences panel. 
                    Disabling essential cookies may affect functionality.
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 bg-accent/30 rounded-lg">
                      <h4 className="font-medium mb-2">Browser Settings</h4>
                      <p className="text-sm text-muted-foreground">
                        Most browsers allow you to view, delete, and block cookies through their settings menu. 
                        Look for "Privacy" or "Cookies" in your browser preferences.
                      </p>
                    </div>
                    <div className="p-4 bg-accent/30 rounded-lg">
                      <h4 className="font-medium mb-2">Our Cookie Preferences</h4>
                      <p className="text-sm text-muted-foreground">
                        Use our cookie preference center to control optional cookies while keeping 
                        essential functionality intact.
                      </p>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90">
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Cookie Preferences
                  </Button>
                </div>
              </Card>

              {/* Contact */}
              <Card className="p-6 lg:p-8 bg-gradient-to-br from-primary/5 to-success/5 border-primary/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold">Questions About Cookies?</h3>
                  </div>
                  <p className="text-muted-foreground">
                    If you have questions about our cookie practices or need help managing your preferences, 
                    our support team is here to help.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="font-medium">cookies@costeclipse.app</span>
                    </div>
                    <div className="bg-success/10 p-4 rounded-lg border border-success/20">
                      <p className="text-sm text-muted-foreground">
                        <strong>Quick Response:</strong> We typically respond to cookie-related questions 
                        within 24 hours. For urgent privacy concerns, use our live chat feature.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" className="w-full">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Cookie Team
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Full Privacy Policy
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Notice */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-warning/10 to-primary/5 border-warning/20">
              <div className="flex items-start gap-4">
                <Cookie className="h-8 w-8 text-warning flex-shrink-0 mt-1" />
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Cookie Consent</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By continuing to use CostEclipse, you consent to our use of essential cookies. 
                    You can manage optional cookies through your browser settings or our preference center. 
                    We'll remember your choices and respect your privacy preferences.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-gradient-to-r from-success to-primary hover:from-success/90 hover:to-primary/90">
                      Accept All Cookies
                    </Button>
                    <Button variant="outline">
                      Customize Preferences
                    </Button>
                    <Button variant="outline">
                      Essential Only
                    </Button>
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