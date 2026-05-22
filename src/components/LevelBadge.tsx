import React from 'react';

interface LevelBadgeProps {
  level: string;
}

export function LevelBadge({ level }: LevelBadgeProps) {
  let bgColor = 'bg-slate-700';
  let textColor = 'text-slate-300';
  let borderColor = 'border-slate-600';

  switch (level.toUpperCase()) {
    case 'L3':
      bgColor = 'bg-blue-500/15';
      textColor = 'text-blue-400';
      borderColor = 'border-blue-500/30';
      break;
    case 'L4':
      bgColor = 'bg-green-500/15';
      textColor = 'text-green-400';
      borderColor = 'border-green-500/30';
      break;
    case 'L5':
      bgColor = 'bg-yellow-500/15';
      textColor = 'text-yellow-400';
      borderColor = 'border-yellow-500/30';
      break;
    case 'L6':
      bgColor = 'bg-orange-500/15';
      textColor = 'text-orange-400';
      borderColor = 'border-orange-500/30';
      break;
    case 'L7':
      bgColor = 'bg-purple-500/15';
      textColor = 'text-purple-400';
      borderColor = 'border-purple-500/30';
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${bgColor} ${textColor} ${borderColor}`}
    >
      {level.toUpperCase()}
    </span>
  );
}
