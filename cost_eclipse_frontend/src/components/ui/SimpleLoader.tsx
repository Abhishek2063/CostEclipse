import { cn } from '@/lib/utils';
import React from 'react';

interface SimpleLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SimpleLoader = React.forwardRef<HTMLDivElement, SimpleLoaderProps>(({
  size = 'md',
  className,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <div 
      ref={ref}
      className={cn(
        'relative flex items-center justify-center',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* Main circle with eclipse gradient */}
      <div 
        className={cn(
          'relative rounded-full bg-gradient-to-r from-eclipse-dark via-eclipse-transition to-eclipse-bright animate-spin',
          sizeClasses[size]
        )}
        style={{
          animationDuration: '1.5s',
          background: 'conic-gradient(from 0deg, var(--eclipse-dark), var(--eclipse-transition), var(--eclipse-bright), var(--eclipse-dark))'
        }}
      >
        {/* Inner hole to create ring effect */}
        <div 
          className={cn(
            'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-background',
            size === 'sm' ? 'w-3 h-3' : 
            size === 'md' ? 'w-4 h-4' : 'w-6 h-6'
          )}
        />
        
        {/* Highlight dot */}
        <div 
          className={cn(
            'absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white',
            size === 'sm' ? 'w-1.5 h-1.5' : 
            size === 'md' ? 'w-2 h-2' : 'w-3 h-3'
          )}
        />
      </div>
    </div>
  );
});

SimpleLoader.displayName = 'SimpleLoader';

export default SimpleLoader;