import { GoogleGenAI } from '@google/genai';

import type { Config } from './config';

export interface Model {
  generate: (prompt: string) => Promise<string | undefined>;
}

export async function getModel(config: Config): Promise<Model> {
  const ai = new GoogleGenAI({ apiKey: config.apiKey });

  return {
    generate: async (prompt: string) => {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro-exp-03-25',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: 'You are an expert software engineer and technical writer. Generate high-quality documentation based on the provided code and requirements.',
              },
              {
                text: prompt,
              },
            ],
          },
        ],
      });

      return response.candidates?.[0]?.content?.parts?.[0]?.text;
    },
  };
}
