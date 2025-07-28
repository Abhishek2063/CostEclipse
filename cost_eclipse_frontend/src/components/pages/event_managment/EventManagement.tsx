import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar } from '@/components/ui/avatar';
import { 
  Calendar,
  Users,
  Plus,
  MapPin,
  DollarSign,
  Receipt,
  UserPlus,
  Edit,
  Trash2,
  Download,
  Share2,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  PieChart,
  FileText,
  Camera,
  Send
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { toast } from "sonner";
import { formatCurrency, getRandomColor, simulateApiCall } from '@/components/utils/managementUtils';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  currency: string;
  createdBy: string;
  creatorName: string;
  status: 'active' | 'completed' | 'cancelled';
  totalExpenses: number;
  totalContributions: number;
  participants: EventParticipant[];
  expenses: EventExpense[];
  initialContributions: InitialContribution[];
}

interface EventParticipant {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'contributor' | 'viewer';
  permissions: {
    canAddExpenses: boolean;
    canEditExpenses: boolean;
    canSettleDues: boolean;
  };
  totalOwed: number;
  totalPaid: number;
  balance: number;
}

interface EventExpense {
  id: string;
  title: string;
  amount: number;
  category: string;
  paidBy: string;
  paidByName: string;
  beneficiaries: string[];
  splitType: 'equal' | 'custom';
  customSplits?: { [participantId: string]: number };
  date: string;
  notes?: string;
  attachments?: string[];
}

interface InitialContribution {
  id: string;
  contributorId: string;
  contributorName: string;
  amount: number;
  date: string;
}

const expenseCategories = [
  'Food & Dining',
  'Transportation',
  'Accommodation',
  'Entertainment',
  'Shopping',
  'Activities',
  'Other'
];

const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' }
];

export function EventManagement() {
  const [activeTab, setActiveTab] = useState('events');
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    currency: 'INR',
    initialAmount: '',
    initialContributor: ''
  });

  const [expenseForm, setExpenseForm] = useState({
    title: '',
    amount: '',
    category: '',
    paidBy: '',
    beneficiaries: [] as string[],
    splitType: 'equal' as 'equal' | 'custom',
    notes: ''
  });

  // Mock events data
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Goa Beach Trip',
      description: 'Weekend getaway with college friends',
      startDate: '2024-12-28',
      endDate: '2024-12-30',
      currency: 'INR',
      createdBy: '1',
      creatorName: 'John Doe',
      status: 'active',
      totalExpenses: 25000,
      totalContributions: 20000,
      participants: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'organizer',
          permissions: { canAddExpenses: true, canEditExpenses: true, canSettleDues: true },
          totalOwed: 8333,
          totalPaid: 12000,
          balance: -3667
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          role: 'contributor',
          permissions: { canAddExpenses: true, canEditExpenses: false, canSettleDues: true },
          totalOwed: 8333,
          totalPaid: 5000,
          balance: 3333
        },
        {
          id: '3',
          name: 'Mike Chen',
          email: 'mike@example.com',
          role: 'contributor',
          permissions: { canAddExpenses: true, canEditExpenses: false, canSettleDues: true },
          totalOwed: 8334,
          totalPaid: 8000,
          balance: 334
        }
      ],
      expenses: [
        {
          id: '1',
          title: 'Hotel Booking',
          amount: 15000,
          category: 'Accommodation',
          paidBy: '1',
          paidByName: 'John Doe',
          beneficiaries: ['1', '2', '3'],
          splitType: 'equal',
          date: '2024-12-28',
          notes: '3 nights at beach resort'
        },
        {
          id: '2',
          title: 'Dinner at Seafood Restaurant',
          amount: 4500,
          category: 'Food & Dining',
          paidBy: '2',
          paidByName: 'Sarah Johnson',
          beneficiaries: ['1', '2', '3'],
          splitType: 'equal',
          date: '2024-12-28'
        },
        {
          id: '3',
          title: 'Taxi to Airport',
          amount: 1200,
          category: 'Transportation',
          paidBy: '3',
          paidByName: 'Mike Chen',
          beneficiaries: ['1', '2', '3'],
          splitType: 'equal',
          date: '2024-12-30'
        }
      ],
      initialContributions: [
        {
          id: '1',
          contributorId: '1',
          contributorName: 'John Doe',
          amount: 10000,
          date: '2024-12-25'
        },
        {
          id: '2',
          contributorId: '2',
          contributorName: 'Sarah Johnson',
          amount: 10000,
          date: '2024-12-26'
        }
      ]
    }
  ]);

  const handleCreateEvent = async () => {
    if (!eventForm.title || !eventForm.startDate || !eventForm.endDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    toast.loading('Creating event...');
    await simulateApiCall();

    const newEvent: Event = {
      id: Date.now().toString(),
      title: eventForm.title,
      description: eventForm.description,
      startDate: eventForm.startDate,
      endDate: eventForm.endDate,
      currency: eventForm.currency,
      createdBy: '1',
      creatorName: 'Current User',
      status: 'active',
      totalExpenses: 0,
      totalContributions: eventForm.initialAmount ? parseFloat(eventForm.initialAmount) : 0,
      participants: [
        {
          id: '1',
          name: 'Current User',
          email: 'user@example.com',
          role: 'organizer',
          permissions: { canAddExpenses: true, canEditExpenses: true, canSettleDues: true },
          totalOwed: 0,
          totalPaid: eventForm.initialAmount ? parseFloat(eventForm.initialAmount) : 0,
          balance: eventForm.initialAmount ? -parseFloat(eventForm.initialAmount) : 0
        }
      ],
      expenses: [],
      initialContributions: eventForm.initialAmount ? [
        {
          id: '1',
          contributorId: '1',
          contributorName: 'Current User',
          amount: parseFloat(eventForm.initialAmount),
          date: new Date().toISOString().split('T')[0]
        }
      ] : []
    };

    setEvents([newEvent, ...events]);
    setEventForm({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      currency: 'INR',
      initialAmount: '',
      initialContributor: ''
    });
    setIsCreateEventOpen(false);
    setIsLoading(false);
    toast.success('Event created successfully!');
  };

  const handleAddExpense = async () => {
    if (!selectedEvent || !expenseForm.title || !expenseForm.amount || !expenseForm.paidBy) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    toast.loading('Adding expense...');
    await simulateApiCall();

    const payer = selectedEvent.participants.find(p => p.id === expenseForm.paidBy);
    const newExpense: EventExpense = {
      id: Date.now().toString(),
      title: expenseForm.title,
      amount: parseFloat(expenseForm.amount),
      category: expenseForm.category,
      paidBy: expenseForm.paidBy,
      paidByName: payer?.name || 'Unknown',
      beneficiaries: expenseForm.beneficiaries.length > 0 ? expenseForm.beneficiaries : selectedEvent.participants.map(p => p.id),
      splitType: expenseForm.splitType,
      date: new Date().toISOString().split('T')[0],
      notes: expenseForm.notes
    };

    // Update the event with new expense
    const updatedEvent = {
      ...selectedEvent,
      expenses: [...selectedEvent.expenses, newExpense],
      totalExpenses: selectedEvent.totalExpenses + parseFloat(expenseForm.amount)
    };

    setEvents(events.map(e => e.id === selectedEvent.id ? updatedEvent : e));
    setSelectedEvent(updatedEvent);
    setExpenseForm({
      title: '',
      amount: '',
      category: '',
      paidBy: '',
      beneficiaries: [],
      splitType: 'equal',
      notes: ''
    });
    setIsAddExpenseOpen(false);
    setIsLoading(false);
    toast.success('Expense added successfully!');
  };

  const handleInviteFriend = async (eventId: string) => {
    const email = prompt('Enter friend\'s email to invite:');
    if (!email) return;

    setIsLoading(true);
    toast.loading('Sending invitation...');
    await simulateApiCall();

    // Add the friend to the event participants
    const event = events.find(e => e.id === eventId);
    if (event) {
      const newParticipant: EventParticipant = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email: email,
        role: 'contributor',
        permissions: { canAddExpenses: true, canEditExpenses: false, canSettleDues: true },
        totalOwed: 0,
        totalPaid: 0,
        balance: 0
      };

      const updatedEvent = {
        ...event,
        participants: [...event.participants, newParticipant]
      };

      setEvents(events.map(e => e.id === eventId ? updatedEvent : e));
      
      if (selectedEvent?.id === eventId) {
        setSelectedEvent(updatedEvent);
      }
    }

    setIsLoading(false);
    toast.success(`Invitation sent to ${email}`);
  };

  const getExpenseCategoryData = (event: Event) => {
    const categoryTotals = event.expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(categoryTotals).map(([category, amount]) => ({
      name: category,
      value: amount,
      color: getRandomColor()
    }));
  };

  const getBalanceStatus = (balance: number) => {
    if (balance > 0) return { status: 'owes', color: 'text-destructive', text: `Owes ${formatCurrency(balance)}` };
    if (balance < 0) return { status: 'owed', color: 'text-success', text: `Owed ${formatCurrency(Math.abs(balance))}` };
    return { status: 'settled', color: 'text-muted-foreground', text: 'Settled' };
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Event Management</h1>
          <p className="text-muted-foreground mt-1">
            Plan, manage, and settle expenses with your friends for any event
          </p>
        </div>
        <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Set up a new event to track shared expenses with friends
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Event Title *</Label>
                <Input
                  id="event-title"
                  placeholder="e.g., Goa Beach Trip, Birthday Party"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  placeholder="Brief description of the event..."
                  value={eventForm.description}
                  onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date *</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={eventForm.startDate}
                    onChange={(e) => setEventForm({...eventForm, startDate: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date *</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={eventForm.endDate}
                    onChange={(e) => setEventForm({...eventForm, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={eventForm.currency} onValueChange={(value) => setEventForm({...eventForm, currency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map(currency => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="initial-amount">Initial Contribution (Optional)</Label>
                  <Input
                    id="initial-amount"
                    type="number"
                    placeholder="0"
                    value={eventForm.initialAmount}
                    onChange={(e) => setEventForm({...eventForm, initialAmount: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateEvent} disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create Event'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">My Events</span>
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center gap-2" disabled={!selectedEvent}>
            <Receipt className="h-4 w-4" />
            <span className="hidden sm:inline">Expenses</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2" disabled={!selectedEvent}>
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Events List */}
        <TabsContent value="events">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {events.map((event) => (
              <Card key={event.id} className="p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedEvent(event)}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <Badge className={event.status === 'active' ? 'bg-success text-white' : 'bg-muted'}>
                      {event.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{event.participants.length} people</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Expenses</span>
                      <span className="font-semibold">{formatCurrency(event.totalExpenses)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Your Balance</span>
                      <span className={`font-semibold ${
                        event.participants[0]?.balance > 0 ? 'text-destructive' : 
                        event.participants[0]?.balance < 0 ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {event.participants[0]?.balance > 0 ? `Owe ${formatCurrency(event.participants[0].balance)}` :
                         event.participants[0]?.balance < 0 ? `Owed ${formatCurrency(Math.abs(event.participants[0].balance))}` : 
                         'Settled'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                        setActiveTab('expenses');
                      }}
                    >
                      <Receipt className="mr-1 h-3 w-3" />
                      View Expenses
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInviteFriend(event.id);
                      }}
                    >
                      <UserPlus className="mr-1 h-3 w-3" />
                      Invite
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Expenses Management */}
        <TabsContent value="expenses">
          {selectedEvent && (
            <div className="space-y-6">
              {/* Event Header */}
              <Card className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
                    <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Expense
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Add New Expense</DialogTitle>
                          <DialogDescription>
                            Add an expense for {selectedEvent.title}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="expense-title">Expense Title *</Label>
                            <Input
                              id="expense-title"
                              placeholder="e.g., Dinner, Hotel, Transportation"
                              value={expenseForm.title}
                              onChange={(e) => setExpenseForm({...expenseForm, title: e.target.value})}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expense-amount">Amount *</Label>
                              <Input
                                id="expense-amount"
                                type="number"
                                placeholder="0.00"
                                value={expenseForm.amount}
                                onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="expense-category">Category</Label>
                              <Select value={expenseForm.category} onValueChange={(value) => setExpenseForm({...expenseForm, category: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {expenseCategories.map(category => (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="paid-by">Paid By *</Label>
                            <Select value={expenseForm.paidBy} onValueChange={(value) => setExpenseForm({...expenseForm, paidBy: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Who paid for this?" />
                              </SelectTrigger>
                              <SelectContent>
                                {selectedEvent.participants.map(participant => (
                                  <SelectItem key={participant.id} value={participant.id}>
                                    {participant.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="expense-notes">Notes</Label>
                            <Textarea
                              id="expense-notes"
                              placeholder="Additional notes or receipt details..."
                              value={expenseForm.notes}
                              onChange={(e) => setExpenseForm({...expenseForm, notes: e.target.value})}
                              rows={3}
                            />
                          </div>

                          <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={() => setIsAddExpenseOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleAddExpense} disabled={isLoading}>
                              {isLoading ? 'Adding...' : 'Add Expense'}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" onClick={() => handleInviteFriend(selectedEvent.id)}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite Friend
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Participants */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">Participants ({selectedEvent.participants.length})</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Total Paid</TableHead>
                        <TableHead>Total Owed</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedEvent.participants.map((participant) => {
                        const balanceInfo = getBalanceStatus(participant.balance);
                        return (
                          <TableRow key={participant.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <div className="h-full w-full bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    {participant.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{participant.name}</p>
                                  <p className="text-sm text-muted-foreground">{participant.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={participant.role === 'organizer' ? 'default' : 'outline'}>
                                {participant.role}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatCurrency(participant.totalPaid)}</TableCell>
                            <TableCell>{formatCurrency(participant.totalOwed)}</TableCell>
                            <TableCell>
                              <span className={balanceInfo.color}>
                                {balanceInfo.text}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Send className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              {/* Expenses List */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Expenses ({selectedEvent.expenses.length})</h3>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Paid By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedEvent.expenses.map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{expense.title}</p>
                              {expense.notes && (
                                <p className="text-sm text-muted-foreground">{expense.notes}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{expense.category}</Badge>
                          </TableCell>
                          <TableCell className="font-semibold">
                            {formatCurrency(expense.amount)}
                          </TableCell>
                          <TableCell>{expense.paidByName}</TableCell>
                          <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics">
          {selectedEvent && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Expenses</p>
                      <p className="text-2xl font-bold">{formatCurrency(selectedEvent.totalExpenses)}</p>
                    </div>
                    <Receipt className="h-8 w-8 text-primary" />
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Participants</p>
                      <p className="text-2xl font-bold">{selectedEvent.participants.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-success" />
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Average per Person</p>
                      <p className="text-2xl font-bold">
                        {formatCurrency(selectedEvent.totalExpenses / selectedEvent.participants.length)}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-secondary" />
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Unsettled Amount</p>
                      <p className="text-2xl font-bold text-destructive">
                        {formatCurrency(
                          selectedEvent.participants.reduce((sum, p) => sum + Math.abs(p.balance), 0) / 2
                        )}
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-warning" />
                  </div>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Breakdown */}
                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4">Expense by Category</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={getExpenseCategoryData(selectedEvent)}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          innerRadius={40}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {getExpenseCategoryData(selectedEvent).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* Participant Spending */}
                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4">Spending by Participant</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedEvent.participants}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']} />
                        <Bar dataKey="totalPaid" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}