import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { titleCase } from '@/lib/normalize';
import { Building2, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CompaniesPage() {
  const companiesData = await prisma.salary.groupBy({
    by: ['company'],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: 'desc',
      },
    },
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Companies</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Select a company to view deep compensation intelligence and distributions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companiesData.map((c) => (
          <Link
            key={c.company}
            href={`/companies/${encodeURIComponent(c.company)}`}
            className="group pro-card p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                <Building2 className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">
                  {titleCase(c.company)}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{c._count.id} verified records</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
          </Link>
        ))}
      </div>
      
      {companiesData.length === 0 && (
        <div className="text-center py-20 border border-slate-800 rounded-xl bg-slate-900/50">
          <p className="text-slate-400 text-lg">No companies found in the database.</p>
        </div>
      )}
    </div>
  );
}
