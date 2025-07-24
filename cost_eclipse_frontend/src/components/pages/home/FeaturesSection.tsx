import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target, 
  Camera, 
  Bell,
  BarChart3,
  Shield,
  Smartphone,
  Zap
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: DollarSign,
      title: 'Smart Expense Tracking',
      description: 'Automatically categorize expenses with AI-powered recognition. Snap photos of receipts for instant logging.',
      badge: 'Popular',
      color: 'text-success'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Get deep insights into your spending patterns with interactive charts and trend analysis.',
      badge: 'New',
      color: 'text-primary'
    },
    {
      icon: Users,
      title: 'Group Expense Management',
      description: 'Split bills effortlessly, track shared expenses, and settle up with friends automatically.',
      badge: null,
      color: 'text-secondary'
    },
    {
      icon: Target,
      title: 'Savings Goals',
      description: 'Set personalized savings targets and track progress with motivational milestones.',
      badge: null,
      color: 'text-warning'
    },
    {
      icon: Camera,
      title: 'Receipt Scanning',
      description: 'Scan receipts instantly with OCR technology. Never lose track of expenses again.',
      badge: null,
      color: 'text-primary'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Get timely alerts for budget limits, bill reminders, and goal achievements.',
      badge: null,
      color: 'text-error'
    }
  ];

  const techFeatures = [
    {
      icon: BarChart3,
      title: 'Real-time Dashboard',
      description: 'Monitor your financial health with live updates and customizable widgets.'
    },
    {
      icon: Shield,
      title: 'Bank-level Security',
      description: '256-bit encryption and secure cloud sync keep your data protected.'
    },
    {
      icon: Smartphone,
      title: 'Progressive Web App',
      description: 'Works seamlessly across all devices with offline capabilities.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance ensures smooth experience even with large datasets.'
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Everything You Need to Master Your Money
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to simplify financial management for individuals and groups.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative group">
                {feature.badge && (
                  <Badge 
                    className={`absolute -top-2 -right-2 ${
                      feature.badge === 'Popular' ? 'bg-success' : 'bg-primary'
                    }`}
                  >
                    {feature.badge}
                  </Badge>
                )}
                
                <div className="mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Technical Features */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Built for Performance & Security</h3>
            <p className="text-muted-foreground">
              Enterprise-grade technology that scales with your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}