import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const LEVEL_ORDER = ['L3', 'L4', 'L5', 'L6', 'L7'];

function getLevelDiff(a: string, b: string): string {
  const ai = LEVEL_ORDER.indexOf(a);
  const bi = LEVEL_ORDER.indexOf(b);
  if (ai === -1 || bi === -1) return 'Unknown level comparison';
  if (ai === bi) return 'Same level';
  const diff = Math.abs(ai - bi);
  return ai < bi
    ? `${b} is ${diff} level(s) above ${a}`
    : `${a} is ${diff} level(s) above ${b}`;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id_a = searchParams.get('id_a');
    const id_b = searchParams.get('id_b');

    if (!id_a || !id_b) {
      return NextResponse.json(
        { error: 'Both id_a and id_b query parameters are required' },
        { status: 400 }
      );
    }

    if (id_a === id_b) {
      return NextResponse.json(
        { error: 'Cannot compare a salary record with itself' },
        { status: 400 }
      );
    }

    const [salary_a, salary_b] = await Promise.all([
      prisma.salary.findUnique({ where: { id: id_a } }),
      prisma.salary.findUnique({ where: { id: id_b } }),
    ]);

    if (!salary_a || !salary_b) {
      const missing = !salary_a ? id_a : id_b;
      return NextResponse.json(
        { error: `Salary record not found: ${missing}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      salary_a,
      salary_b,
      diff: {
        base: salary_a.base_salary - salary_b.base_salary,
        bonus: salary_a.bonus - salary_b.bonus,
        stock: salary_a.stock - salary_b.stock,
        total: salary_a.total_compensation - salary_b.total_compensation,
        experience: salary_a.experience_years - salary_b.experience_years,
        level_difference: getLevelDiff(salary_a.level, salary_b.level),
      },
    });
  } catch (err) {
    console.error('GET /api/compare error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
