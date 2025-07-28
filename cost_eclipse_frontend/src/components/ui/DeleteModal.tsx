import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Button } from './button';
import { Card } from './card';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemName?: string;
  isLoading?: boolean;
  variant?: 'danger' | 'warning';
}

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Item',
  description,
  itemName,
  isLoading = false,
  variant = 'danger'
}: DeleteModalProps) {
  if (!isOpen) return null;

  const defaultDescription = itemName 
    ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
    : 'Are you sure you want to delete this item? This action cannot be undone.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-md mx-4 p-6 shadow-2xl border-0">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="space-y-4">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
            variant === 'danger' ? 'bg-destructive/10' : 'bg-warning/10'
          }`}>
            <AlertTriangle className={`h-6 w-6 ${
              variant === 'danger' ? 'text-destructive' : 'text-warning'
            }`} />
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-center">{title}</h2>

          {/* Description */}
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            {description || defaultDescription}
          </p>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 ${
                variant === 'danger' 
                  ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' 
                  : 'bg-warning text-white hover:bg-warning/90'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}