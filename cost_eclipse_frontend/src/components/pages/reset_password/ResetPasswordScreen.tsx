import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RotateCcw, Eye, EyeOff, CheckCircle, Shield } from 'lucide-react';
import { toast } from "sonner";
import { Logo } from '../home/Logo';

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordScreenProps {
  onResetPassword?: (data: ResetPasswordFormData) => void;
  onNavigateToLogin?: () => void;
  isLoading?: boolean;
  resetToken?: string;
}

export function ResetPasswordScreen({ 
  onResetPassword, 
  onNavigateToLogin, 
  isLoading = false,
}: ResetPasswordScreenProps) {
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false
  });

  const [passwordReset, setPasswordReset] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('At least 8 characters');
    }
    if (!/(?=.*[0-9])/.test(password)) {
      errors.push('At least 1 number');
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      errors.push('At least 1 special character');
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error('Please fill in all required fields');
      return;
    }

    const passwordErrors = validatePassword(formData.newPassword);
    if (passwordErrors.length > 0) {
      setValidationErrors(passwordErrors);
      toast.error('Password does not meet requirements');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      if (onResetPassword) {
        await onResetPassword(formData);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setPasswordReset(true);
        toast.success('Password reset successfully!');
      }
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eclipse-dark via-eclipse-transition to-eclipse-bright flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo className="mx-auto mb-4" size="lg" />
        </div>

        {/* Reset Password Form */}
        <Card className="p-8 shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          {/* Header in Card */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-3">Reset Your Password</h1>
            <p className="text-muted-foreground">
              Create a new password to regain access to your account.
            </p>
          </div>

          {!passwordReset ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword">
                  New Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <input
                    type={showPasswords.newPassword ? 'text' : 'password'}
                    id="newPassword"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input-background"
                    value={formData.newPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, newPassword: e.target.value });
                      setValidationErrors([]);
                    }}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => togglePasswordVisibility('newPassword')}
                  >
                    {showPasswords.newPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Password Requirements */}
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-muted-foreground">Password must contain:</p>
                  <div className="space-y-1">
                    {['At least 8 characters', 'At least 1 number', 'At least 1 special character'].map((requirement) => {
                      const isValid = !validationErrors.includes(requirement);
                      return (
                        <div key={requirement} className="flex items-center gap-2 text-sm">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            isValid ? 'bg-success text-white' : 'bg-muted'
                          }`}>
                            {isValid && <CheckCircle className="h-3 w-3" />}
                          </div>
                          <span className={isValid ? 'text-success' : 'text-muted-foreground'}>
                            {requirement}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm New Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <input
                    type={showPasswords.confirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input-background"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                  >
                    {showPasswords.confirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      formData.newPassword === formData.confirmPassword ? 'bg-success text-white' : 'bg-destructive text-white'
                    }`}>
                      {formData.newPassword === formData.confirmPassword && <CheckCircle className="h-3 w-3" />}
                    </div>
                    <span className={formData.newPassword === formData.confirmPassword ? 'text-success' : 'text-destructive'}>
                      {formData.newPassword === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                    </span>
                  </div>
                )}
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
                    Resetting Password...
                  </>
                ) : (
                  <>
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Reset Password
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
              <h2 className="text-xl font-semibold text-success">Password Reset Successful!</h2>
              <p className="text-muted-foreground">
                Your password has been successfully updated. You can now log in with your new password.
              </p>
              <div className="pt-4">
                <Button
                  onClick={onNavigateToLogin}
                  className="w-full bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90"
                >
                  Go to Login
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <div className="bg-background/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
            <p className="text-sm text-white">
              <Shield className="inline h-4 w-4 mr-1" />
              Your password is encrypted and secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}