import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { 
  Users,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Shield,
  Settings,
  TrendingUp,
  Activity,
  Star,
  Clock,
  Send
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from "sonner";
import { simulateApiCall, formatCurrency } from '@/components/utils/managementUtils';

interface Friend {
  id: string;
  name: string;
  email: string;
  username?: string;
  status: 'active' | 'pending' | 'blocked';
  addedDate: string;
  lastActive: string;
  totalEvents: number;
  totalContributed: number;
  totalOwed: number;
  reliability: number; // 0-100
  permissions: {
    canAddExpenses: boolean;
    canEditExpenses: boolean;
    canSettleDues: boolean;
  };
  groups: string[];
}

interface FriendGroup {
  id: string;
  name: string;
  description: string;
  memberIds: string[];
  createdDate: string;
  color: string;
}

export function FriendManagement() {
  const [activeTab, setActiveTab] = useState('friends');
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [groupFilter, setGroupFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [friendForm, setFriendForm] = useState({
    name: '',
    email: '',
    username: ''
  });

  const [groupForm, setGroupForm] = useState({
    name: '',
    description: '',
    color: '#4f46e5'
  });

  // Mock friends data
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      username: 'sarah_j',
      status: 'active',
      addedDate: '2024-01-15',
      lastActive: '2024-12-25',
      totalEvents: 8,
      totalContributed: 45000,
      totalOwed: 2500,
      reliability: 95,
      permissions: {
        canAddExpenses: true,
        canEditExpenses: false,
        canSettleDues: true
      },
      groups: ['college-friends', 'trip-buddies']
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@example.com',
      username: 'mike_c',
      status: 'active',
      addedDate: '2024-02-20',
      lastActive: '2024-12-24',
      totalEvents: 5,
      totalContributed: 28000,
      totalOwed: 0,
      reliability: 88,
      permissions: {
        canAddExpenses: true,
        canEditExpenses: true,
        canSettleDues: true
      },
      groups: ['college-friends']
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@example.com',
      status: 'pending',
      addedDate: '2024-12-20',
      lastActive: '2024-12-20',
      totalEvents: 0,
      totalContributed: 0,
      totalOwed: 0,
      reliability: 0,
      permissions: {
        canAddExpenses: false,
        canEditExpenses: false,
        canSettleDues: false
      },
      groups: []
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david.w@example.com',
      username: 'david_w',
      status: 'active',
      addedDate: '2024-03-10',
      lastActive: '2024-12-22',
      totalEvents: 12,
      totalContributed: 67000,
      totalOwed: 1200,
      reliability: 92,
      permissions: {
        canAddExpenses: true,
        canEditExpenses: false,
        canSettleDues: true
      },
      groups: ['family', 'trip-buddies']
    }
  ]);

  // Mock friend groups
  const [friendGroups, setFriendGroups] = useState<FriendGroup[]>([
    {
      id: 'college-friends',
      name: 'College Friends',
      description: 'Friends from university days',
      memberIds: ['1', '2'],
      createdDate: '2024-01-10',
      color: '#4f46e5'
    },
    {
      id: 'family',
      name: 'Family',
      description: 'Family members and close relatives',
      memberIds: ['4'],
      createdDate: '2024-01-12',
      color: '#10b981'
    },
    {
      id: 'trip-buddies',
      name: 'Trip Buddies',
      description: 'Travel companions and adventure seekers',
      memberIds: ['1', '4'],
      createdDate: '2024-02-01',
      color: '#f59e0b'
    }
  ]);

  // Filter friends
  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         friend.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (friend.username && friend.username.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || friend.status === statusFilter;
    const matchesGroup = groupFilter === 'all' || friend.groups.includes(groupFilter);
    
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const handleAddFriend = async () => {
    if (!friendForm.email) {
      toast.error('Email is required');
      return;
    }

    setIsLoading(true);
    toast.loading('Sending friend request...');
    await simulateApiCall();

    const newFriend: Friend = {
      id: Date.now().toString(),
      name: friendForm.name || friendForm.email.split('@')[0],
      email: friendForm.email,
      username: friendForm.username,
      status: 'pending',
      addedDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      totalEvents: 0,
      totalContributed: 0,
      totalOwed: 0,
      reliability: 0,
      permissions: {
        canAddExpenses: false,
        canEditExpenses: false,
        canSettleDues: false
      },
      groups: []
    };

    setFriends([...friends, newFriend]);
    setFriendForm({ name: '', email: '', username: '' });
    setIsAddFriendOpen(false);
    setIsLoading(false);
    toast.success(`Friend request sent to ${friendForm.email}`);
  };

  const handleCreateGroup = async () => {
    if (!groupForm.name) {
      toast.error('Group name is required');
      return;
    }

    setIsLoading(true);
    toast.loading('Creating group...');
    await simulateApiCall();

    const newGroup: FriendGroup = {
      id: Date.now().toString(),
      name: groupForm.name,
      description: groupForm.description,
      memberIds: [],
      createdDate: new Date().toISOString().split('T')[0],
      color: groupForm.color
    };

    setFriendGroups([...friendGroups, newGroup]);
    setGroupForm({ name: '', description: '', color: '#4f46e5' });
    setIsCreateGroupOpen(false);
    setIsLoading(false);
    toast.success(`Group "${groupForm.name}" created successfully!`);
  };

  const handleUpdatePermissions = async (friendId: string, permissions: Friend['permissions']) => {
    setIsLoading(true);
    toast.loading('Updating permissions...');
    await simulateApiCall(500);

    setFriends(friends.map(friend => 
      friend.id === friendId ? { ...friend, permissions } : friend
    ));

    setIsLoading(false);
    toast.success('Permissions updated successfully');
  };

  const handleRemoveFriend = async (friendId: string) => {
    const friend = friends.find(f => f.id === friendId);
    if (!friend) return;

    if (!confirm(`Are you sure you want to remove ${friend.name} from your friends?`)) return;

    setIsLoading(true);
    toast.loading('Removing friend...');
    await simulateApiCall();

    setFriends(friends.filter(f => f.id !== friendId));
    setIsLoading(false);
    toast.success(`${friend.name} removed from friends`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-white';
      case 'pending': return 'bg-warning text-white';
      case 'blocked': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 90) return 'text-success';
    if (reliability >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getFriendActivityData = () => {
    return friends
      .filter(f => f.status === 'active')
      .map(friend => ({
        name: friend.name.split(' ')[0],
        events: friend.totalEvents,
        contributed: friend.totalContributed,
        reliability: friend.reliability
      }));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Friend Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your event companions and build your friend circle
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Create Friend Group</DialogTitle>
                <DialogDescription>
                  Create a group to organize your friends
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="group-name">Group Name *</Label>
                  <Input
                    id="group-name"
                    placeholder="e.g., College Friends, Family"
                    value={groupForm.name}
                    onChange={(e) => setGroupForm({...groupForm, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="group-description">Description</Label>
                  <Input
                    id="group-description"
                    placeholder="Brief description of the group"
                    value={groupForm.description}
                    onChange={(e) => setGroupForm({...groupForm, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="group-color">Group Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="group-color"
                      type="color"
                      value={groupForm.color}
                      onChange={(e) => setGroupForm({...groupForm, color: e.target.value})}
                      className="w-16 h-10"
                    />
                    <span className="text-sm text-muted-foreground">{groupForm.color}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateGroupOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateGroup} disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Group'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddFriendOpen} onOpenChange={setIsAddFriendOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Friend
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Add New Friend</DialogTitle>
                <DialogDescription>
                  Send a friend request via email or CostEclipse username
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="friend-email">Email Address *</Label>
                  <Input
                    id="friend-email"
                    type="email"
                    placeholder="friend@example.com"
                    value={friendForm.email}
                    onChange={(e) => setFriendForm({...friendForm, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="friend-name">Name (Optional)</Label>
                  <Input
                    id="friend-name"
                    placeholder="Friend's name"
                    value={friendForm.name}
                    onChange={(e) => setFriendForm({...friendForm, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="friend-username">CostEclipse Username (Optional)</Label>
                  <Input
                    id="friend-username"
                    placeholder="@username"
                    value={friendForm.username}
                    onChange={(e) => setFriendForm({...friendForm, username: e.target.value})}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddFriendOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddFriend} disabled={isLoading}>
                    <Send className="mr-2 h-4 w-4" />
                    {isLoading ? 'Sending...' : 'Send Request'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="friends" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Friends</span>
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Groups</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Permissions</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Activity</span>
          </TabsTrigger>
        </TabsList>

        {/* Friends List */}
        <TabsContent value="friends">
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Friends</p>
                    <p className="text-2xl font-bold">{friends.filter(f => f.status === 'active').length}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Requests</p>
                    <p className="text-2xl font-bold text-warning">{friends.filter(f => f.status === 'pending').length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-warning" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Groups</p>
                    <p className="text-2xl font-bold">{friendGroups.length}</p>
                  </div>
                  <Shield className="h-8 w-8 text-success" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Reliability</p>
                    <p className="text-2xl font-bold">
                      {Math.round(friends.filter(f => f.status === 'active').reduce((sum, f) => sum + f.reliability, 0) / friends.filter(f => f.status === 'active').length)}%
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-secondary" />
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
                    <Label htmlFor="search">Search Friends</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search by name, email, or username..."
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
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="group-filter">Group</Label>
                    <Select value={groupFilter} onValueChange={setGroupFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Groups" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Groups</SelectItem>
                        {friendGroups.map(group => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Friends Table */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Friends ({filteredFriends.length})</h3>
                  <p className="text-sm text-muted-foreground">Manage your friend connections</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Friend</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Events</TableHead>
                      <TableHead>Contributed</TableHead>
                      <TableHead>Reliability</TableHead>
                      <TableHead>Groups</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFriends.map((friend) => (
                      <TableRow key={friend.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <div className="h-full w-full bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-white font-medium">
                                {friend.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            </Avatar>
                            <div>
                              <p className="font-medium">{friend.name}</p>
                              <p className="text-sm text-muted-foreground">{friend.email}</p>
                              {friend.username && (
                                <p className="text-sm text-muted-foreground">@{friend.username}</p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(friend.status)}>
                            {friend.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{friend.totalEvents}</TableCell>
                        <TableCell>{formatCurrency(friend.totalContributed)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${getReliabilityColor(friend.reliability)}`}>
                              {friend.reliability}%
                            </span>
                            {friend.reliability >= 90 && <Star className="h-4 w-4 text-warning fill-warning" />}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {friend.groups.slice(0, 2).map(groupId => {
                              const group = friendGroups.find(g => g.id === groupId);
                              return group ? (
                                <Badge key={groupId} variant="outline" className="text-xs">
                                  {group.name}
                                </Badge>
                              ) : null;
                            })}
                            {friend.groups.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{friend.groups.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => {}}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveFriend(friend.id)}
                              className="text-destructive hover:text-destructive"
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

              {filteredFriends.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No friends found matching the current filters.</p>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* Friend Groups */}
        <TabsContent value="groups">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {friendGroups.map((group) => (
              <Card key={group.id} className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: group.color }}
                        ></div>
                        <h3 className="font-semibold">{group.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Members</span>
                      <span className="font-medium">{group.memberIds.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Created</span>
                      <span className="font-medium">{new Date(group.createdDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {group.memberIds.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Group Members</p>
                      <div className="space-y-1">
                        {group.memberIds.slice(0, 3).map(memberId => {
                          const friend = friends.find(f => f.id === memberId);
                          return friend ? (
                            <div key={memberId} className="flex items-center gap-2 text-sm">
                              <Avatar className="h-6 w-6">
                                <div className="h-full w-full bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-white text-xs font-medium">
                                  {friend.name.split(' ').map(n => n[0]).join('')}
                                </div>
                              </Avatar>
                              <span>{friend.name}</span>
                            </div>
                          ) : null;
                        })}
                        {group.memberIds.length > 3 && (
                          <p className="text-xs text-muted-foreground">+{group.memberIds.length - 3} more</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <UserPlus className="mr-1 h-3 w-3" />
                      Add Members
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {friendGroups.length === 0 && (
              <div className="col-span-full text-center py-8">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No friend groups created yet.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsCreateGroupOpen(true)}
                >
                  Create Your First Group
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Permissions */}
        <TabsContent value="permissions">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Friend Permissions</h3>
                <p className="text-sm text-muted-foreground">Manage what your friends can do in events</p>
              </div>
            </div>

            <div className="space-y-6">
              {friends.filter(f => f.status === 'active').map((friend) => (
                <div key={friend.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <div className="h-full w-full bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-white font-medium">
                        {friend.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </Avatar>
                    <div>
                      <p className="font-medium">{friend.name}</p>
                      <p className="text-sm text-muted-foreground">{friend.email}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Can Add Expenses</p>
                        <p className="text-sm text-muted-foreground">Allow this friend to add new expenses to events</p>
                      </div>
                      <Switch
                        checked={friend.permissions.canAddExpenses}
                        onCheckedChange={(checked) => {
                          const newPermissions = { ...friend.permissions, canAddExpenses: checked };
                          handleUpdatePermissions(friend.id, newPermissions);
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Can Edit Expenses</p>
                        <p className="text-sm text-muted-foreground">Allow this friend to edit existing expenses</p>
                      </div>
                      <Switch
                        checked={friend.permissions.canEditExpenses}
                        onCheckedChange={(checked) => {
                          const newPermissions = { ...friend.permissions, canEditExpenses: checked };
                          handleUpdatePermissions(friend.id, newPermissions);
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Can Settle Dues</p>
                        <p className="text-sm text-muted-foreground">Allow this friend to record payment settlements</p>
                      </div>
                      <Switch
                        checked={friend.permissions.canSettleDues}
                        onCheckedChange={(checked) => {
                          const newPermissions = { ...friend.permissions, canSettleDues: checked };
                          handleUpdatePermissions(friend.id, newPermissions);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Activity Overview */}
        <TabsContent value="activity">
          <div className="space-y-6">
            {/* Activity Chart */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Friend Activity Overview</h3>
                  <p className="text-sm text-muted-foreground">Compare friend participation and contributions</p>
                </div>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>
              
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getFriendActivityData()}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        name === 'contributed' ? formatCurrency(value) : value,
                        name === 'events' ? 'Events' : name === 'contributed' ? 'Contributed' : 'Reliability %'
                      ]}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="events" fill="hsl(var(--primary))" name="events" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Top Performers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">Most Active Friends</h3>
                <div className="space-y-3">
                  {friends
                    .filter(f => f.status === 'active')
                    .sort((a, b) => b.totalEvents - a.totalEvents)
                    .slice(0, 5)
                    .map((friend, index) => (
                      <div key={friend.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{friend.name}</p>
                            <p className="text-sm text-muted-foreground">{friend.totalEvents} events</p>
                          </div>
                        </div>
                        <Badge variant="outline">{friend.reliability}% reliable</Badge>
                      </div>
                    ))}
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">Top Contributors</h3>
                <div className="space-y-3">
                  {friends
                    .filter(f => f.status === 'active')
                    .sort((a, b) => b.totalContributed - a.totalContributed)
                    .slice(0, 5)
                    .map((friend, index) => (
                      <div key={friend.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-success text-white text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{friend.name}</p>
                            <p className="text-sm text-muted-foreground">{formatCurrency(friend.totalContributed)}</p>
                          </div>
                        </div>
                        {friend.reliability >= 90 && <Star className="h-4 w-4 text-warning fill-warning" />}
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}