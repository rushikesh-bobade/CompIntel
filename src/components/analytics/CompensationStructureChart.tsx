'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { formatCurrencyShort } from '@/lib/normalize';
import { useTheme } from 'next-themes';

interface CompensationStructureChartProps {
  data: {
    level: string;
    base: number;
    stock: number;
    bonus: number;
  }[];
}

export function CompensationStructureChart({ data }: CompensationStructureChartProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-[400px] w-full animate-pulse bg-zinc-100 dark:bg-zinc-800/50 rounded-xl"></div>;

  const axisColor = resolvedTheme === 'dark' ? '#52525b' : '#a1a1aa';
  const gridColor = resolvedTheme === 'dark' ? '#27272a' : '#e4e4e7';

  // High contrast custom colors
  const baseColor = resolvedTheme === 'dark' ? '#3b82f6' : '#2563eb'; // blue
  const stockColor = resolvedTheme === 'dark' ? '#10b981' : '#059669'; // emerald
  const bonusColor = resolvedTheme === 'dark' ? '#f59e0b' : '#d97706'; // amber

  return (
    <div className="w-full h-[400px] pro-card p-6 pt-8">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
        The Equity Shift (Median Comp Structure by Level)
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis 
            dataKey="level" 
            stroke={axisColor}
            tick={{ fill: axisColor, fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke={axisColor}
            tick={{ fill: axisColor, fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => formatCurrencyShort(val)}
          />
          <Tooltip 
            cursor={{ fill: resolvedTheme === 'dark' ? '#27272a' : '#f4f4f5' }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const total = payload.reduce((sum, entry) => sum + (entry.value as number), 0);
                return (
                  <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 p-4 rounded-xl shadow-xl min-w-[200px]">
                    <p className="font-bold text-zinc-900 dark:text-white mb-3 text-lg border-b border-zinc-200 dark:border-zinc-800 pb-2">{label}</p>
                    {payload.map((entry, index) => (
                      <div key={index} className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-sm text-zinc-600 dark:text-zinc-400 capitalize">{entry.dataKey}</span>
                        </div>
                        <span className="font-medium text-zinc-900 dark:text-white tabular-data">
                          {formatCurrencyShort(entry.value as number)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-white">Total</span>
                      <span className="font-bold text-zinc-900 dark:text-white tabular-data">{formatCurrencyShort(total)}</span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Bar dataKey="base" name="Base Salary" stackId="a" fill={baseColor} radius={[0, 0, 4, 4]} />
          <Bar dataKey="bonus" name="Bonus" stackId="a" fill={bonusColor} />
          <Bar dataKey="stock" name="Stock/RSU" stackId="a" fill={stockColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
