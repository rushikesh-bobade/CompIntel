import React from 'react';
import { CompanyStats as CompanyStatsType } from '@/types';
import { formatCurrencyShort, titleCase } from '@/lib/normalize';
import { TrendingUp, Users, Award, MapPin } from 'lucide-react';

interface CompanyStatsProps {
  stats: CompanyStatsType;
}

export function CompanyStats({ stats }: CompanyStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="pro-card p-5 border-l-2 border-l-zinc-900 dark:border-l-zinc-300">
        <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400">
          <TrendingUp className="w-4 h-4" />
          <h3 className="text-sm font-medium uppercase tracking-wider">Median Comp</h3>
        </div>
        <p className="text-3xl font-semibold text-zinc-900 dark:text-white tracking-tight tabular-data">{formatCurrencyShort(stats.median_compensation)}</p>
        <p className="text-[13px] text-zinc-500 mt-2 font-medium">Avg: <span className="tabular-data">{formatCurrencyShort(stats.avg_compensation)}</span></p>
      </div>

      <div className="pro-card p-5">
        <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400">
          <Users className="w-4 h-4" />
          <h3 className="text-sm font-medium uppercase tracking-wider">Total Records</h3>
        </div>
        <p className="text-3xl font-semibold text-zinc-900 dark:text-white tracking-tight tabular-data">{stats.total_entries}</p>
        <p className="text-[13px] text-zinc-500 mt-2 font-medium">Verified submissions</p>
      </div>

      <div className="pro-card p-5">
        <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400">
          <Award className="w-4 h-4" />
          <h3 className="text-sm font-medium uppercase tracking-wider">Top Level</h3>
        </div>
        <div className="flex flex-col gap-2.5 mt-1">
          {Object.entries(stats.level_distribution)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 2)
            .map(([level, count]) => (
              <div key={level} className="flex items-center justify-between">
                <span className="text-zinc-800 dark:text-zinc-200 font-medium text-sm">{level}</span>
                <span className="text-zinc-500 text-[13px] tabular-data bg-zinc-100 dark:bg-zinc-800/50 px-2 py-0.5 rounded">{count}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="pro-card p-5">
        <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400">
          <MapPin className="w-4 h-4" />
          <h3 className="text-sm font-medium uppercase tracking-wider">Top Locations</h3>
        </div>
        <div className="flex flex-col gap-2.5 mt-1">
          {Object.entries(stats.location_distribution)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 2)
            .map(([location, count]) => (
              <div key={location} className="flex items-center justify-between">
                <span className="text-zinc-800 dark:text-zinc-200 font-medium text-sm">{titleCase(location)}</span>
                <span className="text-zinc-500 text-[13px] tabular-data bg-zinc-100 dark:bg-zinc-800/50 px-2 py-0.5 rounded">{count}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
