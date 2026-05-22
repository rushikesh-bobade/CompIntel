import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { normalizeCompany, calculateMedian } from '@/lib/normalize';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ company: string }> }
) {
  try {
    const { company: rawCompany } = await params;
    const company = normalizeCompany(decodeURIComponent(rawCompany));

    const salaries = await prisma.salary.findMany({
      where: { company },
      orderBy: { total_compensation: 'desc' },
    });

    if (salaries.length === 0) {
      return NextResponse.json(
        { error: 'Company not found or no salary data available' },
        { status: 404 }
      );
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

    return NextResponse.json({
      company,
      salaries,
      median_compensation,
      avg_compensation,
      max_compensation,
      min_compensation,
      level_distribution,
      role_distribution,
      location_distribution,
      total_entries: salaries.length,
    });
  } catch (err) {
    console.error('GET /api/company error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
