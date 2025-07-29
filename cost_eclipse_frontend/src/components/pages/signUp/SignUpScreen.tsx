import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { UserPlus, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '../home/Logo';
import { Link } from 'react-router-dom';
import { HOME, LOGIN, PRIVACY_POLICY, TERMS_AND_CONDITIONS } from '@/constants/app_urls';

const OCCUPATION_OPTIONS = [
  { value: 'salaried', label: 'Salaried Professional' },
  { value: 'business', label: 'Business Owner' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'student', label: 'Student' },
  { value: 'other', label: 'Other' },
];

interface SignUpFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  occupation: string;
  monthlyIncome: number;
  monthlySavingGoal: number;
  agreeToTerms: boolean;
}

interface SignUpScreenProps {
  onSignUp?: (data: SignUpFormData) => void;
  isLoading?: boolean;
}

export function SignUpScreen({
  onSignUp,
  isLoading = false,
}: SignUpScreenProps) {
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    occupation: '',
    monthlyIncome: 0,
    monthlySavingGoal: 0,
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (data: any) => {
    if (!data.agreeToTerms) {
      toast.error('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    try {
      if (onSignUp) {
        await onSignUp(data);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast.success('Account created successfully! Please verify your email to continue.');
      }
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eclipse-dark via-eclipse-transition to-eclipse-bright flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Sign Up Form */}
        <Card className="p-8 shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          {/* Logo */}
          <div className="text-center">
            <Link to={HOME}>
              <Logo className="mx-auto mb-4 cursor-pointer" size="lg" />
            </Link>
          </div>

          {/* Header in Card */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Create Your CostEclipse Account
            </h1>
            <p className="text-muted-foreground">
              Take control of your finances today. Sign up to track income, manage expenses, and
              plan smart budgets.
            </p>
          </div>

          <form className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <input
                type="text"
                id="fullName"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input-background"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

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

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (optional)</Label>
              <input
                type="tel"
                id="phone"
                placeholder="+1 555 0123 456"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input-background"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
              <p className="text-sm text-muted-foreground">
                Minimum 8 characters, with at least 1 number & special character.
              </p>
            </div>

            {/* Occupation Type */}
            <div className="space-y-2">
              <Label htmlFor="occupation">
                Occupation Type <span className="text-destructive">*</span>
              </Label>
              <select
                id="occupation"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input-background"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                required
              >
                <option value="">Select your occupation</option>
                {OCCUPATION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Monthly Income */}
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Monthly Income (optional)</Label>
              <input
                type="number"
                id="monthlyIncome"
                placeholder="e.g. $3000"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input-background"
                value={formData.monthlyIncome || ''}
                onChange={(e) =>
                  setFormData({ ...formData, monthlyIncome: parseFloat(e.target.value) || 0 })
                }
                min="0"
              />
            </div>

            {/* Monthly Saving Goal */}
            <div className="space-y-2">
              <Label htmlFor="monthlySavingGoal">Monthly Saving Goal (optional)</Label>
              <input
                type="number"
                id="monthlySavingGoal"
                placeholder="e.g. $500"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input-background"
                value={formData.monthlySavingGoal || ''}
                onChange={(e) =>
                  setFormData({ ...formData, monthlySavingGoal: parseFloat(e.target.value) || 0 })
                }
                min="0"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, agreeToTerms: checked as boolean })
                }
              />
              <Label htmlFor="agreeToTerms" className="text-sm cursor-pointer">
                I agree to the{' '}
                <Link to={TERMS_AND_CONDITIONS} className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to={PRIVACY_POLICY} className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 text-white font-semibold"
              disabled={isLoading || !formData.agreeToTerms}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(formData);
              }}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create Account
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to={LOGIN} className="text-primary hover:underline font-medium">
                Log in here
              </Link>
            </p>
          </div>
        </Card>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <div className="bg-gray-100 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-300 shadow-md">
            <p className="text-sm text-gray-700">
              <CheckCircle className="inline h-4 w-4 mr-1 text-green-600" />
              Your data is encrypted and secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
