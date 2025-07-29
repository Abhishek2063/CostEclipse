import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, RefreshCw, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '../home/Logo';
import { Link } from 'react-router-dom';
import { HOME } from '@/constants/app_urls';

interface EmailVerificationScreenProps {
  onResendEmail?: () => void;
  onNavigateToLogin?: () => void;
  isLoading?: boolean;
  userEmail?: string;
}

export function EmailVerificationScreen({
  onResendEmail,
  onNavigateToLogin,
  isLoading = false,
  userEmail = 'your email',
}: EmailVerificationScreenProps) {
  const [emailResent, setEmailResent] = useState(false);

  const handleResendEmail = async () => {
    try {
      if (onResendEmail) {
        await onResendEmail();
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setEmailResent(true);
        toast.success('Verification email sent successfully!');

        // Reset the resent state after 3 seconds
        setTimeout(() => {
          setEmailResent(false);
        }, 3000);
      }
    } catch (error) {
      toast.error('Failed to resend verification email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eclipse-dark via-eclipse-transition to-eclipse-bright flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Email Verification Card */}
        <Card className="p-8 shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          <div className="text-center">
            <Link to={HOME}>
              <Logo className="mx-auto mb-4 cursor-pointer" size="lg" />
            </Link>
          </div>

          {/* Header in Card */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-3">Please Verify Your Email</h1>
            <p className="text-muted-foreground">
              You are almost there! We have sent a verification link to your email address.
            </p>
          </div>

          <div className="text-center space-y-6">
            {/* Email Icon */}
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-10 w-10 text-primary" />
            </div>

            {/* Main Content */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Check Your Email</h2>
              <p className="text-muted-foreground">
                We have sent a verification link to{' '}
                <span className="font-medium text-foreground">{userEmail}</span>
              </p>

              <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-primary">Next Steps:</p>
                    <ol className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>1. Check your email inbox</li>
                      <li>2. Click the verification link</li>
                      <li>3. You will be redirected to login</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Resend Email */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Did not receive the email? Check your spam folder or resend it.
              </p>

              <Button
                onClick={handleResendEmail}
                disabled={isLoading || emailResent}
                variant="outline"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending...
                  </>
                ) : emailResent ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Email Sent!
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend Verification Email
                  </>
                )}
              </Button>
            </div>

            {/* Help Text */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">
                Need help? Contact our support team
              </p>
              <a
                href="mailto:support@costeclipse.com"
                className="text-sm text-primary hover:underline"
              >
                support@costeclipse.com
              </a>
            </div>
          </div>
        </Card>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <div className="bg-background/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20 inline-block">
            <Button
              variant="ghost"
              onClick={onNavigateToLogin}
              className="text-white hover:text-gray-200 hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Login
            </Button>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-4 text-center">
          <div className="bg-background/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
            <p className="text-sm text-white">
              <CheckCircle className="inline h-4 w-4 mr-1" />
              Verification links expire in 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
