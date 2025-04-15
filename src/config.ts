export type Config = {
  fileExtensions: string[];
  excludePatterns: string[];
  maxFiles: number;
  apiKey: string;
  output: string;
  language: 'en' | 'ja';
};

const defaultConfig: Config = {
  fileExtensions: [
    'js',
    'jsx',
    'ts',
    'mjs',
    'cjs',
    'svelte',
    'md',
    'txt',
    'json',
    'yml',
    'yaml',
    'toml',
    'sh',
    'bash',
    'zsh',
    'fish',
    'ps1',
    'dockerfile',
    'dockerignore',
    'gitignore',
    'gitattributes',
    'editorconfig',
    'prettierrc',
    'eslintrc',
    'babelrc',
    'tsconfig',
    'package.json',
    'lock',
    'log',
    'env',
    'example',
    'sample',
  ],
  excludePatterns: [
    // 依存関係
    '**/node_modules/**',
    '**/bower_components/**',
    '**/jspm_packages/**',
    '**/vendor/**',
    // ビルド成果物
    '**/dist/**',
    '**/build/**',
    '**/out/**',
    '**/output/**',
    '**/.next/**',
    '**/.nuxt/**',
    // キャッシュ
    '**/.cache/**',
    '**/.temp/**',
    '**/.tmp/**',
    // ログ
    '**/*.log',
    '**/logs/**',
    // テスト関連
    '**/coverage/**',
    '**/.nyc_output/**',
    // 環境設定
    '**/.env*',
    '**/.env.*',
    // IDE設定
    '**/.idea/**',
    '**/.vscode/**',
    '**/.vs/**',
    // その他
    '**/.git/**',
    '**/Thumbs.db',
    '**/.DS_Store',
    '**/package-lock.json',
    '**/yarn.lock',
    '**/pnpm-lock.yaml',
  ],
  maxFiles: 1000,
  apiKey: '',
  output: '',
  language: 'en',
};

export function loadConfig(args: {
  apiKey: string;
  output: string;
  language?: 'en' | 'ja';
}): Config {
  return {
    ...defaultConfig,
    apiKey: args.apiKey,
    output: args.output,
    language: args.language || 'en',
  };
}
