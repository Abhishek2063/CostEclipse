import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '../home/Logo';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HOME, LOGIN } from '@/constants/app_urls';

interface ForgotPasswordScreenProps {
  onSendResetLink?: (email: string) => void;
  isLoading?: boolean;
}

export function ForgotPasswordScreen({
  onSendResetLink,
  isLoading = false,
}: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      if (onSendResetLink) {
        await onSendResetLink(email);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setEmailSent(true);
        toast.success('Reset link sent to your email!');
      }
    } catch (error) {
      toast.error('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eclipse-dark via-eclipse-transition to-eclipse-bright flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Forgot Password Form */}
        <Card className="p-8 shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          {/* Logo */}
          <div className="text-center">
             <Link to={HOME}>
              <Logo className="mx-auto mb-4 cursor-pointer" size="lg" />
            </Link>
          </div>

          {/* Header in Card */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-3">Forgot Your Password?</h1>
            <p className="text-muted-foreground">
              No worries — enter your email, and we will send you a password reset link.
            </p>
          </div>

          {!emailSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input-background"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                    Sending Reset Link...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Reset Link
                  </>
                )}
              </Button>
            </form>
          ) : (
            /* Success Message */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-xl font-semibold text-success">Reset Link Sent!</h2>
              <p className="text-muted-foreground">
                We have sent a reset link to <strong>{email}</strong>. Please check your inbox and
                follow the instructions to reset your password.
              </p>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Did not receive the email? Check your spam folder or try again.
                </p>
                <Button variant="outline" onClick={() => setEmailSent(false)} className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Resend Reset Link
                </Button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Remembered it?{' '}
              <button
                 onClick={() => navigate(LOGIN)}
                className="text-primary hover:underline font-medium"
              >
                Back to Login
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
