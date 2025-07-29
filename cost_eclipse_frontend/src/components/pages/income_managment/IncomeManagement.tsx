import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  TrendingUp,
  PieChart,
  BarChart3,
  SortAsc,
  SortDesc,
  DollarSign,
  Wallet,
  Eye,
} from 'lucide-react';
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { toast } from "sonner";
import { format } from 'date-fns';

interface IncomeData {
  id: string;
  source: string;
  amount: number;
  date: string;
  paymentMethod: string;
  description?: string;
  userId: string;
  userName: string;
  category: string;
}

export function IncomeManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<IncomeData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    date: new Date(),
    paymentMethod: '',
    description: '',
    category: ''
  });

  const incomeSources = [
    'Salary',
    'Freelance',
    'Investment',
    'Business',
    'Rental',
    'Bonus',
    'Commission',
    'Dividend',
    'Interest',
    'Others'
  ];

  const incomeCategories = [
    'Primary Income',
    'Secondary Income',
    'Passive Income',
    'Investment Returns',
    'Business Income',
    'Other Income'
  ];

  const paymentMethods = [
    'Bank Transfer',
    'Cash',
    'Check',
    'UPI',
    'Credit Card',
    'Digital Wallet',
    'Crypto'
  ];

  // Mock income data
  const [incomes, setIncomes] = useState<IncomeData[]>([
    {
      id: '1',
      source: 'Salary',
      amount: 75000,
      date: '2024-12-25',
      paymentMethod: 'Bank Transfer',
      description: 'Monthly salary',
      userId: '1',
      userName: 'John Doe',
      category: 'Primary Income'
    },
    {
      id: '2',
      source: 'Freelance',
      amount: 25000,
      date: '2024-12-20',
      paymentMethod: 'UPI',
      description: 'Web development project',
      userId: '2',
      userName: 'Sarah Johnson',
      category: 'Secondary Income'
    },
    {
      id: '3',
      source: 'Investment',
      amount: 8500,
      date: '2024-12-15',
      paymentMethod: 'Bank Transfer',
      description: 'Stock dividend',
      userId: '3',
      userName: 'Mike Chen',
      category: 'Investment Returns'
    },
    {
      id: '4',
      source: 'Rental',
      amount: 15000,
      date: '2024-12-10',
      paymentMethod: 'Bank Transfer',
      description: 'Monthly rent',
      userId: '4',
      userName: 'Emily Rodriguez',
      category: 'Passive Income'
    },
    {
      id: '5',
      source: 'Bonus',
      amount: 35000,
      date: '2024-12-05',
      paymentMethod: 'Bank Transfer',
      description: 'Year-end bonus',
      userId: '5',
      userName: 'David Wilson',
      category: 'Primary Income'
    }
  ]);

  // Chart data
  const monthlyIncomeData = [
    { month: 'Jul', amount: 85000 },
    { month: 'Aug', amount: 92000 },
    { month: 'Sep', amount: 78000 },
    { month: 'Oct', amount: 105000 },
    { month: 'Nov', amount: 88000 },
    { month: 'Dec', amount: 158500 },
  ];

  const sourceDistribution = incomes.reduce((acc, income) => {
    const existing = acc.find(item => item.name === income.source);
    if (existing) {
      existing.value += income.amount;
    } else {
      acc.push({ name: income.source, value: income.amount, color: getRandomColor() });
    }
    return acc;
  }, [] as { name: string; value: number; color: string }[]);

  function getRandomColor() {
    const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6', '#f97316', '#7c3aed'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Filter incomes
  const filteredIncomes = incomes
    .filter(income => {
      const matchesSearch = income.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           income.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSource = sourceFilter === 'all' || income.source === sourceFilter;
      const matchesDateRange = (!dateRange.from || income.date >= dateRange.from) &&
                              (!dateRange.to || income.date <= dateRange.to);
      
      return matchesSearch && matchesSource && matchesDateRange;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof IncomeData];
      const bValue = b[sortBy as keyof IncomeData];
      const modifier = sortOrder === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * modifier;
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * modifier;
      }
      
      return 0;
    });

  const handleAddIncome = async () => {
    if (!formData.source || !formData.amount || !formData.paymentMethod || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    toast.loading('Adding income...');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newIncome: IncomeData = {
      id: Date.now().toString(),
      source: formData.source,
      amount: parseFloat(formData.amount),
      date: format(formData.date, 'yyyy-MM-dd'),
      paymentMethod: formData.paymentMethod,
      description: formData.description,
      userId: '1',
      userName: 'Current User',
      category: formData.category
    };

    setIncomes([newIncome, ...incomes]);
    setFormData({
      source: '',
      amount: '',
      date: new Date(),
      paymentMethod: '',
      description: '',
      category: ''
    });
    setIsAddModalOpen(false);
    setIsLoading(false);
    toast.success('Income added successfully!');
  };

  const handleDeleteIncome = async (id: string) => {
    setIsLoading(true);
    toast.loading('Deleting income...');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIncomes(incomes.filter(income => income.id !== id));
    setIsLoading(false);
    toast.success('Income deleted successfully!');
  };

  const handleEditIncome = (income: IncomeData) => {
    setSelectedIncome(income);
    setFormData({
      source: income.source,
      amount: income.amount.toString(),
      date: new Date(income.date),
      paymentMethod: income.paymentMethod,
      description: income.description || '',
      category: income.category
    });
    setIsAddModalOpen(true);
    toast.info(`Editing income: ${income.source}`);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleExportIncomes = async () => {
    setIsLoading(true);
    toast.loading('Exporting income data...');

    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast.success('Income data exported successfully!');
  };

  const totalIncome = filteredIncomes.reduce((sum, income) => sum + income.amount, 0);
  const thisMonthIncome = monthlyIncomeData[monthlyIncomeData.length - 1].amount;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Income Management</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all your income sources
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportIncomes}
            disabled={isLoading}
          >
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-success to-primary hover:from-success/90 hover:to-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Income
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{selectedIncome ? 'Edit Income' : 'Add New Income'}</DialogTitle>
                <DialogDescription>
                  {selectedIncome ? 'Update income details' : 'Enter income information to track your earnings'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="source">Source *</Label>
                    <Select value={formData.source} onValueChange={(value) => setFormData({...formData, source: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        {incomeSources.map(source => (
                          <SelectItem key={source} value={source}>
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {incomeCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Add any additional details..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddIncome} disabled={isLoading}>
                    {isLoading ? 'Adding...' : selectedIncome ? 'Update' : 'Add'} Income
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
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-2xl font-bold tabular-nums text-success">₹{totalIncome.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold tabular-nums text-primary">₹{thisMonthIncome.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Income Sources</p>
              <p className="text-2xl font-bold tabular-nums">{sourceDistribution.length}</p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <PieChart className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg per Source</p>
              <p className="text-2xl font-bold tabular-nums">₹{Math.round(totalIncome / sourceDistribution.length).toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Monthly Income Trend */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Monthly Income Trend</h3>
              <p className="text-sm text-muted-foreground">Income patterns over time</p>
            </div>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyIncomeData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Income']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--success))" 
                  fill="hsl(var(--success))"
                  fillOpacity={0.2}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Source Distribution */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Source Distribution</h3>
              <p className="text-sm text-muted-foreground">Income by source</p>
            </div>
            <Button variant="ghost" size="sm">
              <PieChart className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            <div className="h-48 w-48 sm:h-64 sm:w-64 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={sourceDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sourceDistribution.map((entry, index) => (
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
            <div className="flex-1 space-y-2 sm:space-y-3 w-full lg:w-auto">
              {sourceDistribution.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: source.color }}></div>
                    <span className="text-sm font-medium truncate">{source.name}</span>
                  </div>
                  <span className="text-sm font-semibold tabular-nums flex-shrink-0">₹{source.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search income..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="source-filter">Source</Label>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {incomeSources.map(source => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date-range">Date Range</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                  className="flex-1"
                />
                <Input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Income Table */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Income Records ({filteredIncomes.length})</h3>
            <p className="text-sm text-muted-foreground">
              Total: ₹{totalIncome.toLocaleString()}
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
                    onClick={() => handleSort('source')}
                    className="h-auto p-0 font-semibold"
                  >
                    Source
                    {sortBy === 'source' && (
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
                <TableHead className="hidden xl:table-cell">Description</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncomes.map((income) => (
                <TableRow key={income.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-success" />
                      <span className="font-medium">{income.source}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-success border-success">
                      {income.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-success tabular-nums">₹{income.amount.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(income.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-3 w-3" />
                      {income.paymentMethod}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{income.userName}</TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <span className="text-sm text-muted-foreground truncate max-w-32 block">
                      {income.description}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditIncome(income)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteIncome(income.id)}
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

        {filteredIncomes.length === 0 && (
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No income records found matching the current filters.</p>
          </div>
        )}
      </Card>
    </div>
  );
}