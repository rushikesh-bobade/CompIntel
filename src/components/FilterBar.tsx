'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { SalaryFilters } from '@/types';

interface FilterBarProps {
  filters: SalaryFilters;
  onFilterChange: (filters: Partial<SalaryFilters>) => void;
}

const LEVELS = ['L3', 'L4', 'L5', 'L6', 'L7'];

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="pro-card p-4 mb-6 flex flex-wrap gap-4 items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search companies..."
          value={filters.company || ''}
          onChange={(e) => onFilterChange({ company: e.target.value })}
          className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all"
        />
      </div>

      <select
        value={filters.level || ''}
        onChange={(e) => onFilterChange({ level: e.target.value })}
        className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 min-w-[120px]"
      >
        <option value="">All Levels</option>
        {LEVELS.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Role (e.g. Software Engineer)"
        value={filters.role || ''}
        onChange={(e) => onFilterChange({ role: e.target.value })}
        className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
      />

      <input
        type="text"
        placeholder="Location"
        value={filters.location || ''}
        onChange={(e) => onFilterChange({ location: e.target.value })}
        className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
      />

      {(filters.company || filters.level || filters.role || filters.location) && (
        <button
          onClick={() => onFilterChange({ company: '', level: '', role: '', location: '' })}
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white px-2 transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
}
