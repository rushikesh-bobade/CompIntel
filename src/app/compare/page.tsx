'use client';

import React, { useState, useEffect } from 'react';
import { SalaryRecord, CompareResult } from '@/types';
import { titleCase, formatCurrencyShort } from '@/lib/normalize';
import { CompareCard } from '@/components/CompareCard';
import { Search } from 'lucide-react';

export default function ComparePage() {
  const [salaries, setSalaries] = useState<SalaryRecord[]>([]);
  const [search, setSearch] = useState('');
  
  const [selectedA, setSelectedA] = useState<SalaryRecord | null>(null);
  const [selectedB, setSelectedB] = useState<SalaryRecord | null>(null);
  
  const [compareResult, setCompareResult] = useState<CompareResult | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    // Fetch some initial salaries to pick from
    fetch('/api/salaries?limit=50')
      .then(res => res.json())
      .then(data => setSalaries(data.data));
  }, []);

  const handleCompare = async () => {
    if (!selectedA || !selectedB) return;
    setIsLoading(true);
    setAiInsight(null);
    try {
      const res = await fetch(`/api/compare?id_a=${selectedA.id}&id_b=${selectedB.id}`);
      if (res.ok) {
        const data = await res.json();
        setCompareResult(data);
        fetchAiInsight(data.salary_a, data.salary_b);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAiInsight = async (offerA: SalaryRecord, offerB: SalaryRecord) => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai/evaluate-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offerA, offerB }),
      });
      if (res.ok) {
        const data = await res.json();
        setAiInsight(data.insight);
      }
    } catch (err) {
      console.error('AI Insight Error', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredSalaries = salaries.filter(s => 
    s.company.toLowerCase().includes(search.toLowerCase()) || 
    s.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Compare Offers</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Select two salary records to see a detailed side-by-side comparison.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Selector A */}
        <div className="pro-card p-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Offer A</h2>
          {selectedA ? (
            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg flex justify-between items-center border border-zinc-200 dark:border-zinc-700">
              <div>
                <p className="font-bold text-zinc-900 dark:text-white">{titleCase(selectedA.company)}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{selectedA.role} • {selectedA.level}</p>
              </div>
              <button onClick={() => setSelectedA(null)} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">Change</button>
            </div>
          ) : (
            <p className="text-zinc-500 italic">Please select an offer from the list below.</p>
          )}
        </div>

        {/* Selector B */}
        <div className="pro-card p-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Offer B</h2>
          {selectedB ? (
            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg flex justify-between items-center border border-zinc-200 dark:border-zinc-700">
              <div>
                <p className="font-bold text-zinc-900 dark:text-white">{titleCase(selectedB.company)}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{selectedB.role} • {selectedB.level}</p>
              </div>
              <button onClick={() => setSelectedB(null)} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">Change</button>
            </div>
          ) : (
            <p className="text-zinc-500 italic">Please select an offer from the list below.</p>
          )}
        </div>
      </div>

      <div className="flex justify-center my-8">
        <button
          onClick={handleCompare}
          disabled={!selectedA || !selectedB || isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
        >
          {isLoading ? 'Comparing...' : 'Compare Selected Offers'}
        </button>
      </div>

      {compareResult && (
        <div className="mt-12 border-t border-slate-800 pt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CompareCard result={compareResult} />
          
          <div className="mt-8 pro-card p-6 border-t-2 border-t-zinc-400">
            <h3 className="text-sm font-medium text-zinc-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                {isAiLoading && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>}
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
              </span>
              AI Evaluation
            </h3>
            {isAiLoading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800/50 rounded w-3/4"></div>
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800/50 rounded w-full"></div>
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800/50 rounded w-5/6"></div>
              </div>
            ) : (
              <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed text-[15px] relative z-10 whitespace-pre-wrap">{aiInsight}</p>
            )}
          </div>
        </div>
      )}

      {/* Selection List */}
      <div className="mt-16 border-t border-zinc-200 dark:border-zinc-800 pt-8">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Select Offers to Compare</h3>
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredSalaries.map(s => {
            const isSelected = selectedA?.id === s.id || selectedB?.id === s.id;
            return (
              <div 
                key={s.id} 
                className={`p-4 rounded-xl border transition-all cursor-pointer ${isSelected ? 'border-zinc-900 bg-zinc-100 dark:border-zinc-500 dark:bg-zinc-800/50' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600'}`}
                onClick={() => {
                  if (isSelected) {
                    if (selectedA?.id === s.id) setSelectedA(null);
                    if (selectedB?.id === s.id) setSelectedB(null);
                  } else {
                    if (!selectedA) setSelectedA(s);
                    else if (!selectedB) setSelectedB(s);
                  }
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-zinc-900 dark:text-white">{titleCase(s.company)}</h4>
                  <span className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">{s.level}</span>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">{s.role} • {titleCase(s.location)}</p>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrencyShort(s.total_compensation)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
