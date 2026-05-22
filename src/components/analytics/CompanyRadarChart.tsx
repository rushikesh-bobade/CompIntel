'use client';

import React, { useEffect, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { formatCurrencyShort } from '@/lib/normalize';
import { useTheme } from 'next-themes';

interface CompanyRadarChartProps {
  data: {
    level: string;
    [company: string]: string | number;
  }[];
  companies: string[];
}

const COLORS = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#10b981', // emerald
  '#f59e0b', // amber
  '#8b5cf6', // violet
];

export function CompanyRadarChart({ data, companies }: CompanyRadarChartProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-[400px] w-full animate-pulse bg-zinc-100 dark:bg-zinc-800/50 rounded-xl"></div>;

  const axisColor = resolvedTheme === 'dark' ? '#71717a' : '#a1a1aa';
  const gridColor = resolvedTheme === 'dark' ? '#3f3f46' : '#e4e4e7';

  return (
    <div className="w-full h-[400px] pro-card p-6 pt-8">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
        Top-Tier Pay Radar
      </h3>
      <p className="text-xs text-zinc-500 mb-6">Median Total Comp by Level across major tech firms.</p>
      
      <ResponsiveContainer width="100%" height="80%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke={gridColor} />
          <PolarAngleAxis 
            dataKey="level" 
            tick={{ fill: resolvedTheme === 'dark' ? '#e4e4e7' : '#18181b', fontSize: 13, fontWeight: 600 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 'auto']} 
            tickFormatter={(val) => formatCurrencyShort(val)}
            tick={{ fill: axisColor, fontSize: 10 }}
            stroke={gridColor}
          />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 p-4 rounded-xl shadow-xl min-w-[180px]">
                    <p className="font-bold text-zinc-900 dark:text-white mb-3 text-lg border-b border-zinc-200 dark:border-zinc-800 pb-2">{label} Compensation</p>
                    {[...payload].sort((a,b) => (b.value as number) - (a.value as number)).map((entry, index) => (
                      <div key={index} className="flex justify-between items-center mb-2 gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 capitalize">{entry.name}</span>
                        </div>
                        <span className="font-semibold text-zinc-900 dark:text-white tabular-data">
                          {formatCurrencyShort(entry.value as number)}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          {companies.map((company, idx) => (
            <Radar
              key={company}
              name={company.charAt(0).toUpperCase() + company.slice(1)}
              dataKey={company}
              stroke={COLORS[idx % COLORS.length]}
              fill={COLORS[idx % COLORS.length]}
              fillOpacity={0.3}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
