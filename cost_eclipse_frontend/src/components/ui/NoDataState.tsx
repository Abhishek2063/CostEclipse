import { Button } from './button';
import { Card } from './card';
import { 
  FileText, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  Target, 
  Calendar, 
  MessageSquare, 
  Plus,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';

interface NoDataStateProps {
  type?: 'expenses' | 'income' | 'savings' | 'budgets' | 'events' | 'friends' | 'feedback' | 'queries' | 'users' | 'generic';
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  showSearch?: boolean;
  onSearch?: () => void;
  showFilter?: boolean;
  onFilter?: () => void;
  showRefresh?: boolean;
  onRefresh?: () => void;
  className?: string;
}

const getIconAndContent = (type: string) => {
  switch (type) {
    case 'expenses':
      return {
        icon: <TrendingDown className="h-12 w-12 text-muted-foreground" />,
        title: 'No Expenses Found',
        description: 'Start tracking your expenses to get insights into your spending habits.',
        actionText: 'Add Expense'
      };
    case 'income':
      return {
        icon: <TrendingUp className="h-12 w-12 text-muted-foreground" />,
        title: 'No Income Records',
        description: 'Add your income sources to get a complete picture of your finances.',
        actionText: 'Add Income'
      };
    case 'savings':
      return {
        icon: <PiggyBank className="h-12 w-12 text-muted-foreground" />,
        title: 'No Saving Goals',
        description: 'Set saving goals to track your progress toward financial milestones.',
        actionText: 'Create Goal'
      };
    case 'budgets':
      return {
        icon: <Target className="h-12 w-12 text-muted-foreground" />,
        title: 'No Budgets Set',
        description: 'Create budgets to control your spending and achieve your financial goals.',
        actionText: 'Create Budget'
      };
    case 'events':
      return {
        icon: <Calendar className="h-12 w-12 text-muted-foreground" />,
        title: 'No Events Found',
        description: 'Create events to track shared expenses with friends and family.',
        actionText: 'Create Event'
      };
    case 'friends':
      return {
        icon: <Users className="h-12 w-12 text-muted-foreground" />,
        title: 'No Friends Added',
        description: 'Add friends to share expenses and manage group finances together.',
        actionText: 'Add Friend'
      };
    case 'feedback':
      return {
        icon: <MessageSquare className="h-12 w-12 text-muted-foreground" />,
        title: 'No Feedback Received',
        description: 'User feedback will appear here once customers start sharing their thoughts.',
        actionText: 'View Settings'
      };
    case 'queries':
      return {
        icon: <MessageSquare className="h-12 w-12 text-muted-foreground" />,
        title: 'No Support Queries',
        description: 'Customer support queries will appear here when users need assistance.',
        actionText: 'View Settings'
      };
    case 'users':
      return {
        icon: <Users className="h-12 w-12 text-muted-foreground" />,
        title: 'No Users Found',
        description: 'User accounts will appear here as people sign up for the platform.',
        actionText: 'Invite Users'
      };
    default:
      return {
        icon: <FileText className="h-12 w-12 text-muted-foreground" />,
        title: 'No Data Available',
        description: 'There\'s no data to display at the moment.',
        actionText: 'Add Data'
      };
  }
};

export function NoDataState({
  type = 'generic',
  title,
  description,
  actionText,
  onAction,
  showSearch = false,
  onSearch,
  showFilter = false,
  onFilter,
  showRefresh = false,
  onRefresh,
  className = ''
}: NoDataStateProps) {
  const defaultContent = getIconAndContent(type);

  return (
    <Card className={`p-8 sm:p-12 ${className}`}>
      <div className="text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          {defaultContent.icon}
        </div>

        {/* Title and Description */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            {title || defaultContent.title}
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {description || defaultContent.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          {onAction && (
            <Button
              onClick={onAction}
              className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              {actionText || defaultContent.actionText}
            </Button>
          )}

          {showSearch && onSearch && (
            <Button
              onClick={onSearch}
              variant="outline"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          )}

          {showFilter && onFilter && (
            <Button
              onClick={onFilter}
              variant="outline"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          )}

          {showRefresh && onRefresh && (
            <Button
              onClick={onRefresh}
              variant="outline"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          )}
        </div>

        {/* Additional Help */}
        <div className="pt-6 border-t">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Need help getting started?</p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="ghost" size="sm">
                View Guide
              </Button>
              <Button variant="ghost" size="sm">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}