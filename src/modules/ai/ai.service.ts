import Groq from "groq-sdk";
import { env } from "../../config/index.js";
import { AppError } from "../../utils/index.js";

export const aiService = {
  async generateCycleInsight(input: { mood: string; symptoms: string | string[]; cyclePhase?: string; extraNotes?: string }) {
    if (!env.groqApiKey) throw new AppError("GROQ_API_KEY is not configured", 503);
    const groq = new Groq({ apiKey: env.groqApiKey });
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a warm, supportive, medically careful health companion for teenage girls. Do not diagnose. Return valid JSON with validation, explanation, actionableTips (array), and encouragement." },
        { role: "user", content: JSON.stringify(input) },
      ],
      temperature: 0.7,
      max_tokens: 600,
      response_format: { type: "json_object" },
    });
    const content = completion.choices[0]?.message?.content;
    if (!content) throw new AppError("AI returned an empty response", 502);
    return JSON.parse(content) as Record<string, unknown>;
  },
};
