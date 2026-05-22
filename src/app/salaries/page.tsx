'use client';

import React, { useState, useEffect } from 'react';
import { FilterBar } from '@/components/FilterBar';
import { SalaryTable } from '@/components/SalaryTable';
import { SalaryRecord, SalaryFilters, PaginationMeta } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SalariesPage() {
  const [salaries, setSalaries] = useState<SalaryRecord[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filters, setFilters] = useState<SalaryFilters>({});
  const [page, setPage] = useState(1);

  const fetchSalaries = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({ page: page.toString(), limit: '15' });
      if (filters.company) query.set('company', filters.company);
      if (filters.role) query.set('role', filters.role);
      if (filters.level) query.set('level', filters.level);
      if (filters.location) query.set('location', filters.location);

      const res = await fetch(`/api/salaries?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setSalaries(data.data);
        setMeta(data.meta);
      }
    } catch (err) {
      console.error('Failed to fetch salaries', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSalaries();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [filters, page]);

  const handleFilterChange = (newFilters: Partial<SalaryFilters>) => {
    setFilters({ ...filters, ...newFilters });
    setPage(1); // Reset to first page on filter change
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-160px)]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Explore Salaries</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Search and filter compensation data across the tech industry.</p>
      </div>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      
      <div className="flex-1">
        <SalaryTable salaries={salaries} isLoading={isLoading} />
      </div>

      {meta && meta.pages > 1 && (
        <div className="mt-8 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Showing <span className="font-medium text-zinc-900 dark:text-white">{((meta.page - 1) * meta.limit) + 1}</span> to{' '}
            <span className="font-medium text-zinc-900 dark:text-white">{Math.min(meta.page * meta.limit, meta.total)}</span> of{' '}
            <span className="font-medium text-zinc-900 dark:text-white">{meta.total}</span> results
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || isLoading}
              className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-zinc-600 dark:text-zinc-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 px-4">
              Page {page} of {meta.pages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(meta.pages, p + 1))}
              disabled={page === meta.pages || isLoading}
              className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-zinc-600 dark:text-zinc-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
