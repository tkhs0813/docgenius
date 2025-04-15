#!/usr/bin/env node

import process from 'node:process';

import { defineCommand, runMain } from 'citty';
import { consola } from 'consola';

import { loadConfig } from './config';
import { getDevelopmentGuideGenerator } from './developmentGuide';
import { findFiles, saveDiagram } from './file';
import { getModel } from './model';

const main = defineCommand({
  meta: {
    name: 'docgenius',
    version: '1.0.0',
    description: 'DocGenius - AI-powered documentation generator for your codebase',
  },
  args: {
    apiKey: {
      type: 'positional',
      description: 'Your API key',
      required: true,
    },
    output: {
      type: 'positional',
      description: 'The output directory',
      default: './output',
    },
  },
  async run({ args }) {
    try {
      consola.start('Starting DocGenius...');

      const config = await loadConfig(args);
      const files = await findFiles('./', config);
      const model = await getModel(config);
      const docGenerator = await getDevelopmentGuideGenerator(model);

      let developmentDoc: string | undefined;

      consola.info('Generating documentation...');
      developmentDoc = await docGenerator.generateDevelopmentGuide(files);

      await saveDiagram(developmentDoc, config, 'development.md');

      consola.success('Documentation generation completed!');
    } catch (error) {
      consola.error('An error occurred during documentation generation:');
      consola.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  },
});

runMain(main);
