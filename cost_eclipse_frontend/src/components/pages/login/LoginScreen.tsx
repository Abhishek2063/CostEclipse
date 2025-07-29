import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { LogIn, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '../home/Logo';
import { useNavigate } from 'react-router-dom';
import { FORGOT_PASSWORD, HOME, SIGNUP, USER_DASHBOARD } from '@/constants/app_urls';
import { Link } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginScreenProps {
  onLogin?: (data: LoginFormData) => void;
  isLoading?: boolean;
}

export function LoginScreen({
  onLogin,
  isLoading = false,
}: LoginScreenProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (onLogin) {
        await onLogin(formData);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Simulate login validation
        if (formData.email === 'demo@costeclipse.com' && formData.password === 'password') {
          toast.success('Welcome back! Redirecting to dashboard...');
          // Store remember me preference
          if (formData.rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          }
          navigate(USER_DASHBOARD);
        } else {
          setLoginError('Incorrect email or password. Please try again.');
          toast.error('Login failed. Please check your credentials.');
        }
      }
    } catch (error) {
      setLoginError('Incorrect email or password. Please try again.');
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eclipse-dark via-eclipse-transition to-eclipse-bright flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Form */}
        <Card className="p-8 shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          {/* Logo */}
          <div className="text-center">
            <Link to={HOME}>
              <Logo className="mx-auto mb-4 cursor-pointer" size="lg" />
            </Link>
          </div>

          {/* Header in Card */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-3">Welcome Back to CostEclipse</h1>
            <p className="text-muted-foreground">
              Login to view your financial dashboard and stay on top of your income and expenses.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {loginError && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{loginError}</span>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <input
                type="email"
                id="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input-background"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input-background"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, rememberMe: checked as boolean })
                  }
                />
                <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
                  Remember Me
                </Label>
              </div>

              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={() => navigate(FORGOT_PASSWORD)}
              >
                Forgot your password?
              </button>
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
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Login to Dashboard
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Do not have an account?{' '}
              <button
                onClick={() => navigate(SIGNUP)}
                className="text-primary hover:underline font-medium"
              >
                Sign Up
              </button>
            </p>
          </div>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 p-4 bg-[#2a2a2a]/50 backdrop-blur-sm border border-white/20 shadow-md rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">Demo Credentials</span>
          </div>
          <div className="text-sm text-gray-100 space-y-1">
            <p>Email: demo@costeclipse.com</p>
            <p>Password: password</p>
          </div>
        </Card>

        {/* Security Note */}
        <div className="mt-4 text-center">
          <div className="bg-[#2a2a2a]/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20 shadow-sm inline-block">
            <p className="text-sm text-white">
              <Shield className="inline h-4 w-4 mr-1" />
              Your connection is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
