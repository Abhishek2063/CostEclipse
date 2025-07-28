import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import { Logo } from './home/Logo';

interface NotFoundPageProps {
  onNavigateHome?: () => void;
  onNavigateBack?: () => void;
  title?: string;
  description?: string;
}

export function NotFoundPage({
  onNavigateHome,
  onNavigateBack,
  title = 'Page Not Found',
  description = 'The page you are looking for does not exist or has been moved.'
}: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-eclipse-dark via-eclipse-transition to-eclipse-bright flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo className="mx-auto mb-4" size="lg" />
        </div>

        {/* 404 Card */}
        <Card className="p-8 shadow-2xl border-0 text-center">
          <div className="space-y-6">
            {/* 404 Number */}
            <div className="relative">
              <div className="text-8xl font-bold text-primary/20 select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>

            {/* Title and Description */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              <p className="text-muted-foreground">
                {description}
              </p>
            </div>

            {/* Suggestions */}
            <div className="bg-accent/50 rounded-lg p-4 text-left">
              <h3 className="font-semibold text-sm mb-2">Try these suggestions:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check the URL for typos</li>
                <li>• Return to the previous page</li>
                <li>• Visit our dashboard</li>
                <li>• Contact support if the issue persists</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={onNavigateHome}
                className="w-full bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90"
              >
                <Home className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Button>
              
              <Button
                onClick={onNavigateBack}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>

            {/* Help */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">
                Still need help?
              </p>
              <Button variant="ghost" size="sm">
                <HelpCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-200">
            © 2024 CostEclipse. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}