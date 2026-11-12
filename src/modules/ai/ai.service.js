import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const aiService = {
  async generateCycleInsight({ mood, symptoms, cyclePhase = 'menstruasi', extraNotes = '' }) {
    const systemPrompt = `
You are a warm, supportive, chill, and medically accurate big-sister health companion for teenage girls.
Your job is to explain why the user is experiencing certain moods and physical symptoms during her menstrual cycle, and provide safe, comforting, and practical tips.

Communication rules:
- Use natural, friendly, teen-relatable English. Do not sound preachy or overly clinical, and always validate her feelings.
- Do not diagnose medical conditions. If the symptoms sound severe or extreme, gently encourage her to talk to a parent/trusted adult or see a doctor.
- Output MUST be in valid JSON format with the following structure:
{
  "validation": "A short sentence validating her current feelings/condition (1-2 sentences)",
  "explanation": "An educational explanation of why hormones/her body are causing these moods & symptoms (2-3 sentences, easy to understand)",
  "actionableTips": ["Practical tip 1", "Practical tip 2", "Practical tip 3"],
  "encouragement": "A short, uplifting closing note"
}
`;

const userPrompt = `
User's current condition:
- Cycle phase: ${cyclePhase}
- Mood: ${mood}
- Physical symptoms: ${Array.isArray(symptoms) ? symptoms.join(', ') : symptoms}
${extraNotes ? `- Extra notes: ${extraNotes}` : ''}
`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile', 
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 600,
      response_format: { type: 'json_object' }, 
    });

    const rawContent = completion.choices[0]?.message?.content;
    return JSON.parse(rawContent);
  },
};

module.exports = aiService;