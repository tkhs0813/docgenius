import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false,
  clean: true,
  target: 'es2020',
  sourcemap: true,
  minify: true,
  splitting: false,
  treeshake: true,
});
