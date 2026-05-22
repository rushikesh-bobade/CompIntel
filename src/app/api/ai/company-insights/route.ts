import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { titleCase } from '@/lib/normalize';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'dummy_key_for_build' });

export async function POST(req: NextRequest) {
  try {
    const { company, stats } = await req.json();

    if (!company || !stats) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

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
      model: 'llama-3.1-8b-instant', // Fast, low-latency model
    });

    const insight = completion.choices[0]?.message?.content || 'No insight could be generated.';

    return NextResponse.json({ insight });
  } catch (err) {
    console.error('AI Company Insights Error:', err);
    return NextResponse.json({ error: 'Failed to generate insight' }, { status: 500 });
  }
}
