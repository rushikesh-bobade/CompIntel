import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key_for_build',
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    const systemPrompt = {
      role: 'system',
      content: `You are the CompIntel AI Assistant, an expert in the Indian tech industry compensation market.
You help engineers evaluate job offers, understand leveling (L3, L4, L5, L6, L7), negotiate better compensation, and gauge market trends.
Keep answers incredibly concise, punchy, and highly professional. Avoid generic fluff. Give actionable, numbers-driven advice where possible. Use markdown formatting to make your responses easy to read.`,
    };

    const completion = await groq.chat.completions.create({
      messages: [systemPrompt, ...messages],
      model: 'llama-3.1-8b-instant',
      temperature: 0.5,
      max_tokens: 1024,
    });

    const reply = completion.choices[0]?.message?.content || 'I am unable to process that right now.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
