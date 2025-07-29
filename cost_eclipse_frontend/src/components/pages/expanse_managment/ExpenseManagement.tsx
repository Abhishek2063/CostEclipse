import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Calendar as CalendarIcon,
  CreditCard,
  Receipt,
  TrendingDown,
  PieChart,
  BarChart3,
  SortAsc,
  SortDesc,
  RefreshCw,
  Eye
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface ExpenseData {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  paymentMethod: string;
  note?: string;
  isRecurring: boolean;
  isPersonal: boolean;
  userId: string;
  userName: string;
}

export function ExpenseManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    amount: '',
    date: new Date(),
    paymentMethod: '',
    note: '',
    isRecurring: false,
    isPersonal: true
  });

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Groceries',
    'Others'
  ];

  const paymentMethods = [
    'Cash',
    'Credit Card',
    'Debit Card',
    'UPI',
    'Net Banking',
    'Wallet',
    'Cheque'
  ];

  // Mock expense data
  const [expenses, setExpenses] = useState<ExpenseData[]>([
    {
      id: '1',
      title: 'Lunch at Restaurant',
      category: 'Food & Dining',
      amount: 850,
      date: '2024-12-26',
      paymentMethod: 'Credit Card',
      note: 'Team lunch meeting',
      isRecurring: false,
      isPersonal: false,
      userId: '1',
      userName: 'John Doe'
    },
    {
      id: '2',
      title: 'Monthly Internet Bill',
      category: 'Bills & Utilities',
      amount: 1200,
      date: '2024-12-25',
      paymentMethod: 'Net Banking',
      note: 'Broadband subscription',
      isRecurring: true,
      isPersonal: true,
      userId: '2',
      userName: 'Sarah Johnson'
    },
    {
      id: '3',
      title: 'Grocery Shopping',
      category: 'Groceries',
      amount: 2500,
      date: '2024-12-24',
      paymentMethod: 'UPI',
      note: 'Weekly groceries',
      isRecurring: false,
      isPersonal: true,
      userId: '3',
      userName: 'Mike Chen'
    },
    {
      id: '4',
      title: 'Uber Ride',
      category: 'Transportation',
      amount: 320,
      date: '2024-12-23',
      paymentMethod: 'Wallet',
      note: 'Airport drop',
      isRecurring: false,
      isPersonal: true,
      userId: '4',
      userName: 'Emily Rodriguez'
    },
    {
      id: '5',
      title: 'Movie Tickets',
      category: 'Entertainment',
      amount: 600,
      date: '2024-12-22',
      paymentMethod: 'Credit Card',
      note: 'Weekend movie',
      isRecurring: false,
      isPersonal: true,
      userId: '5',
      userName: 'David Wilson'
    }
  ]);

  // Chart data
  const monthlyExpenseData = [
    { month: 'Jul', amount: 45000 },
    { month: 'Aug', amount: 52000 },
    { month: 'Sep', amount: 48000 },
    { month: 'Oct', amount: 55000 },
    { month: 'Nov', amount: 49000 },
    { month: 'Dec', amount: 58000 },
  ];

  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount, color: getRandomColor() });
    }
    return acc;
  }, [] as { name: string; value: number; color: string }[]);

  const recurringVsOneTime = [
    { name: 'Recurring', value: expenses.filter(e => e.isRecurring).reduce((sum, e) => sum + e.amount, 0), color: '#4f46e5' },
    { name: 'One-Time', value: expenses.filter(e => !e.isRecurring).reduce((sum, e) => sum + e.amount, 0), color: '#10b981' }
  ];

  function getRandomColor() {
    const colors = ['#4f46e5', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6', '#f97316'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Filter expenses
  const filteredExpenses = expenses
    .filter(expense => {
      const matchesSearch = expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           expense.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
      const matchesPaymentMethod = paymentMethodFilter === 'all' || expense.paymentMethod === paymentMethodFilter;
      const matchesDateRange = (!dateRange.from || expense.date >= dateRange.from) &&
                              (!dateRange.to || expense.date <= dateRange.to);
      
      return matchesSearch && matchesCategory && matchesPaymentMethod && matchesDateRange;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof ExpenseData];
      const bValue = b[sortBy as keyof ExpenseData];
      const modifier = sortOrder === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * modifier;
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * modifier;
      }
      
      return 0;
    });

  const handleAddExpense = async () => {
    if (!formData.title || !formData.category || !formData.amount || !formData.paymentMethod) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    toast.loading('Adding expense...');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newExpense: ExpenseData = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: format(formData.date, 'yyyy-MM-dd'),
      paymentMethod: formData.paymentMethod,
      note: formData.note,
      isRecurring: formData.isRecurring,
      isPersonal: formData.isPersonal,
      userId: '1',
      userName: 'Current User'
    };

    setExpenses([newExpense, ...expenses]);
    setFormData({
      title: '',
      category: '',
      amount: '',
      date: new Date(),
      paymentMethod: '',
      note: '',
      isRecurring: false,
      isPersonal: true
    });
    setIsAddModalOpen(false);
    setIsLoading(false);
    toast.success('Expense added successfully!');
  };

  const handleDeleteExpense = async (id: string) => {
    setIsLoading(true);
    toast.loading('Deleting expense...');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setExpenses(expenses.filter(expense => expense.id !== id));
    setIsLoading(false);
    toast.success('Expense deleted successfully!');
  };

  const handleEditExpense = (expense: ExpenseData) => {
    setSelectedExpense(expense);
    setFormData({
      title: expense.title,
      category: expense.category,
      amount: expense.amount.toString(),
      date: new Date(expense.date),
      paymentMethod: expense.paymentMethod,
      note: expense.note || '',
      isRecurring: expense.isRecurring,
      isPersonal: expense.isPersonal
    });
    setIsAddModalOpen(true);
    toast.info(`Editing expense: ${expense.title}`);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleExportExpenses = async () => {
    setIsLoading(true);
    toast.loading('Exporting expense data...');

    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast.success('Expense data exported successfully!');
  };

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Expense Management</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all your expenses efficiently
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportExpenses}
            disabled={isLoading}
          >
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{selectedExpense ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
                <DialogDescription>
                  {selectedExpense ? 'Update expense details' : 'Enter expense information to track your spending'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter expense title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount *</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, 'PPP') : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => date && setFormData({...formData, date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment-method">Payment Method *</Label>
                    <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({...formData, paymentMethod: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map(method => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Note</Label>
                  <Textarea
                    id="note"
                    placeholder="Add any additional notes..."
                    value={formData.note}
                    onChange={(e) => setFormData({...formData, note: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="recurring"
                      checked={formData.isRecurring}
                      onCheckedChange={(checked) => setFormData({...formData, isRecurring: checked})}
                    />
                    <Label htmlFor="recurring">Recurring Expense</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="personal"
                      checked={formData.isPersonal}
                      onCheckedChange={(checked) => setFormData({...formData, isPersonal: checked})}
                    />
                    <Label htmlFor="personal">Personal Expense</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddExpense} disabled={isLoading}>
                    {isLoading ? 'Adding...' : selectedExpense ? 'Update' : 'Add'} Expense
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold tabular-nums">₹{totalExpenses.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-destructive" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold tabular-nums">₹{monthlyExpenseData[monthlyExpenseData.length - 1].amount.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Recurring</p>
              <p className="text-2xl font-bold tabular-nums">₹{recurringVsOneTime[0].value.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <RefreshCw className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Categories</p>
              <p className="text-2xl font-bold tabular-nums">{categoryData.length}</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <PieChart className="h-6 w-6 text-success" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Monthly Expense Chart */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Monthly Expense Trend</h3>
              <p className="text-sm text-muted-foreground">Expense patterns over time</p>
            </div>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyExpenseData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recurring vs One-Time */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Recurring vs One-Time</h3>
              <p className="text-sm text-muted-foreground">Expense type breakdown</p>
            </div>
            <Button variant="ghost" size="sm">
              <PieChart className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={recurringVsOneTime}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {recurringVsOneTime.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {recurringVsOneTime.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm">{entry.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search expenses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category-filter">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="payment-filter">Payment Method</Label>
              <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  {paymentMethods.map(method => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date-from">Date Range</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                />
                <Input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Expense Table */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Expenses ({filteredExpenses.length})</h3>
            <p className="text-sm text-muted-foreground">
              Total: ₹{totalExpenses.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('title')}
                    className="h-auto p-0 font-semibold"
                  >
                    Title
                    {sortBy === 'title' && (
                      sortOrder === 'asc' ? <SortAsc className="ml-2 h-4 w-4" /> : <SortDesc className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('amount')}
                    className="h-auto p-0 font-semibold"
                  >
                    Amount
                    {sortBy === 'amount' && (
                      sortOrder === 'asc' ? <SortAsc className="ml-2 h-4 w-4" /> : <SortDesc className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('date')}
                    className="h-auto p-0 font-semibold"
                  >
                    Date
                    {sortBy === 'date' && (
                      sortOrder === 'asc' ? <SortAsc className="ml-2 h-4 w-4" /> : <SortDesc className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">Payment Method</TableHead>
                <TableHead className="hidden lg:table-cell">User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{expense.title}</p>
                      {expense.note && (
                        <p className="text-sm text-muted-foreground truncate max-w-32">{expense.note}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{expense.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold tabular-nums">₹{expense.amount.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-3 w-3" />
                      {expense.paymentMethod}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{expense.userName}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {expense.isRecurring && (
                        <Badge variant="secondary" className="text-xs">Recurring</Badge>
                      )}
                      {expense.isPersonal && (
                        <Badge variant="outline" className="text-xs">Personal</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditExpense(expense)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredExpenses.length === 0 && (
          <div className="text-center py-8">
            <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No expenses found matching the current filters.</p>
          </div>
        )}
      </Card>
    </div>
  );
}