'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { formatCurrencyShort } from '@/lib/normalize';
import { useTheme } from 'next-themes';

interface LocationBarChartProps {
  data: {
    location: string;
    medianComp: number;
    count: number;
  }[];
}

export function LocationBarChart({ data }: LocationBarChartProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-[400px] w-full animate-pulse bg-zinc-100 dark:bg-zinc-800/50 rounded-xl"></div>;

  const axisColor = resolvedTheme === 'dark' ? '#52525b' : '#a1a1aa';
  const gridColor = resolvedTheme === 'dark' ? '#27272a' : '#e4e4e7';

  // Sort data descending by comp
  const sortedData = [...data].sort((a, b) => b.medianComp - a.medianComp).slice(0, 8); // Top 8 locations

  return (
    <div className="w-full h-[400px] pro-card p-6 pt-8">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
        Location Arbitrage
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={true} vertical={false} />
          <XAxis 
            type="number"
            stroke={axisColor}
            tick={{ fill: axisColor, fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => formatCurrencyShort(val)}
          />
          <YAxis 
            dataKey="location" 
            type="category" 
            stroke={axisColor}
            tick={{ fill: resolvedTheme === 'dark' ? '#e4e4e7' : '#18181b', fontSize: 12, fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
            width={80}
          />
          <Tooltip 
            cursor={{ fill: resolvedTheme === 'dark' ? '#27272a' : '#f4f4f5' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 p-4 rounded-xl shadow-xl">
                    <p className="font-bold text-zinc-900 dark:text-white mb-1 capitalize">{data.location}</p>
                    <p className="text-xs text-zinc-500 mb-3">{data.count} verified submissions</p>
                    <div className="flex justify-between items-center gap-6">
                      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Median Comp</span>
                      <span className="font-semibold text-zinc-900 dark:text-white tabular-data">
                        {formatCurrencyShort(data.medianComp)}
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="medianComp" radius={[0, 4, 4, 0]}>
            {sortedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.location.toLowerCase() === 'remote' 
                  ? (resolvedTheme === 'dark' ? '#8b5cf6' : '#7c3aed') 
                  : (resolvedTheme === 'dark' ? '#52525b' : '#a1a1aa')
                } 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
