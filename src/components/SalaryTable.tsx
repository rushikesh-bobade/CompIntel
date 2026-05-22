import React from 'react';
import { SalaryRecord } from '@/types';
import { titleCase, formatCurrencyShort } from '@/lib/normalize';
import { LevelBadge } from './LevelBadge';
import { Clock } from 'lucide-react';

interface SalaryTableProps {
  salaries: SalaryRecord[];
  isLoading?: boolean;
}

export function SalaryTable({ salaries, isLoading }: SalaryTableProps) {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center border border-zinc-200 dark:border-zinc-900 rounded-xl bg-zinc-50 dark:bg-zinc-900/20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-500"></div>
      </div>
    );
  }

  if (salaries.length === 0) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center border border-zinc-200 dark:border-zinc-900 rounded-xl bg-zinc-50 dark:bg-zinc-900/20">
        <p className="text-zinc-500 dark:text-zinc-400">No salaries found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto border border-zinc-200 dark:border-zinc-800/60 rounded-xl bg-white dark:bg-zinc-900/40 shadow-sm">
      <table className="w-full text-left text-sm text-zinc-700 dark:text-zinc-300">
        <thead className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 uppercase border-b border-zinc-200 dark:border-zinc-800/60 tracking-wider">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium">Company</th>
            <th scope="col" className="px-6 py-4 font-medium">Role & Level</th>
            <th scope="col" className="px-6 py-4 font-medium">Location</th>
            <th scope="col" className="px-6 py-4 font-medium">YOE</th>
            <th scope="col" className="px-6 py-4 font-medium text-right">Base</th>
            <th scope="col" className="px-6 py-4 font-medium text-right">Stock</th>
            <th scope="col" className="px-6 py-4 font-medium text-right text-zinc-900 dark:text-white">Total Comp</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/40">
          {salaries.map((s) => (
            <tr key={s.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-zinc-900 dark:text-zinc-100">{titleCase(s.company)}</div>
                <div className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  {new Date(s.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-zinc-900 dark:text-zinc-200">{s.role}</span>
                  <LevelBadge level={s.level} />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-zinc-600 dark:text-zinc-400">
                {titleCase(s.location)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap tabular-data text-zinc-600 dark:text-zinc-400">
                {s.experience_years}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right tabular-data text-zinc-600 dark:text-zinc-400">
                {formatCurrencyShort(s.base_salary)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right tabular-data text-zinc-600 dark:text-zinc-400">
                {s.stock > 0 ? formatCurrencyShort(s.stock) : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right tabular-data font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                {formatCurrencyShort(s.total_compensation)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
