import React from 'react';

export function PlaynovaLogoIcon({ className = 'w-10 h-10' }) {
  return (
    <svg
      viewBox="0 0 48 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="novaPadGrad" x1="4" y1="2" x2="44" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B14CFF" />
          <stop offset="55%" stopColor="#8500FF" />
          <stop offset="100%" stopColor="#5E00CC" />
        </linearGradient>
        <filter id="novaGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#8B00FF" floodOpacity="0.7" />
        </filter>
      </defs>
      <path
        filter="url(#novaGlow)"
        d="M14.2 6.5C9.4 6.5 5.6 10.2 4.6 15.4L2.9 24.4C2.1 28.4 5.1 32 9.1 32C11.7 32 14.1 30.5 15.4 28.2L17.6 24.5C18.3 23.3 19.6 22.6 21 22.6H27C28.4 22.6 29.7 23.3 30.4 24.5L32.6 28.2C33.9 30.5 36.3 32 38.9 32C42.9 32 45.9 28.4 45.1 24.4L43.4 15.4C42.4 10.2 38.6 6.5 33.8 6.5H14.2Z"
        fill="url(#novaPadGrad)"
      />
      {/* Left D-Pad */}
      <rect x="12.5" y="12.2" width="3" height="8.6" rx="1.2" fill="#0E0720" />
      <rect x="9.7" y="15" width="8.6" height="3" rx="1.2" fill="#0E0720" />
      {/* Center LED */}
      <rect x="21.5" y="11.5" width="5" height="2.2" rx="1.1" fill="#E9D5FF" fillOpacity="0.85" />
      {/* Right Arcade Buttons */}
      <circle cx="34.2" cy="13.2" r="1.75" fill="#F5EDFF" />
      <circle cx="37.5" cy="16.5" r="1.75" fill="#0E0720" />
      <circle cx="30.9" cy="16.5" r="1.75" fill="#0E0720" />
      <circle cx="34.2" cy="19.8" r="1.75" fill="#F5EDFF" />
    </svg>
  );
}

export function CategoryIcon({ type, className = 'w-5 h-5' }) {
  switch (type) {
    case 'swords':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
          <line x1="13" y1="19" x2="19" y2="13" />
          <line x1="16" y1="16" x2="20" y2="20" />
          <line x1="19" y1="21" x2="21" y2="19" />
          <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
          <line x1="5" y1="14" x2="9" y2="18" />
          <line x1="7" y1="17" x2="4" y2="20" />
          <line x1="3" y1="19" x2="5" y2="21" />
        </svg>
      );
    case 'compass':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="9.5" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case 'puzzle':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
        </svg>
      );
    case 'flag':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
          <path d="M8 3.5v11" strokeOpacity="0.6" />
          <path d="M12 4.5v11" strokeOpacity="0.6" />
          <path d="M16 4.5v11" strokeOpacity="0.6" />
          <path d="M4 9h16" strokeOpacity="0.6" />
        </svg>
      );
    case 'users':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'knight':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M7 20h10" />
          <path d="M6 20l1-3h10l1 3" />
          <path d="M9 17c0-3 1.5-4.5 2-6.5-1.8.4-3.5 0-4.5-1.2L5 8l3-3.5L9.5 3l2 1.5C15 4.8 18 7.8 18 12c0 2.2-.8 3.8-2 5" />
          <circle cx="11" cy="7.5" r="0.8" fill="currentColor" />
        </svg>
      );
    case 'sports':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="9.5" />
          <path d="M4.6 7.2c3.2 1.8 5.2 4.8 5.2 8.8 0 1.4-.3 2.7-.8 3.9" />
          <path d="M19.4 7.2c-3.2 1.8-5.2 4.8-5.2 8.8 0 1.4.3 2.7.8 3.9" />
          <line x1="2.5" y1="12" x2="21.5" y2="12" />
          <line x1="12" y1="2.5" x2="12" y2="21.5" />
        </svg>
      );
    default:
      return null;
  }
}
