import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { normalizeCompany, titleCase, calculateMedian } from '@/lib/normalize';
import { CompanyStats } from '@/components/CompanyStats';
import { SalaryTable } from '@/components/SalaryTable';
import { SalaryScatterPlot } from '@/components/SalaryScatterPlot';
import { Building2, Sparkles } from 'lucide-react';
import Groq from 'groq-sdk';

export const dynamic = 'force-dynamic';

export default async function CompanyDetailPage({ params }: { params: Promise<{ company: string }> }) {
  const { company: rawCompany } = await params;
  const company = normalizeCompany(decodeURIComponent(rawCompany));

  const salaries = await prisma.salary.findMany({
    where: { company },
    orderBy: { total_compensation: 'desc' },
  });

  if (salaries.length === 0) {
    notFound();
  }

  const comps = salaries.map((s) => s.total_compensation);
  const median_compensation = calculateMedian(comps);
  const avg_compensation = Math.round(comps.reduce((a, b) => a + b, 0) / comps.length);
  const max_compensation = Math.max(...comps);
  const min_compensation = Math.min(...comps);

  const level_distribution = salaries.reduce((acc, s) => {
    acc[s.level] = (acc[s.level] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const role_distribution = salaries.reduce((acc, s) => {
    acc[s.role] = (acc[s.role] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const location_distribution = salaries.reduce((acc, s) => {
    acc[s.location] = (acc[s.location] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = {
    company,
    salaries: [], // Not needed for the stats component itself
    median_compensation,
    avg_compensation,
    max_compensation,
    min_compensation,
    level_distribution,
    role_distribution,
    location_distribution,
    total_entries: salaries.length,
  };

  let aiInsight = 'No insight available at the moment.';
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const prompt = `
You are an expert tech compensation analyst.
Analyze the compensation data for the company "${titleCase(company)}" in the Indian tech market.
Data summary:
- Total records: ${stats.total_entries}
- Median Total Comp: ₹${stats.median_compensation}
- Average Total Comp: ₹${stats.avg_compensation}
- Top Levels: ${JSON.stringify(stats.level_distribution)}
- Top Roles: ${JSON.stringify(stats.role_distribution)}

Provide a very concise, 2-3 sentence strategic summary (under 60 words).
Focus on their likely compensation philosophy (e.g., do they pay top of market? Are they heavily skewed towards senior roles?). 
Do not use pleasantries. Output only the analysis.
`;
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
    });
    aiInsight = completion.choices[0]?.message?.content || aiInsight;
  } catch (e) {
    console.error('Groq AI Insight Error', e);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-4 border-b border-slate-800 pb-8">
        <div className="bg-blue-600/10 p-4 rounded-2xl">
          <Building2 className="w-10 h-10 text-blue-500" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">{titleCase(company)}</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">Compensation Intelligence & Salary Distributions</p>
        </div>
      </div>

      <div className="pro-card p-6 border-t-2 border-t-zinc-400">
        <h3 className="text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          AI Market Analysis
        </h3>
        <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed text-[15px]">{aiInsight}</p>
      </div>

      <CompanyStats stats={stats as any} />

      <div className="mb-12">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Compensation Curve</h2>
        <SalaryScatterPlot salaries={salaries as any} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Verified Salaries at {titleCase(company)}</h2>
        <SalaryTable salaries={salaries as any} />
      </div>
    </div>
  );
}
