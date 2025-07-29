import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SIGNUP } from '@/constants/app_urls';
import { ArrowRight, TrendingUp, DollarSign, Users, Target, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();
  return (
    <section
      id="home"
      className="py-20 lg:py-32 bg-gradient-to-br from-background via-accent/30 to-primary/5 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Announcement Badge */}
              <Badge className="bg-gradient-to-r from-primary to-success text-white border-0 px-4 py-2">
                <Zap className="mr-2 h-4 w-4" />
                New: AI-Powered Expense Recognition
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Transform Your{' '}
                <span className="bg-gradient-to-r from-slate-800 via-primary to-success bg-clip-text text-transparent">
                  Financial Eclipse
                </span>{' '}
                Into Clarity
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                CostEclipse illuminates your financial landscape with intelligent expense tracking,
                seamless group collaboration, and actionable insights that guide you toward your
                financial goals.
              </p>
            </div>

            {/* Enhanced Features List */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-success" />
                </div>
                <span className="font-medium">Smart Expense Tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">Group Expense Management</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Target className="h-4 w-4 text-secondary" />
                </div>
                <span className="font-medium">Savings Goal Tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-warning" />
                </div>
                <span className="font-medium">Bank-Level Security</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate(SIGNUP)}
                size="lg"
                className="bg-gradient-to-r from-slate-800 via-primary to-success hover:from-slate-700 hover:via-primary/90 hover:to-success/90 text-lg px-8 py-6 h-auto font-semibold shadow-lg"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {/* <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 h-auto border-2 font-medium hover:bg-accent/50"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button> */}
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="flex items-center gap-8 pt-8 border-t">
              <div className="text-center">
                <div className="font-bold text-2xl tabular-nums bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                  75,000+
                </div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl tabular-nums bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                  $12M+
                </div>
                <div className="text-sm text-muted-foreground">Tracked Monthly</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl tabular-nums bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                  4.9★
                </div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Dashboard Preview */}
          <div className="relative">
            {/* Main Dashboard Card */}
            <Card className="p-8 bg-background/80 backdrop-blur-sm border-2 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="space-y-6">
                {/* Header with Real-time Indicator */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Financial Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Live data • Updated now</p>
                  </div>
                  <div className="flex items-center gap-2 text-success">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium tabular-nums">+18.5%</span>
                  </div>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-success/10 to-success/5 p-4 rounded-xl border border-success/20">
                    <div className="flex items-center gap-2 text-success mb-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm font-medium">Monthly Income</span>
                    </div>
                    <div className="text-2xl font-bold tabular-nums">$5,240</div>
                    <div className="text-sm text-muted-foreground">+12% vs last month</div>
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">Expenses</span>
                    </div>
                    <div className="text-2xl font-bold tabular-nums">$3,180</div>
                    <div className="text-sm text-muted-foreground">-8% vs last month</div>
                  </div>
                </div>

                {/* Savings Goal Progress */}
                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-4 rounded-xl border border-secondary/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-secondary">
                      <Target className="h-4 w-4" />
                      <span className="text-sm font-medium">Emergency Fund</span>
                    </div>
                    <span className="text-sm text-muted-foreground">$8,400 / $10,000</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-secondary to-secondary/80 h-2 rounded-full"
                      style={{ width: '84%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">16% left to reach your goal</p>
                </div>

                {/* Recent Activity with Enhanced Data */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">Recent Transactions</h4>
                  <div className="space-y-2">
                    {[
                      {
                        type: 'expense',
                        label: 'Whole Foods Market',
                        amount: '-$127.45',
                        category: 'Groceries',
                        time: '2h ago',
                        color: 'text-error',
                      },
                      {
                        type: 'income',
                        label: 'Freelance Payment',
                        amount: '+$850.00',
                        category: 'Work',
                        time: '1d ago',
                        color: 'text-success',
                      },
                      {
                        type: 'expense',
                        label: 'Blue Bottle Coffee',
                        amount: '-$24.60',
                        category: 'Dining',
                        time: '2d ago',
                        color: 'text-error',
                      },
                      {
                        type: 'expense',
                        label: 'Netflix Subscription',
                        amount: '-$15.99',
                        category: 'Entertainment',
                        time: '3d ago',
                        color: 'text-error',
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                      >
                        <div>
                          <span className="text-sm font-medium">{item.label}</span>
                          <div className="text-xs text-muted-foreground">
                            {item.category} • {item.time}
                          </div>
                        </div>
                        <span className={`text-sm font-semibold tabular-nums ${item.color}`}>
                          {item.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Enhanced Floating Cards */}
            <Card className="absolute -top-4 -right-4 p-4 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg w-36 hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Group Trip</div>
                <div className="text-xs opacity-80">7 participants</div>
                <div className="text-xs opacity-80">$2,340 total</div>
              </div>
            </Card>

            <Card className="absolute -bottom-4 -left-4 p-4 bg-gradient-to-br from-success to-success/80 text-success-foreground shadow-lg w-36 hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <Target className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Goal Progress</div>
                <div className="text-xs opacity-80">84% complete</div>
                <div className="text-xs opacity-80">$1,600 to go</div>
              </div>
            </Card>

            <Card className="absolute top-1/2 -left-8 p-3 bg-gradient-to-br from-warning to-warning/80 text-warning-foreground shadow-lg w-28 hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <Zap className="h-5 w-5 mx-auto mb-1" />
                <div className="text-xs font-medium">AI Insights</div>
                <div className="text-xs opacity-80">47 receipts</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
