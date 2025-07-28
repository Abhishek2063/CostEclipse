import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Rocket, Clock, Mail, CheckCircle, Bell, Star, Zap } from 'lucide-react';
import { toast } from "sonner";
import { Logo } from './home/Logo';

interface ComingSoonPageProps {
  title?: string;
  description?: string;
  launchDate?: string;
  onNotifyMe?: (email: string) => void;
  onNavigateHome?: () => void;
  features?: string[];
}

export function ComingSoonPage({
  title = 'Something Amazing is Coming',
  description = 'We are working hard to bring you new features that will revolutionize your financial management experience.',
  launchDate,
  onNotifyMe,
  onNavigateHome,
  features = [
    'Advanced Analytics Dashboard',
    'AI-Powered Insights',
    'Smart Budget Recommendations',
    'Real-time Collaboration'
  ]
}: ComingSoonPageProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNotifyMe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      if (onNotifyMe) {
        await onNotifyMe(email);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubscribed(true);
        toast.success('You will be notified when we launch!');
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTimeLeft = () => {
    if (!launchDate) return null;

    const difference = new Date(launchDate).getTime() - new Date().getTime();
    
    if (difference <= 0) return null;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  const timeLeft = calculateTimeLeft();

  return (
    <div className="min-h-screen bg-gradient-to-br from-eclipse-dark via-eclipse-transition to-eclipse-bright flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo className="mx-auto mb-4" size="lg" />
        </div>

        {/* Main Card */}
        <Card className="p-8 sm:p-12 shadow-2xl border-0 text-center">
          <div className="space-y-8">
            {/* Rocket Icon */}
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Rocket className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-warning rounded-full flex items-center justify-center">
                <Zap className="h-3 w-3 text-white" />
              </div>
            </div>

            {/* Title and Description */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{title}</h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                {description}
              </p>
            </div>

            {/* Countdown Timer */}
            {timeLeft && (
              <div className="bg-accent/50 rounded-lg p-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">Launch Countdown</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">{timeLeft.days}</div>
                    <div className="text-sm text-muted-foreground">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">{timeLeft.hours}</div>
                    <div className="text-sm text-muted-foreground">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">{timeLeft.minutes}</div>
                    <div className="text-sm text-muted-foreground">Minutes</div>
                  </div>
                </div>
              </div>
            )}

            {/* Features Preview */}
            <div className="bg-gradient-to-r from-primary/5 to-success/5 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">What is Coming:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Subscription */}
            {!subscribed ? (
              <form onSubmit={handleNotifyMe} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="sr-only">Email Address</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 whitespace-nowrap"
                    >
                      {isLoading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Bell className="mr-2 h-4 w-4" />
                          Notify Me
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Be the first to know when we launch. No spam, we promise!
                </p>
              </form>
            ) : (
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">You are all set!</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  We will notify you at <strong>{email}</strong> when we launch.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={onNavigateHome}
                variant="outline"
                className="flex-1"
              >
                <Mail className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <Button
                onClick={() => window.open('https://twitter.com/costeclipse', '_blank')}
                variant="outline"
                className="flex-1"
              >
                Follow Updates
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-200">
            © 2024 CostEclipse. Building the future of financial management.
          </p>
        </div>
      </div>
    </div>
  );
}