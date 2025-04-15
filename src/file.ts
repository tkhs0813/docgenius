import { readFile, mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';

import { glob } from 'glob';

import { Config } from './config';

export interface File {
  path: string;
  content: string;
}

export async function findFiles(directory: string, config: Config): Promise<File[]> {
  const patterns = config.fileExtensions.map(ext => `**/*.${ext}`);

  const files = await glob(patterns, {
    cwd: directory,
    ignore: config.excludePatterns,
    absolute: true,
    dot: true,
  });

  const fileContents = await Promise.all(
    files.slice(0, config.maxFiles).map(async filePath => {
      const content = await readFile(filePath, 'utf-8');
      return {
        path: filePath,
        content,
      };
    })
  );

  return fileContents;
}

export async function saveDiagram(
  content: string,
  config: Config,
  filename: string = 'diagram.md'
): Promise<void> {
  const diagramPath = join(config.output, filename);
  await wrapWriteFile(diagramPath, content);
}

async function wrapWriteFile(path: string, content: string): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, 'utf-8');
}
