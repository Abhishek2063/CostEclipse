import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Users,
  UserCheck,
  TrendingUp,
  TrendingDown,
  Globe,
  DollarSign,
  Target,
  PieChart,
  Clock,
  Star,
  Shield,
  AlertTriangle,
  Eye,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  MapPin,
  Activity,
  Zap,
  Lock,
  UserX,
  Ban,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { toast } from 'sonner';

export function SuperAdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for analytics
  const platformStats = {
    totalUsers: 15420,
    activeThisWeek: 8250,
    monthlySignups: 1280,
    topLocations: [
      { country: 'India', users: 6500, flag: '🇮🇳', growth: 12.5 },
      { country: 'United States', users: 3200, flag: '🇺🇸', growth: 8.2 },
      { country: 'United Kingdom', users: 2100, flag: '🇬🇧', growth: 15.1 },
      { country: 'Canada', users: 1800, flag: '🇨🇦', growth: 6.8 },
      { country: 'Australia', users: 1820, flag: '🇦🇺', growth: 11.3 }
    ]
  };

  const signupTrendData = [
    { month: 'Jul', signups: 850 },
    { month: 'Aug', signups: 920 },
    { month: 'Sep', signups: 1100 },
    { month: 'Oct', signups: 1050 },
    { month: 'Nov', signups: 1200 },
    { month: 'Dec', signups: 1280 },
  ];

  const financialStats = {
    aggregateIncome: 12500000,
    aggregateExpenses: 8750000,
    avgMonthlyBudget: 35000,
    topExpenseCategories: [
      { name: 'Food & Dining', value: 2850000, color: '#4f46e5', percentage: 32.6 },
      { name: 'Transportation', value: 1920000, color: '#7c3aed', percentage: 21.9 },
      { name: 'Entertainment', value: 1480000, color: '#10b981', percentage: 16.9 },
      { name: 'Shopping', value: 1250000, color: '#f59e0b', percentage: 14.3 },
      { name: 'Bills & Utilities', value: 1250000, color: '#ef4444', percentage: 14.3 }
    ]
  };

  const userBehaviorData = {
    activeHours: [
      { hour: '00', users: 120 }, { hour: '01', users: 80 }, { hour: '02', users: 45 },
      { hour: '03', users: 30 }, { hour: '04', users: 25 }, { hour: '05', users: 35 },
      { hour: '06', users: 180 }, { hour: '07', users: 420 }, { hour: '08', users: 680 },
      { hour: '09', users: 850 }, { hour: '10', users: 920 }, { hour: '11', users: 980 },
      { hour: '12', users: 1200 }, { hour: '13', users: 1100 }, { hour: '14', users: 950 },
      { hour: '15', users: 980 }, { hour: '16', users: 850 }, { hour: '17', users: 720 },
      { hour: '18', users: 680 }, { hour: '19', users: 520 }, { hour: '20', users: 420 },
      { hour: '21', users: 350 }, { hour: '22', users: 280 }, { hour: '23', users: 180 }
    ],
    topFeatures: [
      { feature: 'Expense Tracking', usage: 95.2, trend: 'up' },
      { feature: 'Budget Management', usage: 87.8, trend: 'up' },
      { feature: 'Group Expenses', usage: 72.4, trend: 'down' },
      { feature: 'Reports & Analytics', usage: 68.9, trend: 'up' },
      { feature: 'Income Tracking', usage: 64.3, trend: 'down' }
    ],
    retentionRates: {
      newUsers: 78.5,
      returningUsers: 89.2,
      weeklyRetention: 65.8,
      monthlyRetention: 42.3
    }
  };

  const securityData = {
    loginAttempts: [
      { date: 'Dec 20', successful: 1250, failed: 45 },
      { date: 'Dec 21', successful: 1380, failed: 52 },
      { date: 'Dec 22', successful: 1420, failed: 38 },
      { date: 'Dec 23', successful: 1650, failed: 28 },
      { date: 'Dec 24', successful: 980, failed: 15 },
      { date: 'Dec 25', successful: 850, failed: 22 },
      { date: 'Dec 26', successful: 1580, failed: 41 }
    ],
    suspiciousActivities: [
      { 
        id: 1, 
        type: 'Multiple Failed Logins', 
        ip: '192.168.1.100', 
        user: 'user@example.com',
        time: '2 hours ago',
        severity: 'high',
        status: 'investigating'
      },
      { 
        id: 2, 
        type: 'Unusual Location Access', 
        ip: '203.45.67.89', 
        user: 'john.doe@email.com',
        time: '5 hours ago',
        severity: 'medium',
        status: 'resolved'
      },
      { 
        id: 3, 
        type: 'API Rate Limit Exceeded', 
        ip: '157.89.23.45', 
        user: 'api_user@service.com',
        time: '1 day ago',
        severity: 'low',
        status: 'monitoring'
      }
    ]
  };

  // Interactive functions
  const handleRefresh = async () => {
    setIsRefreshing(true);
    toast.loading("Refreshing dashboard data...");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsRefreshing(false);
    toast.success("Dashboard data refreshed successfully!");
  };

  const handleExportData = (type: string) => {
    toast.loading(`Preparing ${type} export...`);
    
    // Simulate export process
    setTimeout(() => {
      toast.success(`${type} data exported successfully! Check your downloads.`);
    }, 1500);
  };

  const handleUserAction = (action: string, userId?: string) => {
    const actions = {
      'view-profile': 'Opening user profile...',
      'suspend-user': 'User suspended successfully',
      'activate-user': 'User activated successfully',
      'send-notification': 'Notification sent to user',
      'reset-password': 'Password reset email sent'
    };
    
    toast.success(actions[action as keyof typeof actions] || `${action} completed`);
  };

  const handleSecurityAction = (action: string, activityId?: number) => {
    const actions = {
      'block-ip': 'IP address blocked successfully',
      'investigate': 'Investigation started',
      'resolve': 'Activity marked as resolved',
      'escalate': 'Activity escalated to security team'
    };
    
    toast.success(actions[action as keyof typeof actions] || `${action} completed`);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Super Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Platform analytics, user management, and security monitoring
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-24 sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">1 Day</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex-1 sm:flex-none"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Download className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export Data</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExportData('Platform Analytics')}>
                Platform Analytics
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportData('User Data')}>
                User Data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportData('Financial Report')}>
                Financial Report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportData('Security Log')}>
                Security Log
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Platform Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-xl sm:text-2xl font-bold tabular-nums">{platformStats.totalUsers.toLocaleString()}</p>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-success mr-1 flex-shrink-0" />
                <span className="text-success">+12.5%</span>
                <span className="text-muted-foreground ml-1 hidden sm:inline">vs last month</span>
              </div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">Active This Week</p>
              <p className="text-xl sm:text-2xl font-bold tabular-nums text-success">{platformStats.activeThisWeek.toLocaleString()}</p>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-success mr-1 flex-shrink-0" />
                <span className="text-success">+8.3%</span>
                <span className="text-muted-foreground ml-1 hidden sm:inline">vs last week</span>
              </div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <UserCheck className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">Monthly Signups</p>
              <p className="text-xl sm:text-2xl font-bold tabular-nums text-secondary">{platformStats.monthlySignups.toLocaleString()}</p>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-success mr-1 flex-shrink-0" />
                <span className="text-success">+6.7%</span>
                <span className="text-muted-foreground ml-1 hidden sm:inline">vs last month</span>
              </div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">Platform Health</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-success text-white">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Healthy
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">99.9% uptime</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Insights</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Monthly Signups Trend */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Monthly Signups Trend</h3>
                  <p className="text-sm text-muted-foreground hidden sm:block">User acquisition over time</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleExportData('Signup Trends')}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={signupTrendData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fontSize: 12 }} />
                    <YAxis className="text-xs" tick={{ fontSize: 12 }} width={50} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value: number) => [`${value.toLocaleString()} signups`, '']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="signups" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Top Locations */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Top Locations by Users</h3>
                  <p className="text-sm text-muted-foreground hidden sm:block">Geographic distribution</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleExportData('Geographic Data')}>
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {platformStats.topLocations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="text-2xl flex-shrink-0">{location.flag}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{location.country}</p>
                        <p className="text-sm text-muted-foreground tabular-nums">{location.users.toLocaleString()} users</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="h-3 w-3 text-success" />
                        <span className="text-sm text-success tabular-nums">+{location.growth}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* User Insights Tab */}
        <TabsContent value="users" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Most Active Hours */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Most Active Hours</h3>
                  <p className="text-sm text-muted-foreground hidden sm:block">User activity by hour</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleExportData('Activity Data')}>
                  <Clock className="h-4 w-4" />
                </Button>
              </div>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userBehaviorData.activeHours} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="hour" className="text-xs" tick={{ fontSize: 10 }} />
                    <YAxis className="text-xs" tick={{ fontSize: 12 }} width={50} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value: number) => [`${value} users`, 'Active']}
                      labelFormatter={(label) => `${label}:00`}
                    />
                    <Bar 
                      dataKey="users" 
                      fill="hsl(var(--primary))" 
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Retention Rates */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg font-semibold">User Retention Rates</h3>
                  <p className="text-sm text-muted-foreground hidden sm:block">Engagement metrics</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleExportData('Retention Data')}>
                  <Star className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">New Users (7 days)</span>
                    <span className="text-sm font-semibold tabular-nums">{userBehaviorData.retentionRates.newUsers}%</span>
                  </div>
                  <Progress value={userBehaviorData.retentionRates.newUsers} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Returning Users</span>
                    <span className="text-sm font-semibold tabular-nums">{userBehaviorData.retentionRates.returningUsers}%</span>
                  </div>
                  <Progress value={userBehaviorData.retentionRates.returningUsers} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Weekly Retention</span>
                    <span className="text-sm font-semibold tabular-nums">{userBehaviorData.retentionRates.weeklyRetention}%</span>
                  </div>
                  <Progress value={userBehaviorData.retentionRates.weeklyRetention} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Monthly Retention</span>
                    <span className="text-sm font-semibold tabular-nums">{userBehaviorData.retentionRates.monthlyRetention}%</span>
                  </div>
                  <Progress value={userBehaviorData.retentionRates.monthlyRetention} className="h-2" />
                </div>
              </div>
            </Card>
          </div>

          {/* Most Used Features */}
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="text-lg font-semibold">Most Used Features</h3>
                <p className="text-sm text-muted-foreground">Feature adoption and usage trends</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleExportData('Feature Usage')}>
                <Zap className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {userBehaviorData.topFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{feature.feature}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={feature.usage} className="h-2 flex-1 max-w-32" />
                        <span className="text-sm tabular-nums">{feature.usage}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {feature.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Aggregate Income Logged</p>
                  <p className="text-xl sm:text-2xl font-bold text-success tabular-nums">₹{(financialStats.aggregateIncome / 1000000).toFixed(1)}M</p>
                  <div className="flex items-center mt-2 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-success mr-1 flex-shrink-0" />
                    <span className="text-success">+15.2%</span>
                  </div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Aggregate Expenses Logged</p>
                  <p className="text-xl sm:text-2xl font-bold text-destructive tabular-nums">₹{(financialStats.aggregateExpenses / 1000000).toFixed(1)}M</p>
                  <div className="flex items-center mt-2 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-success mr-1 flex-shrink-0" />
                    <span className="text-success">+8.7%</span>
                  </div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Avg Monthly Budget Goal</p>
                  <p className="text-xl sm:text-2xl font-bold text-primary tabular-nums">₹{financialStats.avgMonthlyBudget.toLocaleString()}</p>
                  <div className="flex items-center mt-2 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-success mr-1 flex-shrink-0" />
                    <span className="text-success">+3.4%</span>
                  </div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
              </div>
            </Card>
          </div>

          {/* Platform-wide Expense Categories */}
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="text-lg font-semibold">Platform-wide Expense Categories</h3>
                <p className="text-sm text-muted-foreground">Top 5 expense categories across all users</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleExportData('Expense Categories')}>
                <PieChart className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
              <div className="h-48 w-48 sm:h-64 sm:w-64 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={financialStats.topExpenseCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {financialStats.topExpenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`₹${(value / 1000000).toFixed(1)}M`, 'Amount']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2 sm:space-y-3 w-full lg:w-auto">
                {financialStats.topExpenseCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm font-medium truncate">{category.name}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-semibold tabular-nums">₹{(category.value / 1000000).toFixed(1)}M</span>
                      <p className="text-xs text-muted-foreground">{category.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Login Attempts */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Login Attempts (Past 7 Days)</h3>
                  <p className="text-sm text-muted-foreground hidden sm:block">Successful vs failed logins</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleExportData('Security Log')}>
                  <Shield className="h-4 w-4" />
                </Button>
              </div>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={securityData.loginAttempts} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" className="text-xs" tick={{ fontSize: 12 }} />
                    <YAxis className="text-xs" tick={{ fontSize: 12 }} width={50} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar 
                      dataKey="successful" 
                      fill="hsl(var(--success))" 
                      radius={[2, 2, 0, 0]}
                      name="Successful"
                    />
                    <Bar 
                      dataKey="failed" 
                      fill="hsl(var(--destructive))" 
                      radius={[2, 2, 0, 0]}
                      name="Failed"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Security Alert Summary */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Security Alert Summary</h3>
                  <p className="text-sm text-muted-foreground hidden sm:block">Recent security metrics</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleSecurityAction('refresh-alerts')}>
                  <AlertTriangle className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <p className="text-2xl font-bold text-destructive tabular-nums">12</p>
                    <p className="text-sm text-muted-foreground">High Priority</p>
                  </div>
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <p className="text-2xl font-bold text-warning tabular-nums">28</p>
                    <p className="text-sm text-muted-foreground">Medium Priority</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold tabular-nums">45</p>
                    <p className="text-sm text-muted-foreground">Low Priority</p>
                  </div>
                  <div className="p-3 bg-success/10 rounded-lg">
                    <p className="text-2xl font-bold text-success tabular-nums">89</p>
                    <p className="text-sm text-muted-foreground">Resolved</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Threat Level</span>
                    <Badge className="bg-warning text-white">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Medium
                    </Badge>
                  </div>
                  <Progress value={35} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Last updated: 2 minutes ago</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Suspicious Activities */}
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="text-lg font-semibold">Suspicious Activities Flagged</h3>
                <p className="text-sm text-muted-foreground">Recent security incidents requiring attention</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleExportData('Security Incidents')}>
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {securityData.suspiciousActivities.map((activity) => (
                <div key={activity.id} className="p-3 sm:p-4 border rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant={
                            activity.severity === 'high' ? 'destructive' :
                            activity.severity === 'medium' ? 'default' : 'secondary'
                          }
                          className="text-xs"
                        >
                          {activity.severity.toUpperCase()}
                        </Badge>
                        <Badge 
                          variant={
                            activity.status === 'investigating' ? 'default' :
                            activity.status === 'resolved' ? 'secondary' : 'outline'
                          }
                          className="text-xs"
                        >
                          {activity.status}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm sm:text-base">{activity.type}</h4>
                      <div className="text-sm text-muted-foreground mt-1">
                        <p className="truncate">User: {activity.user}</p>
                        <p>IP: {activity.ip} • {activity.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleSecurityAction('investigate', activity.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Investigate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSecurityAction('block-ip', activity.id)}>
                            <Ban className="mr-2 h-4 w-4" />
                            Block IP
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSecurityAction('resolve', activity.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark Resolved
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSecurityAction('escalate', activity.id)}>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Escalate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}