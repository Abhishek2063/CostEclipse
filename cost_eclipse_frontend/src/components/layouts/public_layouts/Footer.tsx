import { Logo } from '../../pages/home/Logo';
import { Separator } from '@/components/ui/separator';
import { Twitter, Facebook, Instagram, Linkedin, Github, Mail, MapPin, Phone } from 'lucide-react';
import {
  HOME,
  FEATURES,
  HOW_IT_WORKS,
  ABOUT_US,
  CONTACT_US,
  COOKIES_POLICY,
  FAQ,
  PRIVACY_POLICY,
  TERMS_AND_CONDITIONS,
} from '../../../constants/app_urls';
import { Link } from 'react-router-dom';
import envConfig from '@/config/env_variables';

export function Footer() {
  const companyLinks = [
    { label: 'Home', to: HOME },
    { label: 'About Us', to: ABOUT_US },
  ];

  const productLinks = [
    { label: 'Features', to: FEATURES },
    { label: 'How It Works', to: HOW_IT_WORKS },
  ];

  const supportLinks = [
    { label: 'Contact Us', to: CONTACT_US },
    { label: 'FAQ', to: FAQ },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', to: PRIVACY_POLICY },
    { label: 'Terms of Service', to: TERMS_AND_CONDITIONS },
    { label: 'Cookie Policy', to: COOKIES_POLICY },
  ];

  const socialLinks = [
    { icon: Twitter, href: envConfig.TWITTER_LINK, label: 'Twitter' },
    { icon: Facebook, href: envConfig.FACEBOOK_LINK, label: 'Facebook' },
    { icon: Instagram, href: envConfig.INSTAGRAM_LINK, label: 'Instagram' },
    { icon: Linkedin, href: envConfig.LINKEDIN_LINK, label: 'LinkedIn' },
    { icon: Github, href: envConfig.GITHUB_LINK, label: 'GitHub' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Company Info & Newsletter */}
            <div className="lg:col-span-2 space-y-6">
              <Link to={HOME}>
                <Logo variant="primary" size="lg" className="cursor-pointer" />
              </Link>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                CostEclipse helps individuals and groups take control of their finances with
                intelligent tracking, seamless collaboration, and actionable insights.
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
                  <span>{envConfig?.LOCATION}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{envConfig?.CONTACT_NUMBER}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{envConfig?.EMAIL}</span>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
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
              © {currentYear} CostEclipse. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
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
