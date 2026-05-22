import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { prisma } from '@/lib/prisma';
import { calculatePercentile, calculateMedian } from '@/lib/normalize';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { company, role, level, base_salary, bonus, stock } = await req.json();

    const total_comp = Number(base_salary) + Number(bonus) + Number(stock);

    // Fetch market data to ground the AI's advice
    const marketData = await prisma.salary.findMany({
      where: {
        company: { contains: company, mode: 'insensitive' },
        level: level,
      }
    });

    let contextText = '';
    if (marketData.length > 0) {
      const comps = marketData.map(s => s.total_compensation);
      const median = calculateMedian(comps);
      const p75 = calculatePercentile(comps, 75);
      
      const isBelowMedian = total_comp < median;
      const difference = isBelowMedian ? median - total_comp : total_comp - median;
      const pos = isBelowMedian ? 'below' : 'above';

      contextText = `
      MARKET CONTEXT (Based on our verified database for ${company} ${level}):
      - Median Total Comp: ₹${median}
      - 75th Percentile: ₹${p75}
      - The user's offer is ₹${difference} ${pos} the median.
      - We have ${marketData.length} data points for this specific company and level.
      `;
    } else {
      contextText = `We don't have exact verified data for ${company} at ${level}. Base your negotiation advice on general top-tier Indian tech compensation trends for an ${level} ${role}.`;
    }

    const prompt = `
You are the CompIntel AI Negotiation Expert. 
A user has received an offer for the following position:
- Company: ${company}
- Role: ${role}
- Level: ${level}
- Base Salary: ₹${base_salary}
- Bonus/Sign-on: ₹${bonus}
- Stock/RSU (Annual): ₹${stock}
- Total Compensation: ₹${total_comp}

${contextText}

Generate a concise, highly actionable "Negotiation Playbook" for this user. 
Format using markdown. 
Include:
1. **Offer Assessment**: A 1-2 sentence blunt assessment of whether this is a strong offer based on the context.
2. **The Strategy**: What specific levers should they pull? (e.g., "Ask for more stock, the base is already maxed").
3. **The Script**: Provide an exact, professional email template they can copy/paste to the recruiter to negotiate for a better package. Keep the script polite but firm.
    `;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.6,
      max_tokens: 1024,
    });

    const playbook = completion.choices[0]?.message?.content || 'Failed to generate playbook.';

    return NextResponse.json({ playbook });
  } catch (error) {
    console.error('Negotiate API Error:', error);
    return NextResponse.json({ error: 'Failed to generate negotiation playbook' }, { status: 500 });
  }
}
