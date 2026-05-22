import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { SalaryRecord } from '@/types';
import { titleCase } from '@/lib/normalize';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { offerA, offerB }: { offerA: SalaryRecord; offerB: SalaryRecord } = await req.json();

    if (!offerA || !offerB) {
      return NextResponse.json({ error: 'Missing offers' }, { status: 400 });
    }

    const prompt = `
You are an expert tech compensation negotiator and career advisor.
Analyze the following two job offers for the Indian tech market.
Provide a concise, direct, and highly strategic evaluation (under 150 words).
Focus on:
1. Short-term vs long-term cash flow (Base vs RSUs).
2. Level differences (e.g. L4 vs L5).
3. The overall better financial decision depending on risk tolerance.

Offer A:
Company: ${titleCase(offerA.company)}
Role: ${offerA.role}
Level: ${offerA.level}
Experience: ${offerA.experience_years} years
Base Salary: ₹${offerA.base_salary}
Bonus: ₹${offerA.bonus}
Stock/RSU: ₹${offerA.stock}
Total Comp: ₹${offerA.total_compensation}

Offer B:
Company: ${titleCase(offerB.company)}
Role: ${offerB.role}
Level: ${offerB.level}
Experience: ${offerB.experience_years} years
Base Salary: ₹${offerB.base_salary}
Bonus: ₹${offerB.bonus}
Stock/RSU: ₹${offerB.stock}
Total Comp: ₹${offerB.total_compensation}

Do not use pleasantries. Output only the analysis.
`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant', // Very fast model for quick insights
    });

    const insight = completion.choices[0]?.message?.content || 'No insight could be generated.';

    return NextResponse.json({ insight });
  } catch (err) {
    console.error('AI Evaluate Offer Error:', err);
    return NextResponse.json({ error: 'Failed to generate insight' }, { status: 500 });
  }
}
