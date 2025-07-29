export const getStatusColor = (status: string, type: 'user' | 'feedback' | 'query' | 'budget' = 'user') => {
  const colorMaps: any = {
    user: {
      'active': 'bg-success text-white',
      'inactive': 'bg-muted text-muted-foreground',
      'suspended': 'bg-warning text-white',
      'safe': 'bg-success text-white',
      'warning': 'bg-warning text-white',
      'exceeded': 'bg-destructive text-destructive-foreground'
    },
    feedback: {
      'Pending': 'bg-warning text-white',
      'In Progress': 'bg-primary text-primary-foreground',
      'Resolved': 'bg-success text-white',
      'Dismissed': 'bg-muted text-muted-foreground'
    },
    query: {
      'Open': 'bg-warning text-white',
      'In Progress': 'bg-primary text-primary-foreground',
      'Resolved': 'bg-success text-white',
      'Closed': 'bg-muted text-muted-foreground'
    },
    budget: {
      'safe': 'bg-success text-white',
      'warning': 'bg-warning text-white',
      'exceeded': 'bg-destructive text-destructive-foreground'
    }
  };

  return colorMaps[type][status] || 'bg-muted text-muted-foreground';
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High': case 'high': return 'bg-destructive text-destructive-foreground';
    case 'Medium': case 'medium': return 'bg-warning text-white';
    case 'Low': case 'low': return 'bg-muted text-muted-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin': return 'bg-destructive text-destructive-foreground';
    case 'premium': return 'bg-secondary text-secondary-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const getSubscriptionColor = (subscription: string) => {
  switch (subscription) {
    case 'enterprise': return 'bg-primary text-primary-foreground';
    case 'premium': return 'bg-secondary text-secondary-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const getTypeColor = (type: string) => {
  switch (type) {
    case 'Bug': return 'bg-destructive text-destructive-foreground';
    case 'Suggestion': return 'bg-primary text-primary-foreground';
    case 'Praise': return 'bg-success text-white';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'bg-success text-white';
    case 'medium': return 'bg-warning text-white';
    case 'hard': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const getConfidenceColor = (confidence: string) => {
  switch (confidence) {
    case 'high': return 'bg-success text-white';
    case 'medium': return 'bg-warning text-white';
    case 'low': return 'bg-muted text-muted-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const getRandomColor = () => {
  const colors = ['#4f46e5', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6', '#f97316'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString()}`;
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export const calculateProgress = (current: number, target: number) => {
  return Math.min((current / target) * 100, 100);
};

export const simulateApiCall = (delay: number = 1000) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};