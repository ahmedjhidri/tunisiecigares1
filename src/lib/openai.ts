import OpenAI from "openai";

export const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY. Add it to .env.local");
  }
  return new OpenAI({ apiKey });
};

