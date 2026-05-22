'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ShieldCheck, MessageSquareText, Sparkles, Send } from 'lucide-react';

const LEVELS = ['L3', 'L4', 'L5', 'L6', 'L7'];

export default function NegotiatePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [playbook, setPlaybook] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    setPlaybook(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      company: formData.get('company'),
      role: formData.get('role'),
      level: formData.get('level'),
      base_salary: formData.get('base_salary'),
      bonus: formData.get('bonus') || 0,
      stock: formData.get('stock') || 0,
    };

    try {
      const res = await fetch('/api/ai/negotiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const { playbook } = await res.json();
        setPlaybook(playbook);
      }
    } catch (err) {
      setPlaybook('An error occurred while generating your playbook. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 mb-5 shadow-sm">
          <MessageSquareText className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">Negotiation Playbooks</h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-[15px] max-w-2xl mx-auto">
          Input your current offer details below. Our AI engine will cross-reference it against our database and generate a personalized, step-by-step negotiation script for you to send to your recruiter.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Form */}
        <div className="lg:col-span-5">
          <div className="pro-card p-6 md:p-8">
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-6 text-lg">Your Current Offer</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Company</label>
                  <input required name="company" type="text" placeholder="e.g. Google" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Role</label>
                    <input required name="role" type="text" placeholder="e.g. SDE" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Level</label>
                    <select required name="level" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500">
                      <option value="">Select Level</option>
                      {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <hr className="border-zinc-200 dark:border-zinc-800/60" />

              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Base Salary (INR)</label>
                  <input required name="base_salary" type="number" min="0" placeholder="e.g. 3500000" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 tabular-data" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Sign-on Bonus</label>
                    <input name="bonus" type="number" min="0" placeholder="0" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 tabular-data" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">RSU (Annual)</label>
                    <input name="stock" type="number" min="0" placeholder="0" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 tabular-data" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full pro-button pro-button-primary h-12 text-[15px] font-semibold rounded-lg mt-6 flex items-center justify-center gap-2 shadow-sm"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-zinc-950"></div>
                    Analyzing Market Data...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Playbook
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Output View */}
        <div className="lg:col-span-7">
          {!playbook && !isGenerating && (
            <div className="h-full min-h-[400px] border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-zinc-50/50 dark:bg-zinc-900/20">
              <ShieldCheck className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mb-4" />
              <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">Ready to analyze</h3>
              <p className="text-sm text-zinc-500 max-w-sm">
                Enter your offer details on the left. We will compare it against our verified database to construct the perfect negotiation strategy.
              </p>
            </div>
          )}

          {isGenerating && (
            <div className="h-full min-h-[400px] pro-card flex flex-col items-center justify-center p-8 text-center animate-pulse">
               <Sparkles className="w-8 h-8 text-zinc-400 mb-4 animate-bounce" />
               <p className="text-zinc-500 font-medium tracking-wide uppercase text-sm">Consulting Database & Generating Script...</p>
            </div>
          )}

          {playbook && !isGenerating && (
            <div className="pro-card p-6 md:p-8 h-full">
              <div className="flex items-center gap-2 mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="bg-zinc-900 dark:bg-zinc-100 p-1.5 rounded text-white dark:text-zinc-900">
                  <Send className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white text-lg">Your Negotiation Playbook</h3>
              </div>
              <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-semibold prose-pre:bg-zinc-900 prose-pre:text-zinc-100 prose-a:text-blue-600 dark:prose-a:text-blue-400">
                <ReactMarkdown>{playbook}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
