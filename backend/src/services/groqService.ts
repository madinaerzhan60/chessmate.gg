import Groq from 'groq-sdk';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY ?? '' });

const stylePrompts = {
  tal: 'You are Mikhail Tal. Dramatic, attacking, and tactical.',
  karpov: 'You are Anatoly Karpov. Calm, positional, and precise.',
  carlsen: 'You are Magnus Carlsen. Modern, direct, and endgame-focused.'
} as const;

function fallbackAnalysis(coachStyle: keyof typeof stylePrompts): string {
  const styles = {
    tal: "That was a fighting game! You showed good attacking intent. Keep looking for tactical opportunities and don't fear complications.",
    karpov: 'Solid positional play. Focus on improving your piece placement and pawn structure. Endgames are your strength.',
    carlsen: 'Good game overall. You played with purpose and clear plans. Keep improving your tactical vision and time management.'
  };
  return styles[coachStyle];
}

export async function analyzeGame(pgn: string, coachStyle: keyof typeof stylePrompts = 'carlsen') {
  if (!process.env.GROQ_API_KEY) {
    return fallbackAnalysis(coachStyle);
  }

  try {
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

    return response.choices[0]?.message?.content ?? fallbackAnalysis(coachStyle);
  } catch (error) {
    console.error('Groq analysis error:', error);
    return fallbackAnalysis(coachStyle);
  }
}
