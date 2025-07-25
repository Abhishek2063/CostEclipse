import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Zap, 
  BarChart3, 
  Users,
  Lock,
  Heart,
  Globe,
  Smartphone
} from 'lucide-react';

export function WhyChooseSection() {
  const valueProps = [
    {
      icon: Shield,
      title: 'Privacy-First Approach',
      description: 'Your financial data stays yours. We use zero-knowledge architecture and end-to-end encryption.',
      features: ['Bank-level security', 'No data selling', 'GDPR compliant', 'Local data storage option'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Zap,
      title: 'Incredibly Easy to Use',
      description: 'Intuitive design that makes financial management feel effortless, not overwhelming.',
      features: ['One-click expense logging', 'Smart categorization', 'Minimal setup required', 'Natural user flow'],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics That Matter',
      description: 'Actionable insights that help you understand spending patterns and make better financial decisions.',
      features: ['Visual spending trends', 'Predictive analytics', 'Custom reporting', 'Goal progress tracking'],
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: Users,
      title: 'Seamless Expense Sharing',
      description: 'Split bills fairly and settle up automatically without the awkward money conversations.',
      features: ['Smart bill splitting', 'Automatic calculations', 'Multiple payment methods', 'Real-time updates'],
      color: 'from-orange-500 to-red-600'
    }
  ];

  const trustIndicators = [
    {
      icon: Lock,
      metric: '256-bit',
      label: 'Encryption',
      description: 'Military-grade security'
    },
    {
      icon: Heart,
      metric: '96.8%',
      label: 'Satisfaction',
      description: 'User happiness score'
    },
    {
      icon: Globe,
      metric: '99.9%',
      label: 'Uptime',
      description: 'Reliable service'
    },
    {
      icon: Smartphone,
      metric: '75k+',
      label: 'Active Users',
      description: 'Growing community'
    }
  ];

  return (
    <section id="why-choose" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary text-white">
            Why CostEclipse?
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            The Smart Choice for Modern Finance
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join thousands who have transformed their financial lives with a platform 
            that combines powerful features with uncompromising security and simplicity.
          </p>
        </div>

        {/* Main Value Propositions */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <Card key={index} className="p-6 lg:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${prop.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${prop.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{prop.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {prop.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-success rounded-full flex-shrink-0"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <Card className="p-8 lg:p-12 bg-gradient-to-br from-accent/30 to-primary/5 border-2">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Trusted by Users Worldwide</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Numbers that speak to our commitment to security, reliability, and user satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {indicator.metric}
                    </div>
                    <div className="font-semibold text-lg">{indicator.label}</div>
                    <div className="text-sm text-muted-foreground">{indicator.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Feature Comparison */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">How We Compare</h3>
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-4 text-center">
              {/* Header */}
              <div className="p-4 bg-muted/50 font-semibold">Features</div>
              <div className="p-4 bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                CostEclipse
              </div>
              <div className="p-4 bg-muted/50 font-semibold">Traditional Apps</div>
              <div className="p-4 bg-muted/50 font-semibold">Spreadsheets</div>
              
              {/* Rows */}
              {[
                ['Smart Expense Tracking', '✅ AI-Powered', '❌ Manual Only', '❌ Manual Entry'],
                ['Group Expense Management', '✅ Advanced Splitting', '⚠️ Basic Features', '❌ Not Available'],
                ['Real-time Analytics', '✅ Live Insights', '⚠️ Limited Charts', '❌ Static Data'],
                ['Security & Privacy', '✅ Bank-Level', '⚠️ Standard', '❌ No Encryption'],
                ['Cross-Platform Sync', '✅ Instant Sync', '⚠️ Limited', '❌ Manual Export'],
                ['Setup Time', '✅ 2 Minutes', '⚠️ 15+ Minutes', '❌ Hours of Setup']
              ].map((row, index) => (
                <div key={`row-${index}`} className="contents">
                  <div className="p-4 border-t font-medium">{row[0]}</div>
                  <div className="p-4 border-t bg-primary/5 text-success font-medium">{row[1]}</div>
                  <div className="p-4 border-t text-muted-foreground">{row[2]}</div>
                  <div className="p-4 border-t text-muted-foreground">{row[3]}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}