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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HelpCircle,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle,
  UserCheck,
  Plus,
  Upload,
  MoreHorizontal,
  Send,
  Paperclip,
  Calendar,
  User,
  AlertCircle,
  ArrowRight,
  Zap
} from 'lucide-react';
import { toast } from "sonner";

interface Query {
  id: string;
  subject: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  userId: string;
  userName: string;
  userEmail: string;
  assignedTo?: string;
  assignedAdminName?: string;
  createdDate: string;
  lastUpdated: string;
  attachments?: string[];
  responses: QueryResponse[];
}

interface QueryResponse {
  id: string;
  message: string;
  author: string;
  authorType: 'user' | 'admin';
  timestamp: string;
  isInternal?: boolean;
}

interface QueryFormData {
  subject: string;
  message: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  attachments: File[];
}

export function QueryManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [newResponse, setNewResponse] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
let userRole = 'user'
  // Form state
  const [formData, setFormData] = useState<QueryFormData>({
    subject: '',
    message: '',
    category: '',
    priority: 'Medium',
    attachments: []
  });

  const queryCategories = [
    'Account Issues',
    'Technical Support',
    'Billing & Payments',
    'Feature Request',
    'Bug Report',
    'Data & Privacy',
    'Mobile App',
    'Bank Integration',
    'General Inquiry'
  ];

  const adminUsers = [
    { id: 'admin1', name: 'Alex Johnson', specialization: 'Technical' },
    { id: 'admin2', name: 'Sarah Martinez', specialization: 'Billing' },
    { id: 'admin3', name: 'David Chen', specialization: 'Mobile' },
    { id: 'admin4', name: 'Emily White', specialization: 'General' }
  ];

  // Mock queries data
  const [queries, setQueries] = useState<Query[]>([
    {
      id: '1',
      subject: 'Cannot sync bank transactions',
      message: 'Hi, I\'m having trouble syncing my bank transactions. The app keeps showing an error message when I try to connect my account.',
      status: 'Open',
      priority: 'High',
      category: 'Bank Integration',
      userId: '101',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      createdDate: '2024-12-24',
      lastUpdated: '2024-12-24',
      responses: []
    },
    {
      id: '2',
      subject: 'Request for expense export feature',
      message: 'Would like to request a feature to export expenses in PDF format for my tax filing. Currently only CSV is available.',
      status: 'In Progress',
      priority: 'Medium',
      category: 'Feature Request',
      userId: '102',
      userName: 'Sarah Johnson',
      userEmail: 'sarah.j@example.com',
      assignedTo: 'admin1',
      assignedAdminName: 'Alex Johnson',
      createdDate: '2024-12-22',
      lastUpdated: '2024-12-25',
      responses: [
        {
          id: 'r1',
          message: 'Thank you for the suggestion! We are currently working on implementing PDF export functionality. Expected to be available in the next update.',
          author: 'Alex Johnson',
          authorType: 'admin',
          timestamp: '2024-12-23 14:30'
        }
      ]
    },
    {
      id: '3',
      subject: 'Mobile app crashes on startup',
      message: 'The mobile app crashes immediately when I try to open it. This started happening after the latest update. I\'m using iPhone 12 with iOS 16.',
      status: 'Resolved',
      priority: 'High',
      category: 'Mobile App',
      userId: '103',
      userName: 'Mike Chen',
      userEmail: 'mike.chen@example.com',
      assignedTo: 'admin3',
      assignedAdminName: 'David Chen',
      createdDate: '2024-12-20',
      lastUpdated: '2024-12-24',
      responses: [
        {
          id: 'r2',
          message: 'We\'ve identified the issue and pushed a hotfix. Please update to version 2.1.1 and the crash should be resolved.',
          author: 'David Chen',
          authorType: 'admin',
          timestamp: '2024-12-21 10:15'
        },
        {
          id: 'r3',
          message: 'Thanks! The app is working perfectly now after the update.',
          author: 'Mike Chen',
          authorType: 'user',
          timestamp: '2024-12-21 16:45'
        }
      ]
    },
    {
      id: '4',
      subject: 'Billing question about premium plan',
      message: 'I was charged twice for my premium subscription this month. Could you please check my billing and refund the duplicate charge?',
      status: 'In Progress',
      priority: 'Medium',
      category: 'Billing & Payments',
      userId: '104',
      userName: 'Emily Rodriguez',
      userEmail: 'emily.r@example.com',
      assignedTo: 'admin2',
      assignedAdminName: 'Sarah Martinez',
      createdDate: '2024-12-23',
      lastUpdated: '2024-12-25',
      responses: [
        {
          id: 'r4',
          message: 'I\'ve reviewed your account and can see the duplicate charge. Processing a refund now, it should appear in your account within 3-5 business days.',
          author: 'Sarah Martinez',
          authorType: 'admin',
          timestamp: '2024-12-24 09:20'
        }
      ]
    }
  ]);

  // Filter queries based on user role
  const getUserQueries = () => {
    if (userRole === 'admin') {
      return queries;
    }
    // For regular users, show only their queries
    return queries.filter(query => query.userId === '101'); // Mock current user ID
  };

  const filteredQueries = getUserQueries().filter(query => {
    const matchesSearch = query.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         query.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || query.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || query.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Statistics
  const totalQueries = getUserQueries().length;
  const openQueries = getUserQueries().filter(q => q.status === 'Open').length;
  const inProgressQueries = getUserQueries().filter(q => q.status === 'In Progress').length;
  const resolvedQueries = getUserQueries().filter(q => q.status === 'Resolved').length;

  const handleCreateQuery = async () => {
    if (!formData.subject || !formData.message || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    toast.loading('Submitting query...');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const newQuery: Query = {
      id: Date.now().toString(),
      subject: formData.subject,
      message: formData.message,
      status: 'Open',
      priority: formData.priority,
      category: formData.category,
      userId: '101', // Mock current user ID
      userName: 'Current User',
      userEmail: 'current.user@example.com',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      responses: []
    };

    setQueries([newQuery, ...queries]);
    setFormData({
      subject: '',
      message: '',
      category: '',
      priority: 'Medium',
      attachments: []
    });
    setIsCreateModalOpen(false);
    setIsLoading(false);
    toast.success('Query submitted successfully! We\'ll get back to you soon.');
  };

  const handleViewQuery = (query: Query) => {
    setSelectedQuery(query);
    setIsDetailModalOpen(true);
  };

  const handleAssignQuery = async (queryId: string, adminId: string) => {
    setIsLoading(true);
    toast.loading('Assigning query...');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const admin = adminUsers.find(a => a.id === adminId);
    setQueries(queries.map(query => 
      query.id === queryId ? {
        ...query,
        assignedTo: adminId,
        assignedAdminName: admin?.name,
        status: 'In Progress',
        lastUpdated: new Date().toISOString().split('T')[0]
      } : query
    ));

    setIsLoading(false);
    toast.success(`Query assigned to ${admin?.name}`);
  };

  const handleUpdateStatus = async (queryId: string, newStatus: string) => {
    setIsLoading(true);
    toast.loading(`Updating status to ${newStatus}...`);

    await new Promise(resolve => setTimeout(resolve, 800));

    setQueries(queries.map(query => 
      query.id === queryId ? {
        ...query,
        status: newStatus as any,
        lastUpdated: new Date().toISOString().split('T')[0]
      } : query
    ));

    setIsLoading(false);
    toast.success(`Query marked as ${newStatus}`);
  };

  const handleAddResponse = async () => {
    if (!selectedQuery || !newResponse.trim()) {
      toast.error('Please enter a response message');
      return;
    }

    setIsLoading(true);
    toast.loading('Adding response...');

    await new Promise(resolve => setTimeout(resolve, 800));

    const response: QueryResponse = {
      id: Date.now().toString(),
      message: newResponse,
      author: userRole === 'admin' ? 'Admin User' : 'Current User',
      authorType: userRole as 'user' | 'admin',
      timestamp: new Date().toLocaleString(),
      isInternal: isInternalNote && userRole === 'admin'
    };

    setQueries(queries.map(query => 
      query.id === selectedQuery.id ? {
        ...query,
        responses: [...query.responses, response],
        lastUpdated: new Date().toISOString().split('T')[0]
      } : query
    ));

    setSelectedQuery({
      ...selectedQuery,
      responses: [...selectedQuery.responses, response]
    });

    setNewResponse('');
    setIsInternalNote(false);
    setIsLoading(false);
    toast.success('Response added successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-warning text-white';
      case 'In Progress': return 'bg-primary text-primary-foreground';
      case 'Resolved': return 'bg-success text-white';
      case 'Closed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-destructive text-destructive-foreground';
      case 'Medium': return 'bg-warning text-white';
      case 'Low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {userRole === 'admin' ? 'Query Management' : 'Support Center'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {userRole === 'admin' 
              ? 'Manage and respond to user support queries'
              : 'Get help and support for your account'
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90">
                <Plus className="mr-2 h-4 w-4" />
                {userRole === 'admin' ? 'Create Query' : 'Submit Query'}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Submit New Query</DialogTitle>
                <DialogDescription>
                  Describe your issue or question and we'll get back to you promptly
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
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
                        {queryCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value: 'High' | 'Medium' | 'Low') => setFormData({...formData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Provide detailed information about your issue..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" type="button">
                      <Paperclip className="mr-2 h-4 w-4" />
                      Add Files
                    </Button>
                    <span className="text-sm text-muted-foreground">Max 5MB per file</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateQuery} disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit Query'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Queries</p>
              <p className="text-2xl font-bold tabular-nums">{totalQueries}</p>
            </div>
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Open</p>
              <p className="text-2xl font-bold tabular-nums text-warning">{openQueries}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-warning" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold tabular-nums text-primary">{inProgressQueries}</p>
            </div>
            <Clock className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resolved</p>
              <p className="text-2xl font-bold tabular-nums text-success">{resolvedQueries}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-success" />
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
                  placeholder="Search queries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category-filter">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {queryCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Queries Table */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">
              {userRole === 'admin' ? 'All Queries' : 'My Queries'} ({filteredQueries.length})
            </h3>
            <p className="text-sm text-muted-foreground">
              {userRole === 'admin' ? 'Manage support requests' : 'Track your support requests'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                {userRole === 'admin' && <TableHead>User</TableHead>}
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                {userRole === 'admin' && <TableHead className="hidden lg:table-cell">Assigned To</TableHead>}
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQueries.map((query) => (
                <TableRow key={query.id}>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="font-medium truncate">{query.subject}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {query.message}
                      </p>
                    </div>
                  </TableCell>
                  {userRole === 'admin' && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div className="min-w-0">
                          <p className="font-medium truncate">{query.userName}</p>
                          <p className="text-sm text-muted-foreground truncate">{query.userEmail}</p>
                        </div>
                      </div>
                    </TableCell>
                  )}
                  <TableCell>
                    <Badge className={getStatusColor(query.status)}>
                      {query.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(query.priority)}>
                      {query.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm">{query.category}</span>
                  </TableCell>
                  {userRole === 'admin' && (
                    <TableCell className="hidden lg:table-cell">
                      {query.assignedAdminName ? (
                        <div className="flex items-center gap-1">
                          <UserCheck className="h-3 w-3" />
                          <span className="text-sm">{query.assignedAdminName}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Unassigned</span>
                      )}
                    </TableCell>
                  )}
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {new Date(query.createdDate).toLocaleDateString()}
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
                        <DropdownMenuItem onClick={() => handleViewQuery(query)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {userRole === 'admin' && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleUpdateStatus(query.id, 'In Progress')}>
                              <Clock className="mr-2 h-4 w-4" />
                              Mark In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(query.id, 'Resolved')}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark Resolved
                            </DropdownMenuItem>
                            {!query.assignedTo && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Assign To</DropdownMenuLabel>
                                {adminUsers.map(admin => (
                                  <DropdownMenuItem 
                                    key={admin.id}
                                    onClick={() => handleAssignQuery(query.id, admin.id)}
                                  >
                                    <UserCheck className="mr-2 h-4 w-4" />
                                    {admin.name}
                                  </DropdownMenuItem>
                                ))}
                              </>
                            )}
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredQueries.length === 0 && (
          <div className="text-center py-8">
            <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No queries found matching the current filters.</p>
          </div>
        )}
      </Card>

      {/* Query Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Query Details</DialogTitle>
            <DialogDescription>
              View and respond to support query
            </DialogDescription>
          </DialogHeader>
          {selectedQuery && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedQuery.status)}>
                    {selectedQuery.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Badge className={getPriorityColor(selectedQuery.priority)}>
                    {selectedQuery.priority}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <p className="text-sm font-medium">{selectedQuery.subject}</p>
              </div>

              <div className="space-y-2">
                <Label>Original Message</Label>
                <p className="text-sm leading-relaxed bg-accent/30 p-3 rounded-lg">
                  {selectedQuery.message}
                </p>
              </div>

              {userRole === 'admin' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>User Information</Label>
                    <div className="text-sm">
                      <p className="font-medium">{selectedQuery.userName}</p>
                      <p className="text-muted-foreground">{selectedQuery.userEmail}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Assignment</Label>
                    <div className="text-sm">
                      {selectedQuery.assignedAdminName ? (
                        <p className="font-medium">{selectedQuery.assignedAdminName}</p>
                      ) : (
                        <p className="text-muted-foreground">Unassigned</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Conversation Thread */}
              {selectedQuery.responses.length > 0 && (
                <div className="space-y-4">
                  <Label>Conversation</Label>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedQuery.responses.map((response) => (
                      <div key={response.id} className={`p-3 rounded-lg ${
                        response.authorType === 'admin' 
                          ? 'bg-primary/10 ml-4' 
                          : 'bg-accent/30 mr-4'
                      } ${response.isInternal ? 'border-2 border-warning/30' : ''}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{response.author}</span>
                            <Badge variant={response.authorType === 'admin' ? 'default' : 'outline'}>
                              {response.authorType}
                            </Badge>
                            {response.isInternal && (
                              <Badge variant="outline" className="text-warning">
                                Internal
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{response.timestamp}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{response.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Response */}
              <div className="space-y-3 border-t pt-4">
                <Label>Add Response</Label>
                <Textarea
                  placeholder="Type your response..."
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  rows={3}
                />
                {userRole === 'admin' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="internal-note"
                      checked={isInternalNote}
                      onChange={(e) => setIsInternalNote(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="internal-note" className="text-sm">
                      Internal note (not visible to user)
                    </Label>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                {userRole === 'admin' && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(selectedQuery.id, 'In Progress')}
                      disabled={isLoading}
                    >
                      Mark In Progress
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(selectedQuery.id, 'Resolved')}
                      disabled={isLoading}
                    >
                      Mark Resolved
                    </Button>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={handleAddResponse} disabled={isLoading || !newResponse.trim()}>
                    <Send className="mr-2 h-4 w-4" />
                    {isLoading ? 'Sending...' : 'Send Response'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}