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
  MessageSquare,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Trash2,
  MoreHorizontal,
  Bug,
  Lightbulb,
  Heart,
  Clock,
  User,
  Calendar,
  Star,
  ArrowUpRight,
  TrendingUp,
  Download,
  RefreshCw
} from 'lucide-react';
import { toast } from "sonner";

interface Feedback {
  id: string;
  type: 'Bug' | 'Suggestion' | 'Praise';
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Dismissed';
  priority: 'High' | 'Medium' | 'Low';
  userId: string;
  userName: string;
  userEmail: string;
  submittedDate: string;
  resolvedDate?: string;
  adminNotes?: string;
  rating?: number;
  category: string;
  tags: string[];
}

export function FeedbackManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  // Mock feedback data
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: '1',
      type: 'Bug',
      title: 'Expense chart not loading on mobile',
      description: 'When I try to view the expense chart on my phone, it shows a blank screen. This happens consistently across different browsers.',
      status: 'In Progress',
      priority: 'High',
      userId: '101',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      submittedDate: '2024-12-20',
      category: 'Mobile App',
      tags: ['chart', 'mobile', 'loading']
    },
    {
      id: '2',
      type: 'Suggestion',
      title: 'Add dark mode theme',
      description: 'Would love to see a dark mode option for the app. It would be easier on the eyes especially during night time usage.',
      status: 'Pending',
      priority: 'Medium',
      userId: '102',
      userName: 'Sarah Johnson',
      userEmail: 'sarah.j@example.com',
      submittedDate: '2024-12-22',
      category: 'UI/UX',
      tags: ['dark-mode', 'theme', 'accessibility'],
      rating: 4
    },
    {
      id: '3',
      type: 'Praise',
      title: 'Love the new budget tracking feature!',
      description: 'The budget tracking feature is absolutely amazing! It has helped me save so much money. The visual progress bars are very motivating.',
      status: 'Resolved',
      priority: 'Low',
      userId: '103',
      userName: 'Mike Chen',
      userEmail: 'mike.chen@example.com',
      submittedDate: '2024-12-18',
      resolvedDate: '2024-12-19',
      category: 'Features',
      tags: ['budget', 'positive', 'tracking'],
      rating: 5
    },
    {
      id: '4',
      type: 'Bug',
      title: 'Sync issues with bank account',
      description: 'My transactions are not syncing properly with my bank account. Some transactions from 3 days ago are still missing.',
      status: 'Pending',
      priority: 'High',
      userId: '104',
      userName: 'Emily Rodriguez',
      userEmail: 'emily.r@example.com',
      submittedDate: '2024-12-24',
      category: 'Integration',
      tags: ['sync', 'bank', 'transactions']
    },
    {
      id: '5',
      type: 'Suggestion',
      title: 'Export data to CSV',
      description: 'Please add an option to export all expense and income data to CSV format for external analysis.',
      status: 'Resolved',
      priority: 'Medium',
      userId: '105',
      userName: 'David Wilson',
      userEmail: 'david.w@example.com',
      submittedDate: '2024-12-15',
      resolvedDate: '2024-12-25',
      adminNotes: 'Feature implemented in the latest update',
      category: 'Export',
      tags: ['export', 'csv', 'data']
    }
  ]);

  const feedbackTypes = ['Bug', 'Suggestion', 'Praise'];
  const statuses = ['Pending', 'In Progress', 'Resolved', 'Dismissed'];
  const priorities = ['High', 'Medium', 'Low'];
  const categories = ['Mobile App', 'UI/UX', 'Features', 'Integration', 'Export', 'Performance', 'Security'];

  // Filter feedbacks
  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feedback.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feedback.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || feedback.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || feedback.priority === priorityFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  // Statistics
  const totalFeedbacks = feedbacks.length;
  const pendingCount = feedbacks.filter(f => f.status === 'Pending').length;
  const resolvedCount = feedbacks.filter(f => f.status === 'Resolved').length;
  const bugCount = feedbacks.filter(f => f.type === 'Bug').length;
  const avgRating = feedbacks.filter(f => f.rating).reduce((sum, f) => sum + (f.rating || 0), 0) / feedbacks.filter(f => f.rating).length || 0;

  const handleViewFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setAdminNotes(feedback.adminNotes || '');
    setIsDetailModalOpen(true);
  };

  const handleUpdateStatus = async (feedbackId: string, newStatus: string) => {
    setIsLoading(true);
    toast.loading(`Updating status to ${newStatus}...`);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === feedbackId ? {
        ...feedback,
        status: newStatus as any,
        resolvedDate: newStatus === 'Resolved' ? new Date().toISOString().split('T')[0] : undefined
      } : feedback
    ));

    setIsLoading(false);
    toast.success(`Feedback marked as ${newStatus}`);
  };

  const handleSaveNotes = async () => {
    if (!selectedFeedback) return;

    setIsLoading(true);
    toast.loading('Saving admin notes...');

    await new Promise(resolve => setTimeout(resolve, 800));

    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === selectedFeedback.id ? {
        ...feedback,
        adminNotes: adminNotes
      } : feedback
    ));

    setIsLoading(false);
    toast.success('Admin notes saved successfully');
  };

  const handleDeleteFeedback = async (feedbackId: string) => {
    setIsLoading(true);
    toast.loading('Deleting feedback...');

    await new Promise(resolve => setTimeout(resolve, 1000));

    setFeedbacks(feedbacks.filter(feedback => feedback.id !== feedbackId));
    setIsLoading(false);
    toast.success('Feedback deleted successfully');
  };

  const handleExportFeedback = async () => {
    setIsLoading(true);
    toast.loading('Exporting feedback data...');

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast.success('Feedback data exported successfully!');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Bug': return <Bug className="h-4 w-4" />;
      case 'Suggestion': return <Lightbulb className="h-4 w-4" />;
      case 'Praise': return <Heart className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Bug': return 'bg-destructive text-destructive-foreground';
      case 'Suggestion': return 'bg-primary text-primary-foreground';
      case 'Praise': return 'bg-success text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-warning text-white';
      case 'In Progress': return 'bg-primary text-primary-foreground';
      case 'Resolved': return 'bg-success text-white';
      case 'Dismissed': return 'bg-muted text-muted-foreground';
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
          <h1 className="text-2xl sm:text-3xl font-bold">Feedback Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage user feedback, bug reports, and feature suggestions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportFeedback}
            disabled={isLoading}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsLoading(true)}
            disabled={isLoading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Feedback</p>
              <p className="text-2xl font-bold tabular-nums">{totalFeedbacks}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold tabular-nums text-warning">{pendingCount}</p>
            </div>
            <Clock className="h-8 w-8 text-warning" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resolved</p>
              <p className="text-2xl font-bold tabular-nums text-success">{resolvedCount}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Bug Reports</p>
              <p className="text-2xl font-bold tabular-nums text-destructive">{bugCount}</p>
            </div>
            <Bug className="h-8 w-8 text-destructive" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
              <div className="flex items-center gap-1">
                <p className="text-2xl font-bold tabular-nums">{avgRating.toFixed(1)}</p>
                <Star className="h-4 w-4 text-warning fill-warning" />
              </div>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
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
                  placeholder="Search feedback..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="type-filter">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {feedbackTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority-filter">Priority</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {priorities.map(priority => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Feedback Table */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Feedback List ({filteredFeedbacks.length})</h3>
            <p className="text-sm text-muted-foreground">Manage user feedback and bug reports</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden lg:table-cell">Submitted</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeedbacks.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(feedback.type)}>
                        {getTypeIcon(feedback.type)}
                        <span className="ml-1 hidden sm:inline">{feedback.type}</span>
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="font-medium truncate">{feedback.title}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {feedback.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div className="min-w-0">
                        <p className="font-medium truncate">{feedback.userName}</p>
                        <p className="text-sm text-muted-foreground truncate">{feedback.userEmail}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(feedback.status)}>
                      {feedback.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(feedback.priority)}>
                      {feedback.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm">{feedback.category}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {new Date(feedback.submittedDate).toLocaleDateString()}
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
                        <DropdownMenuItem onClick={() => handleViewFeedback(feedback)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleUpdateStatus(feedback.id, 'In Progress')}>
                          <Clock className="mr-2 h-4 w-4" />
                          Mark In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(feedback.id, 'Resolved')}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark Resolved
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Feedback</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this feedback? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteFeedback(feedback.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
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

        {filteredFeedbacks.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No feedback found matching the current filters.</p>
          </div>
        )}
      </Card>

      {/* Feedback Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
            <DialogDescription>
              View and manage feedback from users
            </DialogDescription>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Badge className={getTypeColor(selectedFeedback.type)}>
                    {getTypeIcon(selectedFeedback.type)}
                    <span className="ml-2">{selectedFeedback.type}</span>
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedFeedback.status)}>
                    {selectedFeedback.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Title</Label>
                <p className="text-sm font-medium">{selectedFeedback.title}</p>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <p className="text-sm leading-relaxed bg-accent/30 p-3 rounded-lg">
                  {selectedFeedback.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>User Information</Label>
                  <div className="text-sm">
                    <p className="font-medium">{selectedFeedback.userName}</p>
                    <p className="text-muted-foreground">{selectedFeedback.userEmail}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Priority & Category</Label>
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(selectedFeedback.priority)}>
                      {selectedFeedback.priority}
                    </Badge>
                    <Badge variant="outline">{selectedFeedback.category}</Badge>
                  </div>
                </div>
              </div>

              {selectedFeedback.rating && (
                <div className="space-y-2">
                  <Label>User Rating</Label>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < selectedFeedback.rating! ? 'text-warning fill-warning' : 'text-muted-foreground'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm">{selectedFeedback.rating}/5</span>
                  </div>
                </div>
              )}

              {selectedFeedback.tags.length > 0 && (
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedFeedback.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Admin Notes</Label>
                <Textarea
                  placeholder="Add admin notes or comments..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex justify-between pt-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedFeedback.id, 'In Progress')}
                    disabled={isLoading}
                  >
                    Mark In Progress
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedFeedback.id, 'Resolved')}
                    disabled={isLoading}
                  >
                    Mark Resolved
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={handleSaveNotes} disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Notes'}
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