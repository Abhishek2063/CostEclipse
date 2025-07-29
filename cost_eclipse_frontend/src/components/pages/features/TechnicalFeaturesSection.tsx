import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Globe,
  Smartphone,
  Monitor,
  Shield,
  Key,
  Lock,
  Zap,
  Database,
  Cloud,
  Wifi,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';
import envConfig from '@/config/env_variables';

export function TechnicalFeaturesSection() {
  const technicalSpecs = [
    {
      category: 'Cross-Platform Availability',
      icon: Globe,
      specs: [
        {
          name: 'Progressive Web App (PWA)',
          description: 'Install on any device with native app experience',
          badge: 'Install Anywhere',
          color: 'bg-blue-500',
          features: [
            'Offline functionality',
            'Push notifications',
            'App-like interface',
            'Auto-updates',
          ],
        },
        {
          name: 'Web Browser Support',
          description: 'Works on all modern browsers with full feature set',
          badge: 'Universal Access',
          color: 'bg-green-500',
          features: [
            'Chrome, Firefox, Safari, Edge',
            'Responsive design',
            'Touch optimized',
            'Keyboard shortcuts',
          ],
        },
        {
          name: 'Desktop Application',
          description: 'Native desktop experience powered by Electron',
          badge: 'Coming Soon',
          color: 'bg-purple-500',
          features: [
            'Native menus',
            'System tray integration',
            'File system access',
            'Offline sync',
          ],
        },
      ],
    },
    {
      category: 'Security & Authentication',
      icon: Shield,
      specs: [
        {
          name: 'JWT Token Authentication',
          description: 'Secure, stateless authentication with automatic refresh',
          badge: 'Industry Standard',
          color: 'bg-red-500',
          features: [
            'Secure token storage',
            'Auto-refresh mechanism',
            'Multi-device support',
            'Session management',
          ],
        },
        {
          name: 'HTTPS Encryption',
          description: 'End-to-end encryption for all data transmission',
          badge: 'SSL/TLS',
          color: 'bg-orange-500',
          features: [
            '256-bit encryption',
            'Certificate pinning',
            'HSTS enabled',
            'Perfect forward secrecy',
          ],
        },
        {
          name: 'Bcrypt Password Hashing',
          description: 'Advanced password protection with salted hashing',
          badge: 'Secure Hashing',
          color: 'bg-yellow-500',
          features: [
            'Salt rounds: 12',
            'Rainbow table resistant',
            'Timing attack prevention',
            '2FA support',
          ],
        },
      ],
    },
    {
      category: 'Real-Time Features',
      icon: Zap,
      specs: [
        {
          name: 'Firebase Cloud Messaging',
          description: 'Instant push notifications across all platforms',
          badge: 'Real-Time',
          color: 'bg-indigo-500',
          features: [
            'Cross-platform notifications',
            'Delivery receipts',
            'Topic subscriptions',
            'Offline queuing',
          ],
        },
        {
          name: 'Socket.IO Integration',
          description: 'Live updates for group expenses and shared activities',
          badge: 'Live Updates',
          color: 'bg-pink-500',
          features: [
            'Real-time collaboration',
            'Connection recovery',
            'Room-based messaging',
            'Fallback transport',
          ],
        },
      ],
    },
    {
      category: 'Scalable Backend Infrastructure',
      icon: Database,
      specs: [
        {
          name: 'Node.js Runtime',
          description: 'High-performance server with non-blocking I/O',
          badge: 'High Performance',
          color: 'bg-green-600',
          features: [
            'Event-driven architecture',
            'Microservices ready',
            'Cluster support',
            'Memory efficient',
          ],
        },
        {
          name: 'PostgreSQL Database',
          description: 'Robust relational database with ACID compliance',
          badge: 'Enterprise Grade',
          color: 'bg-blue-600',
          features: ['ACID transactions', 'JSON support', 'Full-text search', 'Horizontal scaling'],
        },
        {
          name: 'Redis Caching',
          description: 'In-memory data structure store for ultra-fast access',
          badge: 'Lightning Fast',
          color: 'bg-red-600',
          features: [
            'Sub-millisecond latency',
            'Data persistence',
            'Pub/Sub messaging',
            'Cluster mode',
          ],
        },
      ],
    },
  ];

  return (
    <section
      id="technical"
      className="py-16 lg:py-24 bg-gradient-to-br from-background via-accent/30 to-primary/5"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary text-white">
            Technical Excellence
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Built with Modern Technology Stack
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade infrastructure meets cutting-edge web technologies for a secure, fast,
            and reliable financial management experience.
          </p>
        </div>

        <div className="space-y-16">
          {technicalSpecs.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <div key={categoryIndex} className="space-y-8">
                {/* Category Header */}
                <div className="flex items-center gap-4 justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                    <CategoryIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{category.category}</h3>
                </div>

                {/* Specs Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.specs.map((spec, specIndex) => (
                    <Card
                      key={specIndex}
                      className="pt-8 pb-6 px-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group overflow-visible"
                    >
                      {/* Top Badge */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <Badge
                          className={`${spec.color} text-white font-medium px-3 py-1 shadow-lg`}
                        >
                          {spec.badge}
                        </Badge>
                      </div>

                      <div className="space-y-6 pt-4">
                        {/* Spec Header */}
                        <div className="text-center space-y-3">
                          <div
                            className={`w-16 h-16 ${spec.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 relative`}
                          >
                            {spec.name.includes('PWA') && (
                              <Smartphone className="h-8 w-8 text-white" />
                            )}
                            {spec.name.includes('Web Browser') && (
                              <Globe className="h-8 w-8 text-white" />
                            )}
                            {spec.name.includes('Desktop') && (
                              <Monitor className="h-8 w-8 text-white" />
                            )}
                            {spec.name.includes('JWT') && <Key className="h-8 w-8 text-white" />}
                            {spec.name.includes('HTTPS') && <Lock className="h-8 w-8 text-white" />}
                            {spec.name.includes('Bcrypt') && (
                              <Shield className="h-8 w-8 text-white" />
                            )}
                            {spec.name.includes('Firebase') && (
                              <Cloud className="h-8 w-8 text-white" />
                            )}
                            {spec.name.includes('Socket.IO') && (
                              <Zap className="h-8 w-8 text-white" />
                            )}
                            {spec.name.includes('Node.js') && (
                              <RefreshCw className="h-8 w-8 text-white" />
                            )}
                            {spec.name.includes('PostgreSQL') && (
                              <Database className="h-8 w-8 text-white" />
                            )}
                            {spec.name.includes('Redis') && <Wifi className="h-8 w-8 text-white" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{spec.name}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {spec.description}
                            </p>
                          </div>
                        </div>

                        {/* Feature List */}
                        <div className="space-y-3">
                          <h5 className="font-medium text-sm text-foreground">Key Features:</h5>
                          <div className="space-y-2">
                            {spec.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-success rounded-full flex-shrink-0"></div>
                                <span className="text-sm text-muted-foreground">{feature}</span>
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

        {/* Compliance & Certifications */}
        <div className="mt-20">
          <Card className="p-8 lg:p-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Security Certifications & Compliance</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Trusted by enterprises and individuals worldwide with industry-standard security
                certifications and compliance frameworks.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-success" />
                </div>
                <div>
                  <div className="font-bold">SOC 2 Type II</div>
                  <div className="text-sm text-muted-foreground">Security & Availability</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="font-bold">GDPR Compliant</div>
                  <div className="text-sm text-muted-foreground">Data Privacy Protection</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="h-8 w-8 text-warning" />
                </div>
                <div>
                  <div className="font-bold">ISO 27001</div>
                  <div className="text-sm text-muted-foreground">Information Security</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Database className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <div className="font-bold">PCI DSS</div>
                  <div className="text-sm text-muted-foreground">Payment Security</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <a
                href={envConfig?.TECHNICAL_DOCUMENTATION_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 group">
                  View Technical Documentation
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
