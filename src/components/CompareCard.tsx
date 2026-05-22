import React from 'react';
import { CompareResult } from '@/types';
import { formatCurrencyShort, titleCase } from '@/lib/normalize';
import { LevelBadge } from './LevelBadge';
import { Building2, MapPin, Briefcase } from 'lucide-react';

interface CompareCardProps {
  result: CompareResult;
}

export function CompareCard({ result }: CompareCardProps) {
  const { salary_a, salary_b, diff } = result;

  const renderSalaryColumn = (salary: typeof salary_a, isWinner: boolean) => (
    <div className={`flex-1 p-6 pro-card ${isWinner ? 'ring-1 ring-zinc-500/20 bg-zinc-100/50 dark:bg-zinc-800/20' : 'opacity-90'}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-2 mb-1 tracking-tight">
            <Building2 className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            {titleCase(salary.company)}
          </h3>
          <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 text-sm mt-2">
            <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {salary.role}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {titleCase(salary.location)}</span>
          </div>
        </div>
        <LevelBadge level={salary.level} />
      </div>

      <div className="space-y-5">
        <div className="pb-5 border-b border-zinc-200 dark:border-zinc-800/60">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Total Compensation</p>
          <p className={`text-4xl font-semibold tracking-tight tabular-data ${isWinner ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300'}`}>
            {formatCurrencyShort(salary.total_compensation)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
          <div>
            <p className="text-xs text-zinc-500 mb-1">Base Salary</p>
            <p className="text-[15px] font-medium text-zinc-800 dark:text-zinc-200 tabular-data">{formatCurrencyShort(salary.base_salary)}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-1">Stock / RSU</p>
            <p className="text-[15px] font-medium text-zinc-800 dark:text-zinc-200 tabular-data">{salary.stock > 0 ? formatCurrencyShort(salary.stock) : '-'}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-1">Bonus</p>
            <p className="text-[15px] font-medium text-zinc-800 dark:text-zinc-200 tabular-data">{salary.bonus > 0 ? formatCurrencyShort(salary.bonus) : '-'}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-1">Experience</p>
            <p className="text-[15px] font-medium text-zinc-800 dark:text-zinc-200 tabular-data">{salary.experience_years} Yrs</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row gap-4 relative">
        {renderSalaryColumn(salary_a, diff.total > 0)}
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
            VS
          </div>
        </div>
        
        {renderSalaryColumn(salary_b, diff.total < 0)}
      </div>

      <div className="pro-card p-6 text-center">
        <h4 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-1 uppercase tracking-wider">Comparison Summary</h4>
        <p className="text-zinc-900 dark:text-white text-lg font-medium">
          <span className="text-zinc-700 dark:text-zinc-100">{titleCase(diff.total > 0 ? salary_a.company : salary_b.company)}</span> pays{' '}
          <span className="text-zinc-700 dark:text-zinc-100 tabular-data">{formatCurrencyShort(Math.abs(diff.total))}</span> more in total comp.
        </p>
        <p className="text-zinc-500 text-sm mt-2">{diff.level_difference}</p>
      </div>
    </div>
  );
}
