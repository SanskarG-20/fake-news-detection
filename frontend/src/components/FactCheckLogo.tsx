interface FactCheckLogoProps {
  className?: string;
  size?: number;
}

export function FactCheckLogo({ className = "", size = 32 }: FactCheckLogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Outer shield shape */}
        <path
          d="M32 4 L48 12 L48 28 C48 42 32 58 32 58 C32 58 16 42 16 28 L16 12 L32 4 Z"
          fill="url(#shieldGradient)"
          stroke="url(#borderGradient)"
          strokeWidth="2"
        />
        
        {/* Inner verification circle */}
        <circle
          cx="32"
          cy="30"
          r="16"
          fill="url(#verificationGradient)"
          stroke="url(#innerBorderGradient)"
          strokeWidth="1.5"
        />
        
        {/* Magnifying glass handle */}
        <line
          x1="42"
          y1="40"
          x2="46"
          y2="44"
          stroke="url(#handleGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Checkmark inside circle */}
        <path
          d="M26 30 L30 34 L38 26"
          stroke="url(#checkGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Fact-check pattern lines */}
        <g opacity="0.6">
          <line x1="20" y1="18" x2="28" y2="18" stroke="url(#accentGradient)" strokeWidth="1" strokeLinecap="round"/>
          <line x1="36" y1="18" x2="44" y2="18" stroke="url(#accentGradient)" strokeWidth="1" strokeLinecap="round"/>
          <line x1="18" y1="22" x2="24" y2="22" stroke="url(#accentGradient)" strokeWidth="0.8" strokeLinecap="round"/>
          <line x1="40" y1="22" x2="46" y2="22" stroke="url(#accentGradient)" strokeWidth="0.8" strokeLinecap="round"/>
        </g>
        
        {/* Data verification dots */}
        <g>
          <circle cx="22" cy="48" r="1.5" fill="url(#dotGradient)"/>
          <circle cx="32" cy="50" r="1.5" fill="url(#dotGradient)"/>
          <circle cx="42" cy="48" r="1.5" fill="url(#dotGradient)"/>
        </g>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15"/>
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05"/>
          </linearGradient>
          
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6"/>
            <stop offset="50%" stopColor="#3b82f6"/>
            <stop offset="100%" stopColor="#06b6d4"/>
          </linearGradient>
          
          <radialGradient id="verificationGradient" cx="32" cy="30" r="16">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1"/>
            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1"/>
          </radialGradient>
          
          <linearGradient id="innerBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8"/>
          </linearGradient>
          
          <linearGradient id="handleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4"/>
            <stop offset="100%" stopColor="#3b82f6"/>
          </linearGradient>
          
          <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981"/>
            <stop offset="50%" stopColor="#06d6a0"/>
            <stop offset="100%" stopColor="#20e3b2"/>
          </linearGradient>
          
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6"/>
          </linearGradient>
          
          <radialGradient id="dotGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4"/>
            <stop offset="100%" stopColor="#3b82f6"/>
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}