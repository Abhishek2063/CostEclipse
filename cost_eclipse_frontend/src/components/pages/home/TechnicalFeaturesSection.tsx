import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Smartphone, 
  Zap, 
  Cloud,
  Lock,
  Wifi,
  Download,
  RefreshCw,
  CheckCircle,
  Globe,
  Database,
  ArrowRight
} from 'lucide-react';

export function TechnicalFeaturesSection() {
  const technicalFeatures = [
    {
      id: 'pwa',
      icon: Smartphone,
      title: 'Progressive Web App',
      subtitle: 'Native Experience, Web Convenience',
      description: 'Install CostEclipse on any device for a native app experience with the flexibility of the web.',
      badge: 'PWA Ready',
      badgeColor: 'bg-success',
      features: [
        { icon: Download, label: 'Installable on all devices' },
        { icon: Wifi, label: 'Works offline' },
        { icon: Zap, label: 'Lightning fast performance' },
        { icon: RefreshCw, label: 'Automatic updates' }
      ],
      stats: {
        performance: '99/100',
        accessibility: '100/100',
        seo: '98/100'
      }
    },
    {
      id: 'security',
      icon: Shield,
      title: 'Bank-Level Security',
      subtitle: 'Your Data, Completely Protected',
      description: 'Enterprise-grade security with 256-bit encryption, secure cloud sync, and privacy-first design.',
      badge: 'SOC 2 Compliant',
      badgeColor: 'bg-primary',
      features: [
        { icon: Lock, label: '256-bit AES encryption' },
        { icon: Cloud, label: 'Secure cloud backup' },
        { icon: Database, label: 'Zero-knowledge architecture' },
        { icon: Shield, label: 'Two-factor authentication' }
      ],
      stats: {
        uptime: '99.9%',
        encryption: 'AES-256',
        compliance: 'SOC 2'
      }
    },
    {
      id: 'performance',
      icon: Zap,
      title: 'Lightning Performance',
      subtitle: 'Optimized for Speed & Efficiency',
      description: 'Built with modern web technologies for instant loading and smooth interactions across all devices.',
      badge: 'Optimized',
      badgeColor: 'bg-warning',
      features: [
        { icon: Zap, label: 'Sub-second load times' },
        { icon: Globe, label: 'Global CDN delivery' },
        { icon: RefreshCw, label: 'Intelligent caching' },
        { icon: Smartphone, label: 'Mobile-first design' }
      ],
      stats: {
        loadTime: '<1s',
        performance: '98/100',
        mobile: 'Optimized'
      }
    },
    {
      id: 'reliability',
      icon: Cloud,
      title: 'Cloud Infrastructure',
      subtitle: 'Always Available, Always Synced',
      description: 'Powered by enterprise cloud infrastructure with automatic backups and real-time synchronization.',
      badge: '99.9% Uptime',
      badgeColor: 'bg-secondary',
      features: [
        { icon: Cloud, label: 'Auto cloud sync' },
        { icon: Database, label: 'Automatic backups' },
        { icon: Globe, label: 'Multi-region deployment' },
        { icon: CheckCircle, label: 'Data redundancy' }
      ],
      stats: {
        uptime: '99.9%',
        backup: 'Real-time',
        regions: '3+'
      }
    }
  ];

  return (
    <section id="technical" className="py-20 bg-gradient-to-br from-background via-accent/30 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Built with Modern Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade infrastructure meets consumer-friendly design for a secure, fast, and reliable experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technicalFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.id} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative group">
                {/* Feature Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className={`${feature.badgeColor} text-white font-medium px-3 py-1`}>
                    {feature.badge}
                  </Badge>
                </div>

                <div className="space-y-6 pt-4">
                  {/* Icon & Title */}
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{feature.title}</h3>
                      <p className="text-sm text-primary font-medium">{feature.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed text-center">
                    {feature.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3">
                    {feature.features.map((item, index) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <ItemIcon className="h-3 w-3 text-success" />
                          </div>
                          <span className="text-sm">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Stats */}
                  <div className="pt-4 border-t space-y-2">
                    {Object.entries(feature.stats).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="text-xs font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Certifications & Compliance */}
        <div className="mt-16">
          <Card className="p-8 bg-background border-2">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Certifications & Compliance</h3>
              <p className="text-muted-foreground">
                Trusted by enterprises and individuals alike with industry-standard certifications.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-success" />
                </div>
                <div className="font-semibold">SOC 2 Type II</div>
                <div className="text-sm text-muted-foreground">Security compliance</div>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <div className="font-semibold">GDPR Compliant</div>
                <div className="text-sm text-muted-foreground">Privacy protection</div>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="h-8 w-8 text-warning" />
                </div>
                <div className="font-semibold">ISO 27001</div>
                <div className="text-sm text-muted-foreground">Information security</div>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-secondary" />
                </div>
                <div className="font-semibold">PCI DSS</div>
                <div className="text-sm text-muted-foreground">Payment security</div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                View Security Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}