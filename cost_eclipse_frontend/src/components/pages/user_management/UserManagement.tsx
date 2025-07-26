import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar } from '@/components/ui/avatar';
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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Users,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  UserX,
  Trash2,
  RotateCcw,
  Mail,
  Calendar,
  Clock,
  Shield,
  User,
  MoreHorizontal,
  ChevronDown,
  FileText,
  SortAsc,
  SortDesc,
  RefreshCw
} from 'lucide-react';
import { toast } from "sonner";

interface UserData {
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

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data
  const [users, setUsers] = useState<UserData[]>([
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
  ]);

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesSubscription = subscriptionFilter === 'all' || user.subscriptionStatus === subscriptionFilter;
      
      return matchesSearch && matchesRole && matchesStatus && matchesSubscription;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof UserData];
      const bValue = b[sortBy as keyof UserData];
      const modifier = sortOrder === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * modifier;
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * modifier;
      }
      
      return 0;
    });

  // User actions
  const handleViewProfile = (user: UserData) => {
    setSelectedUser(user);
    setIsProfileModalOpen(true);
    toast.success(`Viewing profile for ${user.name}`);
  };

  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
    toast.info(`Editing user: ${user.name}`);
  };

  const handleDisableUser = async (userId: string) => {
    setIsLoading(true);
    toast.loading("Disabling user account...");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: 'inactive' as const } : user
    ));
    
    setIsLoading(false);
    toast.success("User account disabled successfully");
  };

  const handleActivateUser = async (userId: string) => {
    setIsLoading(true);
    toast.loading("Activating user account...");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: 'active' as const } : user
    ));
    
    setIsLoading(false);
    toast.success("User account activated successfully");
  };

  const handleDeleteUser = async (userId: string) => {
    setIsLoading(true);
    toast.loading("Deleting user account...");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setUsers(users.filter(user => user.id !== userId));
    
    setIsLoading(false);
    toast.success("User account deleted successfully");
  };

  const handleResetPassword = async (userId: string) => {
    setIsLoading(true);
    toast.loading("Sending password reset email...");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    toast.success("Password reset email sent successfully");
  };

  const handleExportUsers = async (format: 'csv' | 'pdf') => {
    setIsLoading(true);
    toast.loading(`Preparing ${format.toUpperCase()} export...`);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    toast.success(`User list exported to ${format.toUpperCase()} successfully! Check your downloads.`);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-destructive text-destructive-foreground';
      case 'premium': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-white';
      case 'inactive': return 'bg-muted text-muted-foreground';
      case 'suspended': return 'bg-warning text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'enterprise': return 'bg-primary text-primary-foreground';
      case 'premium': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsLoading(true)}
            disabled={isLoading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export Format</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExportUsers('csv')}>
                <FileText className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportUsers('pdf')}>
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <Label htmlFor="search">Search Users</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <Label htmlFor="role-filter">Role</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subscription Filter */}
            <div>
              <Label htmlFor="subscription-filter">Subscription</Label>
              <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Plans" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Users ({filteredUsers.length})</h3>
            <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Avatar</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('name')}
                    className="h-auto p-0 font-semibold"
                  >
                    Name
                    {sortBy === 'name' && (
                      sortOrder === 'asc' ? <SortAsc className="ml-2 h-4 w-4" /> : <SortDesc className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('email')}
                    className="h-auto p-0 font-semibold"
                  >
                    Email
                    {sortBy === 'email' && (
                      sortOrder === 'asc' ? <SortAsc className="ml-2 h-4 w-4" /> : <SortDesc className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead className="hidden md:table-cell">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('registeredDate')}
                    className="h-auto p-0 font-semibold"
                  >
                    Registered
                    {sortBy === 'registeredDate' && (
                      sortOrder === 'asc' ? <SortAsc className="ml-2 h-4 w-4" /> : <SortDesc className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead className="hidden lg:table-cell">Last Login</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar className="h-8 w-8">
                      <div className="h-full w-full bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground md:hidden">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSubscriptionColor(user.subscriptionStatus)}>
                      {user.subscriptionStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {new Date(user.registeredDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3" />
                      {user.lastLogin}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleViewProfile(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleResetPassword(user.id)}>
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handleDisableUser(user.id)}>
                            <UserX className="mr-2 h-4 w-4" />
                            Disable Account
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleActivateUser(user.id)}>
                            <User className="mr-2 h-4 w-4" />
                            Activate Account
                          </DropdownMenuItem>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Account
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete User Account</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {user.name}'s account? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete Account
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No users found matching the current filters.</p>
          </div>
        )}
      </Card>

      {/* User Profile Modal */}
      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>
              View detailed information about the user
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <div className="h-full w-full bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge className={getRoleColor(selectedUser.role)}>
                      {selectedUser.role}
                    </Badge>
                    <Badge className={getStatusColor(selectedUser.status)}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Subscription Status</Label>
                  <Badge className={getSubscriptionColor(selectedUser.subscriptionStatus)}>
                    {selectedUser.subscriptionStatus}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label>Registered Date</Label>
                  <p className="text-sm">{new Date(selectedUser.registeredDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-2">
                  <Label>Last Login</Label>
                  <p className="text-sm">{selectedUser.lastLogin}</p>
                </div>
                <div className="space-y-2">
                  <Label>Total Expenses</Label>
                  <p className="text-sm font-medium tabular-nums">₹{selectedUser.totalExpenses.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <Label>Total Income</Label>
                  <p className="text-sm font-medium tabular-nums">₹{selectedUser.totalIncome.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}