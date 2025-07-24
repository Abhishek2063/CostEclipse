interface LogoProps {
  variant?: 'primary' | 'icon' | 'horizontal' | 'monogram';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
}

export function Logo({ variant = 'primary', size = 'md', className = '', animated = false }: LogoProps) {
  const sizeClasses = {
    xs: 'h-4', // 16px - favicon size
    sm: 'h-6', // 24px
    md: 'h-8', // 32px
    lg: 'h-10', // 40px
    xl: 'h-12' // 48px
  };

  const textSizes = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  const EclipseIcon = ({ animate = false }: { animate?: boolean }) => (
    <svg 
      viewBox="0 0 48 48" 
      className={`${sizeClasses[size]} w-auto`} 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Eclipse Gradient - Dark Blue to Bright Green */}
        <linearGradient id="eclipse-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="40%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        
        {/* Growth Arrow Gradient */}
        <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Glow Effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Shadow Effect */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="rgba(0,0,0,0.1)"/>
        </filter>
      </defs>
      
      {/* Background Circle - Represents the "obscured" state */}
      <circle 
        cx="24" 
        cy="24" 
        r="20" 
        fill="rgba(30, 41, 59, 0.1)" 
        stroke="rgba(79, 70, 229, 0.2)" 
        strokeWidth="1"
        className={animate ? "animate-pulse" : ""}
      />
      
      {/* Main Eclipse Shape - Partial circle with emerging clarity */}
      <path
        d="M 8 24 A 16 16 0 0 1 24 8 A 12 12 0 0 0 24 40 A 16 16 0 0 1 8 24 Z"
        fill="url(#eclipse-gradient)"
        filter="url(#shadow)"
        className={animate ? "animate-pulse" : ""}
      />
      
      {/* Revealed/Clear Section - Represents financial clarity */}
      <path
        d="M 24 8 A 16 16 0 0 1 40 24 A 16 16 0 0 1 24 40 A 12 12 0 0 0 24 8 Z"
        fill="rgba(16, 185, 129, 0.15)"
        stroke="url(#eclipse-gradient)"
        strokeWidth="1.5"
      />
      
      {/* Financial Growth Arrow - Emerging from the shadow */}
      <g className={animate ? "animate-bounce" : ""}>
        {/* Arrow Shaft */}
        <line
          x1="18"
          y1="30"
          x2="32"
          y2="16"
          stroke="url(#arrow-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        
        {/* Arrow Head */}
        <path
          d="M 28 12 L 32 16 L 28 20"
          stroke="url(#arrow-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#glow)"
        />
      </g>
      
      {/* Subtle Dollar Sign Integration */}
      <text
        x="24"
        y="28"
        textAnchor="middle"
        className="fill-success"
        style={{ 
          fontSize: size === 'xs' ? '8px' : size === 'sm' ? '10px' : '12px',
          fontWeight: 'bold',
          opacity: 0.7
        }}
      >
        $
      </text>
      
      {/* Light Rays - Representing financial illumination */}
      <g opacity="0.4" className={animate ? "animate-spin" : ""} style={{ transformOrigin: '24px 24px', animationDuration: '8s' }}>
        <line x1="24" y1="4" x2="24" y2="8" stroke="#10b981" strokeWidth="1" strokeLinecap="round"/>
        <line x1="35.3" y1="8.7" x2="33.9" y2="10.1" stroke="#10b981" strokeWidth="1" strokeLinecap="round"/>
        <line x1="43.3" y1="24" x2="39.3" y2="24" stroke="#10b981" strokeWidth="1" strokeLinecap="round"/>
        <line x1="35.3" y1="39.3" x2="33.9" y2="37.9" stroke="#10b981" strokeWidth="1" strokeLinecap="round"/>
      </g>
    </svg>
  );

  // Monogram version
  if (variant === 'monogram') {
    return (
      <div className={`flex items-center justify-center ${sizeClasses[size]} aspect-square bg-gradient-to-br from-slate-800 via-primary to-success rounded-lg shadow-lg ${className}`}>
        <span className={`text-white font-bold ${size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : size === 'lg' ? 'text-lg' : 'text-xl'}`}>
          CE
        </span>
      </div>
    );
  }

  // Icon only version
  if (variant === 'icon') {
    return (
      <div className={className}>
        <EclipseIcon animate={animated} />
      </div>
    );
  }

  // Horizontal layout version
  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <EclipseIcon animate={animated} />
        <div className="flex flex-col">
          <span className={`font-bold bg-gradient-to-r from-slate-800 via-primary to-success bg-clip-text text-transparent ${textSizes[size]} leading-none`}>
            CostEclipse
          </span>
          <span className="text-xs text-muted-foreground font-medium tracking-wide">
            FINANCIAL CLARITY
          </span>
        </div>
      </div>
    );
  }

  // Primary version (default)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <EclipseIcon animate={animated} />
      <div className="flex flex-col">
        <span 
          className={`font-bold bg-gradient-to-r from-slate-800 via-primary to-success bg-clip-text text-transparent ${textSizes[size]} leading-none`}
          style={{ letterSpacing: '-0.02em' }} // Custom letter-spacing as requested
        >
          CostEclipse
        </span>
        {size !== 'xs' && size !== 'sm' && (
          <span className="text-xs text-muted-foreground font-medium tracking-wide opacity-80">
            Financial Ecosystem
          </span>
        )}
      </div>
    </div>
  );
}