import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PiggyBank, Target, Calendar, DollarSign, Plus, Edit, CheckCircle, Lightbulb, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from "sonner";
import { monthlyData } from '@/components/data/mockData';
import { formatCurrency, getPriorityColor, getStatusColor, simulateApiCall } from '@/components/utils/managementUtils';
import { SAVING_GOAL_CATEGORIES } from '@/components/constants/managementConstants';

interface SavingGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  status: 'active' | 'completed' | 'paused';
  priority: 'high' | 'medium' | 'low';
}

interface SavingSuggestion {
  id: string;
  type: 'expense_cut' | 'income_boost' | 'smart_save';
  title: string;
  description: string;
  potentialSaving: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export function SavingManagement() {
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [monthlyTarget, setMonthlyTarget] = useState(15000);
  const [isLoading, setIsLoading] = useState(false);

  const [goalForm, setGoalForm] = useState({
    title: '',
    targetAmount: '',
    targetDate: '',
    category: '',
    priority: 'medium' as const
  });

  const [savingGoals, setSavingGoals] = useState<SavingGoal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      targetAmount: 100000,
      currentAmount: 68000,
      targetDate: '2025-06-30',
      category: 'Emergency',
      status: 'active',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Vacation to Europe',
      targetAmount: 80000,
      currentAmount: 45000,
      targetDate: '2025-12-01',
      category: 'Travel',
      status: 'active',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'New Laptop',
      targetAmount: 75000,
      currentAmount: 75000,
      targetDate: '2024-11-30',
      category: 'Technology',
      status: 'completed',
      priority: 'low'
    }
  ]);

  const savingSuggestions: SavingSuggestion[] = [
    {
      id: '1',
      type: 'expense_cut',
      title: 'Reduce Dining Out',
      description: 'Cut dining expenses by 20% to save more towards your emergency fund',
      potentialSaving: 2400,
      difficulty: 'easy',
      category: 'Food & Dining'
    },
    {
      id: '2',
      type: 'smart_save',
      title: 'Round-up Savings',
      description: 'Enable automatic round-up on purchases to boost savings',
      potentialSaving: 1200,
      difficulty: 'easy',
      category: 'Automation'
    }
  ];

  const currentMonthSaved = monthlyData[monthlyData.length - 1].savings;
  const savingProgress = (currentMonthSaved / monthlyTarget) * 100;
  const totalSaved = savingGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);

  const handleAddGoal = async () => {
    if (!goalForm.title || !goalForm.targetAmount || !goalForm.targetDate || !goalForm.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    toast.loading('Adding saving goal...');
    await simulateApiCall();

    const newGoal: SavingGoal = {
      id: Date.now().toString(),
      title: goalForm.title,
      targetAmount: parseFloat(goalForm.targetAmount),
      currentAmount: 0,
      targetDate: goalForm.targetDate,
      category: goalForm.category,
      status: 'active',
      priority: goalForm.priority
    };

    setSavingGoals([...savingGoals, newGoal]);
    setGoalForm({
      title: '',
      targetAmount: '',
      targetDate: '',
      category: '',
      priority: 'medium'
    });
    setIsGoalModalOpen(false);
    setIsLoading(false);
    toast.success('Saving goal added successfully!');
  };

  const handleGoalAction = async (action: string, goalId: string) => {
    setIsLoading(true);
    
    const actionMessages = {
      'complete': 'Marking goal as completed...',
      'pause': 'Pausing goal...',
      'resume': 'Resuming goal...',
      'delete': 'Deleting goal...'
    };

    toast.loading(actionMessages[action as keyof typeof actionMessages]);
    await simulateApiCall();

    if (action === 'delete') {
      setSavingGoals(savingGoals.filter(goal => goal.id !== goalId));
      toast.success('Goal deleted successfully');
    } else if (action === 'complete') {
      setSavingGoals(savingGoals.map(goal => 
        goal.id === goalId ? { ...goal, status: 'completed' as const, currentAmount: goal.targetAmount } : goal
      ));
      toast.success('Goal marked as completed! 🎉');
    } else if (action === 'pause') {
      setSavingGoals(savingGoals.map(goal => 
        goal.id === goalId ? { ...goal, status: 'paused' as const } : goal
      ));
      toast.success('Goal paused');
    } else if (action === 'resume') {
      setSavingGoals(savingGoals.map(goal => 
        goal.id === goalId ? { ...goal, status: 'active' as const } : goal
      ));
      toast.success('Goal resumed');
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Saving Management</h1>
          <p className="text-muted-foreground mt-1">
            Track your saving goals and get smart suggestions to boost your savings
          </p>
        </div>
        <Dialog open={isGoalModalOpen} onOpenChange={setIsGoalModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-success to-primary hover:from-success/90 hover:to-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Saving Goal</DialogTitle>
              <DialogDescription>
                Set a new saving goal to track your progress towards financial milestones
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal-title">Goal Title *</Label>
                <Input
                  id="goal-title"
                  placeholder="e.g., Emergency Fund, Vacation"
                  value={goalForm.title}
                  onChange={(e) => setGoalForm({...goalForm, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target-amount">Target Amount *</Label>
                  <Input
                    id="target-amount"
                    type="number"
                    placeholder="100000"
                    value={goalForm.targetAmount}
                    onChange={(e) => setGoalForm({...goalForm, targetAmount: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-date">Target Date *</Label>
                  <Input
                    id="target-date"
                    type="date"
                    value={goalForm.targetDate}
                    onChange={(e) => setGoalForm({...goalForm, targetDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={goalForm.category} onValueChange={(value) => setGoalForm({...goalForm, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {SAVING_GOAL_CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={goalForm.priority} onValueChange={(value: 'high' | 'medium' | 'low') => setGoalForm({...goalForm, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsGoalModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddGoal} disabled={isLoading}>
                  {isLoading ? 'Adding...' : 'Add Goal'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Saved</p>
              <p className="text-2xl font-bold tabular-nums text-success">{formatCurrency(totalSaved)}</p>
            </div>
            <PiggyBank className="h-8 w-8 text-success" />
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Goals</p>
              <p className="text-2xl font-bold tabular-nums">{savingGoals.filter(g => g.status === 'active').length}</p>
            </div>
            <Target className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold tabular-nums">{formatCurrency(currentMonthSaved)}</p>
              <Progress value={savingProgress} className="mt-2 h-2" />
            </div>
            <Calendar className="h-8 w-8 text-secondary" />
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Target</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-2xl font-bold tabular-nums">{formatCurrency(monthlyTarget)}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newTarget = prompt('Enter new monthly target:', monthlyTarget.toString());
                    if (newTarget && !isNaN(parseFloat(newTarget))) {
                      setMonthlyTarget(parseFloat(newTarget));
                      toast.success(`Monthly target updated to ${formatCurrency(parseFloat(newTarget))}`);
                    }
                  }}
                  className="h-6 w-6 p-0"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <DollarSign className="h-8 w-8 text-warning" />
          </div>
        </Card>
      </div>

      {/* Monthly Target Progress */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Monthly Saving Progress</h3>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(currentMonthSaved)} of {formatCurrency(monthlyTarget)} target
            </p>
          </div>
          <Badge className={savingProgress >= 100 ? 'bg-success text-white' : savingProgress >= 80 ? 'bg-warning text-white' : 'bg-muted'}>
            {savingProgress.toFixed(1)}% Complete
          </Badge>
        </div>
        <Progress value={Math.min(savingProgress, 100)} className="h-4 mb-4" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹0</span>
          <span>{formatCurrency(monthlyTarget)}</span>
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Saving Goals */}
        <div className="xl:col-span-2 space-y-4">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Saving Goals</h3>
                <p className="text-sm text-muted-foreground">Track progress towards your financial milestones</p>
              </div>
            </div>
            <div className="space-y-4">
              {savingGoals.map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={goal.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold truncate">{goal.title}</h4>
                        <p className="text-sm text-muted-foreground">{goal.category}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge className={getPriorityColor(goal.priority)}>
                          {goal.priority}
                        </Badge>
                        <Badge className={getStatusColor(goal.status)}>
                          {goal.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="tabular-nums">{formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}</span>
                      </div>
                      <Progress value={Math.min(progress, 100)} className="h-3" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{progress.toFixed(1)}% complete</span>
                        <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      {goal.status === 'active' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGoalAction('complete', goal.id)}
                            disabled={isLoading}
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Complete
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGoalAction('pause', goal.id)}
                            disabled={isLoading}
                          >
                            Pause
                          </Button>
                        </>
                      )}
                      {goal.status === 'paused' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGoalAction('resume', goal.id)}
                          disabled={isLoading}
                        >
                          Resume
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Historical Savings */}
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Historical Savings</h3>
                <p className="text-sm text-muted-foreground">Your saving performance over time</p>
              </div>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Saved']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="hsl(var(--success))" 
                    fill="hsl(var(--success))"
                    fillOpacity={0.2}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Smart Suggestions */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Smart Suggestions</h3>
              <p className="text-sm text-muted-foreground">AI-powered tips to boost your savings</p>
            </div>
            <Lightbulb className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {savingSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="p-4 bg-accent/30 rounded-lg">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">{suggestion.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {suggestion.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold tabular-nums text-success">
                      {formatCurrency(suggestion.potentialSaving)}/month
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                      >
                        Apply
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-7"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}