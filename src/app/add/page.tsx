'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, CheckCircle2 } from 'lucide-react';

const LEVELS = ['L3', 'L4', 'L5', 'L6', 'L7'];

export default function AddSalaryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      company: formData.get('company'),
      role: formData.get('role'),
      level: formData.get('level'),
      location: formData.get('location'),
      experience_years: Number(formData.get('experience_years')),
      base_salary: Number(formData.get('base_salary')),
      bonus: Number(formData.get('bonus') || 0),
      stock: Number(formData.get('stock') || 0),
    };

    try {
      const res = await fetch('/api/salaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/salaries');
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to submit salary');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 mb-5 shadow-sm">
          <TrendingUp className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">Contribute Salary Data</h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-[15px]">Help the community by sharing your compensation anonymously.</p>
      </div>

      <div className="pro-card p-8">
        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6 text-sm flex items-start gap-2">
            <span className="shrink-0 mt-0.5">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Company</label>
              <input required name="company" type="text" placeholder="e.g. Google" className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 placeholder-zinc-400 dark:placeholder-zinc-500 transition-shadow" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Role</label>
              <input required name="role" type="text" placeholder="e.g. Software Engineer" className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 placeholder-zinc-400 dark:placeholder-zinc-500 transition-shadow" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Level</label>
              <select required name="level" className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-shadow">
                <option value="">Select Level</option>
                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Location</label>
              <input required name="location" type="text" placeholder="e.g. Bangalore" className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 placeholder-zinc-400 dark:placeholder-zinc-500 transition-shadow" />
            </div>
          </div>

          <hr className="border-zinc-200 dark:border-zinc-800/60" />

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Years of Experience</label>
            <input required name="experience_years" type="number" min="0" max="50" step="0.1" placeholder="e.g. 4.5" className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 placeholder-zinc-400 dark:placeholder-zinc-500 transition-shadow" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Base Salary (INR)</label>
              <input required name="base_salary" type="number" min="100000" placeholder="e.g. 2500000" className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 placeholder-zinc-400 dark:placeholder-zinc-500 transition-shadow" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Bonus / Variable (INR)</label>
              <input name="bonus" type="number" min="0" defaultValue="0" className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-shadow" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Stock / RSU (INR/yr)</label>
              <input name="stock" type="number" min="0" defaultValue="0" className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-shadow" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full pro-button pro-button-primary h-14 text-[15px] font-bold rounded-xl mt-8 flex items-center justify-center gap-2 shadow-md"
          >
            {isSubmitting ? 'Encrypting & Submitting...' : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Submit Anonymously
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
