import { useState } from 'react';
import { Logo } from '../../pages/home/Logo';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  HOME,
  FEATURES,
  HOW_IT_WORKS,
  ABOUT_US,
  CONTACT_US,
  LOGIN,
  SIGNUP,
} from '../../../constants/app_urls';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const navItems = [
    { label: 'Home', href: HOME },
    { label: 'Features', href: FEATURES },
    { label: 'How It Works', href: HOW_IT_WORKS },
    { label: 'About', href: ABOUT_US },
    { label: 'Contact', href: CONTACT_US },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to={HOME}>
  <Logo variant="primary" size="lg" animated className="animate-eclipse-reveal" />
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-foreground/80 transition-colors duration-200 font-medium relative group ${
                  isActive(item.href) ? 'text-foreground' : 'hover:text-foreground'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-success transition-all duration-200 ${
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to={LOGIN}>
              <Button variant="ghost" size="sm" className="font-medium">
                Sign In
              </Button>
            </Link>

            <Link to={SIGNUP}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-slate-800 via-primary to-success hover:from-slate-700 hover:via-primary/90 hover:to-success/90 font-medium"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <nav className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`transition-colors duration-200 font-medium py-2 px-2 rounded-lg ${
                    isActive(item.href)
                      ? 'bg-accent text-foreground'
                      : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Link to={LOGIN} onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="justify-start font-medium w-full">
                    Sign In
                  </Button>
                </Link>

                <Link to={SIGNUP} onClick={() => setIsMenuOpen(false)}>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-slate-800 via-primary to-success hover:from-slate-700 hover:via-primary/90 hover:to-success/90 font-medium"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
