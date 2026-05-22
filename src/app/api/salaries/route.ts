import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { normalizeCompany } from '@/lib/normalize';
import { SalaryIngestionSchema, SalaryQuerySchema } from '@/lib/validators';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 415 }
      );
    }

    const body = await req.json();
    const parsed = SalaryIngestionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const company = normalizeCompany(data.company);
    const bonus = data.bonus ?? 0;
    const stock = data.stock ?? 0;
    const total_compensation = data.base_salary + bonus + stock;

    // Duplicate detection
    const existing = await prisma.salary.findFirst({
      where: {
        company,
        role: data.role,
        level: data.level,
        experience_years: data.experience_years,
        base_salary: data.base_salary,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Duplicate entry detected', existing_id: existing.id },
        { status: 409 }
      );
    }

    const salary = await prisma.salary.create({
      data: {
        company,
        role: data.role,
        level: data.level,
        location: data.location,
        experience_years: data.experience_years,
        base_salary: data.base_salary,
        bonus,
        stock,
        total_compensation,
        confidence_score: data.confidence_score ?? 0.8,
      },
    });

    return NextResponse.json({ success: true, data: salary }, { status: 201 });
  } catch (err) {
    console.error('POST /api/salaries error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const params = Object.fromEntries(searchParams.entries());
    const parsed = SalaryQuerySchema.safeParse(params);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { company, role, level, location, sort, order, page, limit } = parsed.data;

    const where: Record<string, unknown> = {};
    if (company) where.company = { contains: normalizeCompany(company), mode: 'insensitive' };
    if (role) where.role = { contains: role, mode: 'insensitive' };
    if (level) where.level = level;
    if (location) where.location = { contains: location, mode: 'insensitive' };

    const [total, salaries] = await Promise.all([
      prisma.salary.count({ where }),
      prisma.salary.findMany({
        where,
        orderBy: { [sort]: order },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      data: salaries,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error('GET /api/salaries error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
