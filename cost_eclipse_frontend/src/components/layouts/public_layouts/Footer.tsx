import { Logo } from '../../pages/home/Logo';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Github,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

export function Footer() {
  const companyLinks = [
    { label: 'About Us', href: '#about' },
    // { label: 'Careers', href: '#careers' },
    // { label: 'Press', href: '#press' },
    // { label: 'Blog', href: '#blog' }
  ];

  const productLinks = [
    { label: 'Features', href: '#features' },
    // { label: 'Pricing', href: '#pricing' },
    { label: 'API', href: '#api' },
    // { label: 'Integrations', href: '#integrations' }
  ];

  const supportLinks = [
    // { label: 'Help Center', href: '#help' },
    { label: 'Contact Us', href: '#contact' },
    // { label: 'Community', href: '#community' },
    // { label: 'Status', href: '#status' }
    { label: 'FAQ', href: '#faq' }

  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Cookie Policy', href: '#cookies' },
    { label: 'Security', href: '#security' }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Company Info & Newsletter */}
            <div className="lg:col-span-2 space-y-6">
              <Logo variant="primary" size="lg" />
              <p className="text-muted-foreground leading-relaxed max-w-md">
                CostEclipse helps individuals and groups take control of their finances with intelligent tracking, seamless collaboration, and actionable insights.
              </p>

              {/* Newsletter Signup */}
              {/* <div>
                <h4 className="font-semibold mb-3">Stay Updated</h4>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter your email" 
                    className="bg-background"
                  />
                  <Button className="bg-primary hover:bg-primary/90">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Get the latest updates and financial tips. Unsubscribe anytime.
                </p>
              </div> */}

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>hello@costeclipse.com</span>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © 2024 CostEclipse. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}