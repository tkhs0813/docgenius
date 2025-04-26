import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

import type { Config } from './config';

export interface Model {
  generate: (prompt: string) => Promise<Schema | undefined>;
}

const schema = z.object({
  text: z.string().describe('開発者ドキュメント（マークダウン形式）'),
});

type Schema = z.infer<typeof schema>;

export async function getModel(config: Config): Promise<Model> {
  const google = createGoogleGenerativeAI({
    apiKey: config.apiKey,
  });

  return {
    generate: async (prompt: string) => {
      const result = await generateObject({
        model: google('gemini-2.5-pro-exp-03-25'),
        schema: schema,
        prompt,
      });
      return result.object;
    },
  };
}
