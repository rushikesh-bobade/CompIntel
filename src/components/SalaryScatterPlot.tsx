'use client';

import React, { useEffect, useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis
} from 'recharts';
import { SalaryRecord } from '@/types';
import { formatCurrencyShort } from '@/lib/normalize';
import { useTheme } from 'next-themes';

interface SalaryScatterPlotProps {
  salaries: SalaryRecord[];
}

export function SalaryScatterPlot({ salaries }: SalaryScatterPlotProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[400px] w-full animate-pulse bg-zinc-100 dark:bg-zinc-800/50 rounded-xl"></div>;

  // Format data for Recharts
  const data = salaries.map(s => ({
    x: s.experience_years,
    y: s.total_compensation,
    z: 1, // Constant size for all dots
    role: s.role,
    level: s.level,
    location: s.location,
    company: s.company,
  }));

  const axisColor = resolvedTheme === 'dark' ? '#52525b' : '#a1a1aa'; // zinc-600 : zinc-400
  const gridColor = resolvedTheme === 'dark' ? '#27272a' : '#e4e4e7'; // zinc-800 : zinc-200
  const dotColor = resolvedTheme === 'dark' ? '#e4e4e7' : '#18181b'; // zinc-200 : zinc-900

  return (
    <div className="w-full h-[450px] pro-card p-6 pt-8 mb-8">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Experience" 
            stroke={axisColor}
            tick={{ fill: axisColor, fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={['dataMin - 1', 'dataMax + 1']}
            label={{ value: 'Years of Experience', position: 'bottom', fill: axisColor, fontSize: 13 }}
          />
          
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Compensation" 
            stroke={axisColor}
            tick={{ fill: axisColor, fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => formatCurrencyShort(val)}
            domain={['dataMin', 'dataMax + 1000000']}
          />
          
          <ZAxis type="number" dataKey="z" range={[60, 60]} name="Size" />

          <Tooltip 
            cursor={{ strokeDasharray: '3 3', stroke: axisColor }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 p-4 rounded-xl shadow-xl">
                    <p className="font-bold text-zinc-900 dark:text-white mb-1">{data.role}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">
                        {data.level}
                      </span>
                      <span className="text-xs text-zinc-500">{data.location}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                      <div>
                        <p className="text-[11px] text-zinc-500 uppercase tracking-wider">Experience</p>
                        <p className="font-medium text-zinc-900 dark:text-white">{data.x} Yrs</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-zinc-500 uppercase tracking-wider">Total Comp</p>
                        <p className="font-semibold text-zinc-900 dark:text-white tabular-data">{formatCurrencyShort(data.y)}</p>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          
          <Scatter 
            name="Salaries" 
            data={data} 
            fill={dotColor}
            fillOpacity={0.6}
            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            activeShape={{ fillOpacity: 1, stroke: dotColor, strokeWidth: 2 }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
