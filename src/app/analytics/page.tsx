export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { calculateMedian } from '@/lib/normalize';
import { CompensationStructureChart } from '@/components/analytics/CompensationStructureChart';
import { CompanyRadarChart } from '@/components/analytics/CompanyRadarChart';
import { LocationBarChart } from '@/components/analytics/LocationBarChart';
import { SalaryScatterPlot } from '@/components/SalaryScatterPlot';
import { BarChart3, LineChart, PieChart, Sparkles } from 'lucide-react';

import { SalaryRecord } from '@/types';

export default async function AnalyticsPage() {
  const rawSalaries = await prisma.salary.findMany();
  const allSalaries: SalaryRecord[] = rawSalaries.map(s => ({
    ...s,
    created_at: s.created_at.toISOString()
  }));

  const LEVELS = ['L3', 'L4', 'L5', 'L6', 'L7'];

  // 1. Structure by Level Data
  const structureData = LEVELS.map(level => {
    const levelSalaries = allSalaries.filter(s => s.level === level);
    if (levelSalaries.length === 0) return { level, base: 0, bonus: 0, stock: 0 };
    return {
      level,
      base: calculateMedian(levelSalaries.map(s => s.base_salary)),
      bonus: calculateMedian(levelSalaries.map(s => s.bonus)),
      stock: calculateMedian(levelSalaries.map(s => s.stock)),
    };
  });

  // 2. Radar Chart Data (Top Companies: google, microsoft, amazon, meta)
  const targetCompanies = ['google', 'microsoft', 'amazon', 'meta'];
  const radarData = LEVELS.map(level => {
    const dataPoint: any = { level };
    targetCompanies.forEach(company => {
      const filtered = allSalaries.filter(s => s.company === company && s.level === level);
      dataPoint[company] = filtered.length > 0 ? calculateMedian(filtered.map(s => s.total_compensation)) : 0;
    });
    return dataPoint;
  });

  // 3. Location Arbitrage
  const locationGroups = allSalaries.reduce((acc, curr) => {
    acc[curr.location] = acc[curr.location] || [];
    acc[curr.location].push(curr.total_compensation);
    return acc;
  }, {} as Record<string, number[]>);

  const locationData = Object.entries(locationGroups).map(([location, comps]) => ({
    location,
    medianComp: calculateMedian(comps),
    count: comps.length
  }));

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Market Analytics</h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg">
            Deep dive into verified industry compensation structures, geographical arbitrage, and leveling mechanics.
          </p>
        </div>

        {/* Top Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CompensationStructureChart data={structureData} />
          <CompanyRadarChart data={radarData} companies={targetCompanies} />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <LocationBarChart data={locationData} />
          </div>
          <div className="lg:col-span-2">
            <div className="pro-card p-6 h-full">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Market Salary Distribution
              </h3>
              <p className="text-xs text-zinc-500 mb-6 -mt-4">Total Compensation vs. Years of Experience (Entire Database)</p>
              <div className="-mx-6">
                <SalaryScatterPlot salaries={allSalaries} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
