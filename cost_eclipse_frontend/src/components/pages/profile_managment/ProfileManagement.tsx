import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { 
  User,
  Mail,
  Phone,
  Briefcase,
  DollarSign,
  Target,
  Settings,
  Bell,
  Moon,
  Sun,
  Shield,
  Camera,
  Eye,
  EyeOff,
  Save,
  Upload,
  Globe,
  Palette
} from 'lucide-react';
import { toast } from "sonner";
import { simulateApiCall } from '@/components/utils/managementUtils';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  occupation: string;
  monthlyIncome: number;
  monthlySavingGoal: number;
  currency: string;
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    budgetAlerts: boolean;
    expenseReminders: boolean;
    savingGoalUpdates: boolean;
  };
}

const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
];

const occupationTypes = [
  'Software Engineer',
  'Business Owner',
  'Manager',
  'Consultant',
  'Teacher',
  'Doctor',
  'Lawyer',
  'Designer',
  'Marketer',
  'Sales Professional',
  'Student',
  'Freelancer',
  'Other'
];

export function ProfileManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // User profile state
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    profilePicture: '',
    occupation: 'Software Engineer',
    monthlyIncome: 75000,
    monthlySavingGoal: 15000,
    currency: 'INR',
    theme: 'system',
    notifications: {
      email: true,
      push: true,
      budgetAlerts: true,
      expenseReminders: false,
      savingGoalUpdates: true
    }
  });

  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = async (section: string) => {
    setIsLoading(true);
    toast.loading(`Updating ${section}...`);
    
    await simulateApiCall(800);
    
    setIsLoading(false);
    toast.success(`${section} updated successfully!`);
  };

  const handlePasswordChange = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    toast.loading('Changing password...');
    
    await simulateApiCall(1200);
    
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    setIsLoading(false);
    toast.success('Password changed successfully!');
  };

  const handleProfilePictureUpload = async () => {
    setIsLoading(true);
    toast.loading('Uploading profile picture...');
    
    await simulateApiCall(1000);
    
    setProfile({
      ...profile,
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    });
    
    setIsLoading(false);
    toast.success('Profile picture updated successfully!');
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setProfile({ ...profile, theme });
    
    // Apply theme logic here
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System theme - check user's preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    toast.success(`Theme changed to ${theme}`);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Profile Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your personal information, preferences, and account settings
          </p>
        </div>
        <Badge variant="outline" className="w-fit">
          <Shield className="mr-2 h-4 w-4" />
          Account Verified
        </Badge>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Financial</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <p className="text-sm text-muted-foreground">Update your personal details and profile picture</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    {profile.profilePicture ? (
                      <img 
                        src={profile.profilePicture} 
                        alt="Profile" 
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    onClick={handleProfilePictureUpload}
                    disabled={isLoading}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Profile Picture</h4>
                  <p className="text-sm text-muted-foreground">
                    Upload a profile picture to personalize your account. JPG, PNG up to 5MB.
                  </p>
                  <Button variant="outline" size="sm" onClick={handleProfilePictureUpload} disabled={isLoading}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Picture
                  </Button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                    <Select value={profile.occupation} onValueChange={(value) => setProfile({ ...profile, occupation: value })}>
                      <SelectTrigger className="pl-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {occupationTypes.map(occupation => (
                          <SelectItem key={occupation} value={occupation}>
                            {occupation}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleProfileUpdate('personal information')} disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Financial Information */}
        <TabsContent value="financial">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Financial Information</h3>
                <p className="text-sm text-muted-foreground">Set your income and saving goals for better financial tracking</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthly-income">Monthly Income</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="monthly-income"
                      type="number"
                      value={profile.monthlyIncome}
                      onChange={(e) => setProfile({ ...profile, monthlyIncome: parseFloat(e.target.value) || 0 })}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Your approximate monthly income after taxes</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="saving-goal">Monthly Saving Goal</Label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="saving-goal"
                      type="number"
                      value={profile.monthlySavingGoal}
                      onChange={(e) => setProfile({ ...profile, monthlySavingGoal: parseFloat(e.target.value) || 0 })}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">How much you aim to save each month</p>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-accent/30 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">₹{profile.monthlyIncome.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Monthly Income</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">₹{profile.monthlySavingGoal.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Saving Goal</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary">
                    {profile.monthlyIncome > 0 ? ((profile.monthlySavingGoal / profile.monthlyIncome) * 100).toFixed(1) : 0}%
                  </p>
                  <p className="text-sm text-muted-foreground">Saving Rate</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleProfileUpdate('financial information')} disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences">
          <div className="space-y-6">
            {/* Theme Settings */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Theme Preferences</h3>
                  <p className="text-sm text-muted-foreground">Customize your visual experience</p>
                </div>
                <Palette className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    profile.theme === 'light' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleThemeChange('light')}
                >
                  <div className="flex items-center gap-3">
                    <Sun className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Light</p>
                      <p className="text-sm text-muted-foreground">Bright and clean interface</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    profile.theme === 'dark' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleThemeChange('dark')}
                >
                  <div className="flex items-center gap-3">
                    <Moon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Dark</p>
                      <p className="text-sm text-muted-foreground">Easy on the eyes</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    profile.theme === 'system' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleThemeChange('system')}
                >
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5" />
                    <div>
                      <p className="font-medium">System</p>
                      <p className="text-sm text-muted-foreground">Follow device setting</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Currency Settings */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Currency Preference</h3>
                  <p className="text-sm text-muted-foreground">Select your preferred currency for all transactions</p>
                </div>
                <Globe className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Primary Currency</Label>
                    <Select value={profile.currency} onValueChange={(value) => setProfile({ ...profile, currency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map(currency => (
                          <SelectItem key={currency.code} value={currency.code}>
                            <div className="flex items-center gap-2">
                              <span className="font-mono">{currency.symbol}</span>
                              <span>{currency.name} ({currency.code})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleProfileUpdate('currency preference')} disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Notification Preferences</h3>
                  <p className="text-sm text-muted-foreground">Choose what notifications you want to receive</p>
                </div>
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={profile.notifications.email}
                    onCheckedChange={(checked) => 
                      setProfile({
                        ...profile,
                        notifications: { ...profile.notifications, email: checked }
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                  </div>
                  <Switch
                    checked={profile.notifications.push}
                    onCheckedChange={(checked) => 
                      setProfile({
                        ...profile,
                        notifications: { ...profile.notifications, push: checked }
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Budget Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified when approaching budget limits</p>
                  </div>
                  <Switch
                    checked={profile.notifications.budgetAlerts}
                    onCheckedChange={(checked) => 
                      setProfile({
                        ...profile,
                        notifications: { ...profile.notifications, budgetAlerts: checked }
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Expense Reminders</p>
                    <p className="text-sm text-muted-foreground">Reminders to log your daily expenses</p>
                  </div>
                  <Switch
                    checked={profile.notifications.expenseReminders}
                    onCheckedChange={(checked) => 
                      setProfile({
                        ...profile,
                        notifications: { ...profile.notifications, expenseReminders: checked }
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Saving Goal Updates</p>
                    <p className="text-sm text-muted-foreground">Updates on your saving goal progress</p>
                  </div>
                  <Switch
                    checked={profile.notifications.savingGoalUpdates}
                    onCheckedChange={(checked) => 
                      setProfile({
                        ...profile,
                        notifications: { ...profile.notifications, savingGoalUpdates: checked }
                      })
                    }
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleProfileUpdate('notification preferences')} disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Change Password</h3>
                <p className="text-sm text-muted-foreground">Update your password to keep your account secure</p>
              </div>
              <Shield className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handlePasswordChange} disabled={isLoading} className="w-full">
                  <Shield className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}