'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Plus, Sun, Moon } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useEffect, useState } from 'react';

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-900 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl transition-all">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-[16px] tracking-tight hover:text-black dark:hover:text-white transition-colors group">
            <div className="bg-zinc-900 dark:bg-zinc-100 p-1.5 rounded-lg shadow-sm group-hover:scale-105 transition-transform">
              <Logo className="w-4 h-4 text-white dark:text-zinc-950" />
            </div>
            CompIntel
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="/salaries" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Salaries
            </Link>
            <Link href="/companies" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Companies
            </Link>
            <Link href="/compare" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Compare Offers
            </Link>
            <Link href="/analytics" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1">
              Analytics <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-[9px] px-1.5 py-0.5 rounded-full font-bold">NEW</span>
            </Link>
            <Link href="/negotiate" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-semibold text-blue-600 dark:text-blue-400">
              AI Negotiation
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          <Link 
            href="/add" 
            className="hidden md:flex items-center gap-1.5 pro-button pro-button-secondary py-1.5 px-3 text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Contribute
          </Link>
        </div>
      </div>
    </nav>
  );
}
