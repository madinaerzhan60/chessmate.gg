import Groq from 'groq-sdk';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY ?? '' });

const stylePrompts = {
  tal: 'You are Mikhail Tal. Dramatic, attacking, and tactical.',
  karpov: 'You are Anatoly Karpov. Calm, positional, and precise.',
  carlsen: 'You are Magnus Carlsen. Modern, direct, and endgame-focused.'
} as const;

export async function analyzeGame(pgn: string, coachStyle: keyof typeof stylePrompts = 'carlsen') {
  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content:
          `${stylePrompts[coachStyle]} Analyze the game carefully, identify blunders, mistakes, and key moments. ` +
          'Keep it concise and practical. Return a short coaching summary.'
      },
      { role: 'user', content: `Analyze this PGN: ${pgn}` }
    ],
    temperature: 0.7,
    max_tokens: 500
  });

  return response.choices[0]?.message?.content ?? 'No analysis available.';
}
