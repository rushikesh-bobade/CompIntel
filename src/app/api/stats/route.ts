import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateMedian } from '@/lib/normalize';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [totalEntries, salaries, companies] = await Promise.all([
      prisma.salary.count(),
      prisma.salary.findMany({
        where: { level: 'L5' },
        select: { total_compensation: true },
      }),
      prisma.salary.findMany({
        distinct: ['company'],
        select: { company: true },
      }),
    ]);

    const l5Comps = salaries.map((s) => s.total_compensation);
    const medianL5 = calculateMedian(l5Comps);

    return NextResponse.json({
      total_entries: totalEntries,
      total_companies: companies.length,
      median_l5_compensation: medianL5,
    });
  } catch (err) {
    console.error('GET /api/stats error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
