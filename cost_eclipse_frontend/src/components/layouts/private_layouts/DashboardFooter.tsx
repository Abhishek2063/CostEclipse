import { Button } from '@/components/ui/button';

export function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sticky bottom-0 z-40 w-full border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-10 sm:h-12 items-center justify-between px-4 sm:px-6">
        {/* Left: Copyright */}
        <div className="text-xs sm:text-sm text-muted-foreground">
          <span className="hidden sm:inline">© {currentYear} CostEclipse. All rights reserved.</span>
          <span className="sm:hidden">© {currentYear} CostEclipse</span>
        </div>

        {/* Right: Legal Links */}
        <div className="flex items-center gap-1">
          <Button variant="link" size="sm" className="h-auto p-0 text-xs sm:text-sm text-muted-foreground hover:text-foreground">
            <span className="hidden sm:inline">Privacy Policy</span>
            <span className="sm:hidden">Privacy</span>
          </Button>
          <span className="text-muted-foreground text-xs">|</span>
          <Button variant="link" size="sm" className="h-auto p-0 text-xs sm:text-sm text-muted-foreground hover:text-foreground">
            Terms
          </Button>
          <span className="text-muted-foreground text-xs">|</span>
          <Button variant="link" size="sm" className="h-auto p-0 text-xs sm:text-sm text-muted-foreground hover:text-foreground">
            <span className="hidden sm:inline">Cookies</span>
            <span className="sm:hidden">Data</span>
          </Button>
        </div>
      </div>
    </footer>
  );
}