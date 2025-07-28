import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Target, AlertTriangle, DollarSign, Plus, Edit, Trash2, BarChart3, Lightbulb } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from "sonner";
import { formatCurrency, getStatusColor, simulateApiCall } from '@/components/utils/managementUtils';
import { EXPENSE_CATEGORIES } from '@/components/constants/managementConstants';
import { monthlyData } from '@/components/data/mockData';

interface Budget {
  id: string;
  category: string;
  monthlyLimit: number;
  currentSpent: number;
  period: 'monthly' | 'weekly';
  alertThreshold: number;
  status: 'safe' | 'warning' | 'exceeded';
  lastUpdated: string;
}

interface BudgetRecommendation {
  id: string;
  category: string;
  currentBudget: number;
  recommendedBudget: number;
  reason: string;
  confidence: 'high' | 'medium' | 'low';
  impact: number;
}

export function BudgetManagement() {
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [budgetForm, setBudgetForm] = useState({
    category: '',
    monthlyLimit: '',
    period: 'monthly' as const,
    alertThreshold: 80
  });

  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: '1',
      category: 'Food & Dining',
      monthlyLimit: 15000,
      currentSpent: 12800,
      period: 'monthly',
      alertThreshold: 80,
      status: 'warning',
      lastUpdated: '2024-12-26'
    },
    {
      id: '2',
      category: 'Transportation',
      monthlyLimit: 8000,
      currentSpent: 6200,
      period: 'monthly',
      alertThreshold: 90,
      status: 'safe',
      lastUpdated: '2024-12-25'
    },
    {
      id: '3',
      category: 'Entertainment',
      monthlyLimit: 5000,
      currentSpent: 5800,
      period: 'monthly',
      alertThreshold: 85,
      status: 'exceeded',
      lastUpdated: '2024-12-24'
    }
  ]);

  const budgetRecommendations: BudgetRecommendation[] = [
    {
      id: '1',
      category: 'Food & Dining',
      currentBudget: 15000,
      recommendedBudget: 13500,
      reason: 'Your average spending over 3 months is ₹13,200. Consider reducing budget by 10%.',
      confidence: 'high',
      impact: 1500
    }
  ];

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.monthlyLimit, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.currentSpent, 0);
  const overBudgetCount = budgets.filter(b => b.status === 'exceeded').length;
  const warningCount = budgets.filter(b => b.status === 'warning').length;

  const handleAddBudget = async () => {
    if (!budgetForm.category || !budgetForm.monthlyLimit) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (budgets.some(b => b.category === budgetForm.category)) {
      toast.error('Budget already exists for this category');
      return;
    }

    setIsLoading(true);
    toast.loading('Adding budget...');
    await simulateApiCall();

    const newBudget: Budget = {
      id: Date.now().toString(),
      category: budgetForm.category,
      monthlyLimit: parseFloat(budgetForm.monthlyLimit),
      currentSpent: 0,
      period: budgetForm.period,
      alertThreshold: budgetForm.alertThreshold,
      status: 'safe',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setBudgets([...budgets, newBudget]);
    setBudgetForm({ category: '', monthlyLimit: '', period: 'monthly', alertThreshold: 80 });
    setIsBudgetModalOpen(false);
    setIsLoading(false);
    toast.success('Budget added successfully!');
  };

  const handleEditBudget = (budget: Budget) => {
    setSelectedBudget(budget);
    setBudgetForm({
      category: budget.category,
      monthlyLimit: budget.monthlyLimit.toString(),
      period: budget.period,
      alertThreshold: budget.alertThreshold
    });
    setIsBudgetModalOpen(true);
  };

  const handleDeleteBudget = async (budgetId: string) => {
    setIsLoading(true);
    toast.loading('Deleting budget...');
    await simulateApiCall();

    setBudgets(budgets.filter(budget => budget.id !== budgetId));
    setIsLoading(false);
    toast.success('Budget deleted successfully!');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Budget Management</h1>
          <p className="text-muted-foreground mt-1">
            Set and track spending limits for different categories
          </p>
        </div>
        <Dialog open={isBudgetModalOpen} onOpenChange={setIsBudgetModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selectedBudget ? 'Edit Budget' : 'Add New Budget'}</DialogTitle>
              <DialogDescription>
                {selectedBudget ? 'Update budget settings' : 'Set spending limits for a category'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={budgetForm.category} 
                  onValueChange={(value) => setBudgetForm({...budgetForm, category: value})}
                  disabled={!!selectedBudget}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPENSE_CATEGORIES
                      .filter(cat => !budgets.some(b => b.category === cat) || selectedBudget?.category === cat)
                      .map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthly-limit">Monthly Limit *</Label>
                  <Input
                    id="monthly-limit"
                    type="number"
                    placeholder="15000"
                    value={budgetForm.monthlyLimit}
                    onChange={(e) => setBudgetForm({...budgetForm, monthlyLimit: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alert-threshold">Alert Threshold (%)</Label>
                  <Input
                    id="alert-threshold"
                    type="number"
                    min="50"
                    max="100"
                    value={budgetForm.alertThreshold}
                    onChange={(e) => setBudgetForm({...budgetForm, alertThreshold: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => {
                  setIsBudgetModalOpen(false);
                  setSelectedBudget(null);
                  setBudgetForm({ category: '', monthlyLimit: '', period: 'monthly', alertThreshold: 80 });
                }}>
                  Cancel
                </Button>
                <Button onClick={handleAddBudget} disabled={isLoading}>
                  {isLoading ? 'Saving...' : selectedBudget ? 'Update' : 'Add'} Budget
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
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-2xl font-bold tabular-nums">{formatCurrency(totalBudget)}</p>
            </div>
            <Target className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold tabular-nums">{formatCurrency(totalSpent)}</p>
              <Progress value={(totalSpent / totalBudget) * 100} className="mt-2 h-2" />
            </div>
            <DollarSign className="h-8 w-8 text-secondary" />
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Exceeded Budgets</p>
              <p className="text-2xl font-bold tabular-nums text-destructive">{overBudgetCount}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Warning Alerts</p>
              <p className="text-2xl font-bold tabular-nums text-warning">{warningCount}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-warning" />
          </div>
        </Card>
      </div>

      {/* Budget Usage Bars */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Budget Usage by Category</h3>
            <p className="text-sm text-muted-foreground">Track your spending against set limits</p>
          </div>
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = (budget.currentSpent / budget.monthlyLimit) * 100;
            const remaining = Math.max(0, budget.monthlyLimit - budget.currentSpent);
            
            return (
              <div key={budget.id} className="p-4 border rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold">{budget.category}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(budget.currentSpent)} of {formatCurrency(budget.monthlyLimit)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className={getStatusColor(budget.status, 'budget')}>
                      {budget.status}
                    </Badge>
                    <span className="text-sm font-semibold tabular-nums">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Progress value={Math.min(percentage, 100)} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Remaining: {formatCurrency(remaining)}</span>
                    <span>Alert at {budget.alertThreshold}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditBudget(budget)}
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Budget</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete the budget for {budget.category}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDeleteBudget(budget.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Charts and Recommendations */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Budget vs Actual Trend */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Budget vs Actual Spending</h3>
              <p className="text-sm text-muted-foreground">Monthly comparison over time</p>
            </div>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  formatter={(value: number, name: string) => [`₹${value.toLocaleString()}`, name === 'budget' ? 'Budget' : 'Actual']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="budget" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  strokeDasharray="5,5"
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Smart Recommendations */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Smart Recommendations</h3>
              <p className="text-sm text-muted-foreground">AI-powered budget adjustments</p>
            </div>
            <Lightbulb className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {budgetRecommendations.map((recommendation) => (
              <div key={recommendation.id} className="p-4 bg-accent/30 rounded-lg">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">{recommendation.category}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {recommendation.reason}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">
                      Impact: +{formatCurrency(Math.abs(recommendation.impact))}
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