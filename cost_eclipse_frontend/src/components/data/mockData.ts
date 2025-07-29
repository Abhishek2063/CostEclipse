
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'premium';
  status: 'active' | 'inactive' | 'suspended';
  subscriptionStatus: 'free' | 'premium' | 'enterprise';
  registeredDate: string;
  lastLogin: string;
  avatar?: string;
  totalExpenses: number;
  totalIncome: number;
}

export interface ExpenseData {
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

export interface IncomeData {
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

export const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    subscriptionStatus: 'enterprise',
    registeredDate: '2024-01-15',
    lastLogin: '2024-12-26 10:30 AM',
    totalExpenses: 125000,
    totalIncome: 180000
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'premium',
    status: 'active',
    subscriptionStatus: 'premium',
    registeredDate: '2024-02-20',
    lastLogin: '2024-12-25 08:15 AM',
    totalExpenses: 89000,
    totalIncome: 120000
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@example.com',
    role: 'user',
    status: 'inactive',
    subscriptionStatus: 'free',
    registeredDate: '2024-03-10',
    lastLogin: '2024-12-20 02:45 PM',
    totalExpenses: 45000,
    totalIncome: 75000
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    role: 'user',
    status: 'suspended',
    subscriptionStatus: 'free',
    registeredDate: '2024-04-05',
    lastLogin: '2024-12-18 09:20 AM',
    totalExpenses: 32000,
    totalIncome: 50000
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@example.com',
    role: 'premium',
    status: 'active',
    subscriptionStatus: 'premium',
    registeredDate: '2024-05-12',
    lastLogin: '2024-12-26 03:10 PM',
    totalExpenses: 78000,
    totalIncome: 95000
  }
];

export const mockExpenses: ExpenseData[] = [
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
];

export const mockIncomes: IncomeData[] = [
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
];

export const chartColors = [
  '#4f46e5', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', 
  '#06b6d4', '#8b5cf6', '#f97316', '#22c55e', '#3b82f6'
];

export const monthlyData = [
  { month: 'Jul', income: 85000, expenses: 45000, savings: 12000, budget: 45000, actual: 42800, signups: 850 },
  { month: 'Aug', income: 92000, expenses: 52000, savings: 18000, budget: 45000, actual: 48200, signups: 920 },
  { month: 'Sep', income: 78000, expenses: 48000, savings: 14500, budget: 47000, actual: 44500, signups: 1100 },
  { month: 'Oct', income: 105000, expenses: 55000, savings: 16200, budget: 47000, actual: 46800, signups: 1050 },
  { month: 'Nov', income: 88000, expenses: 49000, savings: 13800, budget: 48000, actual: 49200, signups: 1200 },
  { month: 'Dec', income: 158500, expenses: 58000, savings: 19500, budget: 48000, actual: 36100, signups: 1280 },
];