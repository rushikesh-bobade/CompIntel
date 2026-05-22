import Link from 'next/link';
import { ArrowRight, BarChart3, Building, ShieldCheck } from 'lucide-react';
import { formatCurrencyShort } from '@/lib/normalize';

export const dynamic = 'force-dynamic';

async function getStats() {
  try {
    const res = await fetch('http://localhost:3000/api/stats', { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const stats = await getStats();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 flex flex-col items-center text-center px-4 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-8 backdrop-blur-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" />
          <span>Verified Market Intelligence</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-zinc-950 dark:text-white mb-6 leading-[1.1] max-w-4xl">
          Don't guess your worth. <br/>
          <span className="text-zinc-400 dark:text-zinc-500">Know it precisely.</span>
        </h1>
        
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl font-normal leading-relaxed">
          The most accurate compensation platform for the Indian tech market. 
          Compare salaries by exact engineering levels, completely anonymously.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md mx-auto">
          <Link href="/salaries" className="pro-button pro-button-primary w-full sm:w-auto h-11 px-8 text-[15px]">
            Explore Salaries
          </Link>
          <Link href="/add" className="pro-button pro-button-secondary w-full sm:w-auto h-11 px-8 text-[15px]">
            Contribute Data
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full max-w-5xl py-8 mb-24 border-y border-zinc-200 dark:border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-900">
          <div className="flex flex-col items-center justify-center p-4">
            <h3 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-1 tracking-tight">
              {stats ? stats.total_entries.toLocaleString() : '80+'}
            </h3>
            <p className="text-zinc-500 text-sm font-medium">Verified Records</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <h3 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-1 tracking-tight">
              {stats ? stats.total_companies.toLocaleString() : '15+'}
            </h3>
            <p className="text-zinc-500 text-sm font-medium">Top Tier Companies</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <h3 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-1 tracking-tight tabular-data">
              {stats ? formatCurrencyShort(stats.median_l5_compensation) : '45L+'}
            </h3>
            <p className="text-zinc-500 text-sm font-medium">Median L5 (Senior) Comp</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-6xl py-12 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="pro-card p-8">
            <div className="bg-zinc-100 dark:bg-zinc-800/50 w-10 h-10 rounded-lg flex items-center justify-center mb-6 border border-zinc-200 dark:border-zinc-700/50">
              <BarChart3 className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            </div>
            <h3 className="text-[17px] font-semibold text-zinc-900 dark:text-white mb-2 tracking-tight">Level-Based Comp</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed">
              "Senior Engineer" means different things everywhere. We index by strict engineering levels (L3 to L7) so you're comparing apples to apples.
            </p>
          </div>

          <div className="pro-card p-8">
            <div className="bg-zinc-100 dark:bg-zinc-800/50 w-10 h-10 rounded-lg flex items-center justify-center mb-6 border border-zinc-200 dark:border-zinc-700/50">
              <Building className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            </div>
            <h3 className="text-[17px] font-semibold text-zinc-900 dark:text-white mb-2 tracking-tight">Company Intel</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed">
              Dive into detailed distribution metrics for individual companies. See top paying locations, roles, and historical compensation trends.
            </p>
          </div>

          <div className="pro-card p-8">
            <div className="bg-zinc-100 dark:bg-zinc-800/50 w-10 h-10 rounded-lg flex items-center justify-center mb-6 border border-zinc-200 dark:border-zinc-700/50">
              <ShieldCheck className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            </div>
            <h3 className="text-[17px] font-semibold text-zinc-900 dark:text-white mb-2 tracking-tight">Smart Comparisons</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed">
              Got two offers? Put them side by side. Our engine automatically calculates base, stock, and bonus differences with AI-driven insights.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full max-w-4xl py-16 pro-card text-center px-6 mb-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-3 tracking-tight">Ready to negotiate your next offer?</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg mx-auto text-[15px]">
          Join top tech professionals who use CompIntel to understand their true market value and negotiate better packages.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/salaries" className="pro-button pro-button-secondary h-11 px-6">
            Browse Database
          </Link>
          <Link href="/negotiate" className="pro-button pro-button-primary h-11 px-6">
            Generate Negotiation Script <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
