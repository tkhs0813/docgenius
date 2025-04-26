import type { Config } from './config';
import type { File } from './file';
import type { Model } from './model';

export interface DevelopmentGuideGenerator {
  generateDevelopmentGuide: (files: File[]) => Promise<string>;
  generateSetupGuide: (files: File[]) => Promise<string>;
}

export async function getDevelopmentGuideGenerator(
  model: Model,
  config: Config
): Promise<DevelopmentGuideGenerator> {
  return {
    generateDevelopmentGuide: async (files: File[]) => {
      const prompt = createDevelopmentGuidePrompt(files, config.language);
      const response = await model.generate(prompt);
      if (!response) {
        throw new Error('No response from model');
      }
      return normalizeMarkdownOutput(response.text);
    },
    generateSetupGuide: async (files: File[]) => {
      const prompt = createSetupGuidePrompt(files, config.language);
      const response = await model.generate(prompt);
      if (!response) {
        throw new Error('No response from model');
      }
      return normalizeMarkdownOutput(response.text);
    },
  };
}

function createDevelopmentGuidePrompt(files: File[], language: 'en' | 'ja'): string {
  const FILE_SEPARATOR = '==========';
  const filesContents = files
    .map(file => `${file.path}\n${file.content}\n${FILE_SEPARATOR}`)
    .join('\n');

  if (language === 'ja') {
    return `あなたは熟練したソフトウェアエンジニアです。
以下のコードベースを分析し、開発者向けのドキュメントを生成してください。

**要件:**
1. 開発環境のセットアップ方法
   - 必要なツールとバージョン
   - 環境構築手順
   - 推奨する開発ツール

2. プロジェクトの構造と主要なファイル
   - ディレクトリ構成の説明
   - 主要なファイルの役割
   - 設定ファイルの解説

3. 開発ワークフローとプロセス
   - ブランチ戦略
   - コミット規約
   - レビュープロセス

4. コーディング規約とベストプラクティス
   - 命名規則
   - コードフォーマット
   - ドキュメント規約

5. デバッグとトラブルシューティング
   - ログの確認方法
   - デバッグツールの使用方法
   - 一般的な問題の解決方法

6. テスト方法と戦略
   - テストの種類と目的
   - テストの実行方法
   - テストカバレッジの要件

7. ビルドとデプロイメント
   - ビルドプロセス
   - デプロイメントフロー
   - 環境ごとの設定

**出力形式:**
- GitHubで直接表示できるマークダウン形式で出力
- 見出しレベルを適切に使用
- コードブロックは適切にフォーマット
- ディレクトリ構成はtree形式で出力
- 開発ワークフローはsequenceDiagramで出力
- 図表は必要に応じてMermaid.js形式で記述
- 出力はマークダウンの内容のみとし、追加の説明やテキストを含めないこと
- 出力全体を\`\`\`markdown\`\`\`や\`\`\`\`\`\`で囲まないこと

**Mermaid.jsの構文ルール:**
1. 図は mermaid.js の構文で出力すること。
2. mermaid.js の subgraph 機能を使用し、階層構造を持たせること。
3. subgraph の名前と、その中のノード名を同じにしないこと（循環を防ぐため）。
4. 出力には {}:() の文字を含めないこと。(重要)
5. 図は高レベルのものであり、詳細すぎないこと。

**コードファイル:**
${filesContents}`;
  } else {
    return `You are an expert software engineer.
Please analyze the following codebase and generate developer documentation.

**Requirements:**
1. Development Environment Setup
   - Required tools and versions
   - Environment setup procedures
   - Recommended development tools

2. Project Structure and Key Files
   - Directory structure explanation
   - Key file roles
   - Configuration file explanations

3. Development Workflow and Process
   - Branch strategy
   - Commit conventions
   - Review process

4. Coding Standards and Best Practices
   - Naming conventions
   - Code formatting
   - Documentation standards

5. Debugging and Troubleshooting
   - Log checking methods
   - Debug tool usage
   - Common issue resolution

6. Testing Methods and Strategy
   - Test types and purposes
   - Test execution methods
   - Test coverage requirements

7. Build and Deployment
   - Build process
   - Deployment flow
   - Environment-specific settings

**Output Format:**
- Output in GitHub-compatible markdown format
- Use appropriate heading levels
- Format code blocks properly
- Output directory structure in tree format
- Use sequenceDiagram for development workflows
- Use Mermaid.js format for diagrams when needed
- Output only markdown content without additional explanations
- Do not wrap the entire output in \`\`\`markdown\`\`\` or \`\`\`\`\`\`

**Mermaid.js Syntax Rules:**
1. Use mermaid.js syntax for diagrams
2. Use subgraph feature to create hierarchical structures
3. Avoid using the same name for subgraph and its nodes (to prevent cycles)
4. Do not include {}:() characters in output (important)
5. Keep diagrams high-level, not too detailed

**Code Files:**
${filesContents}`;
  }
}

function createSetupGuidePrompt(files: File[], language: 'en' | 'ja'): string {
  const FILE_SEPARATOR = '==========';
  const filesContents = files
    .map(file => `${file.path}\n${file.content}\n${FILE_SEPARATOR}`)
    .join('\n');

  if (language === 'ja') {
    return `あなたは熟練したソフトウェアエンジニアです。
以下のコードベースを分析し、セットアップガイドを生成してください。

**要件:**
1. 環境要件の自動抽出
   - 必要なランタイム環境（Node.js、Python等）
   - 必要なパッケージやライブラリ
   - 必要な外部サービス（APIキー等）
   - 必要なハードウェア要件

2. インストール手順の生成
   - リポジトリのクローン方法
   - 依存関係のインストール方法
   - ビルド手順
   - 初期設定手順

3. 開発プロセス
   - ブランチ戦略
   - プルリクエストのワークフロー
   - コードレビューのプロセス
   - テスト戦略
   - CI/CDパイプラインの説明（.github/workflows/ディレクトリの内容を分析）
   - リリースプロセス（パッケージ公開が必要な場合のみ）

**重要な注意事項:**
- CI/CD設定ファイル（.github/workflows/）が存在しない場合は、その旨を明記し、設定が必要なことを説明してください
- 実際のプロジェクトの状態を正確に反映してください
- 一般的な例ではなく、実際のコードベースから抽出した情報を使用してください
- プロジェクトの種類に応じて、必要なセクションのみを含めてください
  - 例：Webアプリの場合はリリースプロセスが不要
  - 例：ライブラリの場合はパッケージ公開の手順が必要

**出力形式:**
- GitHubで直接表示できるマークダウン形式で出力
- 見出しレベルを適切に使用
- コードブロックは適切にフォーマット
- 出力はマークダウンの内容のみとし、追加の説明やテキストを含めないこと

**コードファイル:**
${filesContents}`;
  } else {
    return `You are an expert software engineer.
Please analyze the following codebase and generate a setup guide.

**Requirements:**
1. Automatic Environment Requirements Extraction
   - Required runtime environments (Node.js, Python, etc.)
   - Required packages and libraries
   - Required external services (API keys, etc.)
   - Required hardware specifications

2. Installation Procedure Generation
   - Repository cloning method
   - Dependency installation method
   - Build procedure
   - Initial configuration steps

3. Development Process
   - Branch strategy
   - Pull request workflow
   - Code review process
   - Test strategy
   - CI/CD pipeline explanation (analyzing .github/workflows/ directory)
   - Release process (if package publication is required)

**Important Notes:**
- If CI/CD configuration files (.github/workflows/) do not exist, clearly state this and explain that configuration is needed
- Accurately reflect the actual project state
- Use information extracted from the actual codebase, not generic examples
- Include only necessary sections based on project type
  - Example: Web apps don't need release process
  - Example: Libraries need package publication steps

**Output Format:**
- Output in GitHub-compatible markdown format
- Use appropriate heading levels
- Format code blocks properly
- Output only markdown content without additional explanations

**Code Files:**
${filesContents}`;
  }
}

function normalizeMarkdownOutput(markdown: string): string {
  return markdown.trim();
}
