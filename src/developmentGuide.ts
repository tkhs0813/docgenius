import type { File } from './file';
import type { Model } from './model';

export interface DevelopmentGuideGenerator {
  generateDevelopmentGuide: (files: File[]) => Promise<string>;
  generateSetupGuide: (files: File[]) => Promise<string>;
}

export async function getDevelopmentGuideGenerator(
  model: Model
): Promise<DevelopmentGuideGenerator> {
  return {
    generateDevelopmentGuide: async (files: File[]) => {
      const prompt = createDevelopmentGuidePrompt(files);
      const response = await model.generate(prompt);
      if (!response) {
        throw new Error('No response from model');
      }
      return normalizeMarkdownOutput(response);
    },
    generateSetupGuide: async (files: File[]) => {
      const prompt = createSetupGuidePrompt(files);
      const response = await model.generate(prompt);
      if (!response) {
        throw new Error('No response from model');
      }
      return normalizeMarkdownOutput(response);
    },
  };
}

function normalizeMarkdownOutput(content: string): string {
  // ```markdown で囲まれている場合、その部分を抽出
  const markdownBlockMatch = content.match(/```markdown\n([\s\S]*?)\n```/);
  if (markdownBlockMatch) {
    return markdownBlockMatch[1].trim();
  }

  // ``` で囲まれている場合、その部分を抽出
  // console.log(content);
  // const codeBlockMatch = content.match(/```\n([\s\S]*?)\n```/);
  // if (codeBlockMatch) {
  //   return codeBlockMatch[1].trim();
  // }

  // 囲まれていない場合はそのまま返す
  return content.trim();
}

function createDevelopmentGuidePrompt(files: File[]): string {
  const FILE_SEPARATOR = '==========';
  const filesContents = files
    .map(file => `${file.path}\n${file.content}\n${FILE_SEPARATOR}`)
    .join('\n');

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
${filesContents}

**出力例:**
# システム名 開発ドキュメント

## 1. 開発環境
- 必要なツールとバージョン
- 環境構築手順
- 推奨する開発ツール

## 2. プロジェクト構造
\`\`\`
プロジェクト名/
├── src/                    # メインのソースコードが格納されるディレクトリ
│   ├── core/              # アプリケーションのコアロジック
│   ├── tests/             # ユニットテストと統合テスト
│   └── config/            # 環境設定とアプリケーション設定
├── docs/                   # プロジェクトのドキュメント
├── scripts/               # ビルドやデプロイメント用のスクリプト
└── package.json           # プロジェクトの依存関係とスクリプト
\`\`\`

## 3. 開発ワークフロー
\`\`\`mermaid
sequenceDiagram
    actor Dev as 開発者
    participant CI as CI/CD
    participant Review as レビュアー
    participant Main as mainブランチ

    Dev->>Dev: 新機能開発開始
    Dev->>Dev: ローカルで開発・テスト
    Dev->>CI: プルリクエスト作成
    CI->>CI: 自動テスト実行
    alt テスト失敗
        CI-->>Dev: テスト結果通知
        Dev->>Dev: 修正作業
    else テスト成功
        CI-->>Review: レビュー依頼
        Review->>Review: コードレビュー
        alt レビューNG
            Review-->>Dev: 修正依頼
            Dev->>Dev: 修正作業
        else レビューOK
            Review->>Main: マージ承認
            Main->>CI: マージトリガー
            CI->>CI: デプロイメント
            CI-->>Dev: 完了通知
        end
    end
\`\`\`

各ステップの説明：
1. **開発開始**: 新機能開発の開始
2. **ローカル開発**: 開発環境での実装とテスト
3. **プルリクエスト**: 変更内容の提出
4. **CI/CD**: 自動テストの実行
5. **コードレビュー**: チームメンバーによるレビュー
6. **マージとデプロイ**: 承認後のマージとデプロイ

## 4. コーディング規約
- 命名規則
- コードフォーマット
- ドキュメント規約

## 5. デバッグ方法
- ログの確認方法
- デバッグツールの使用方法
- 一般的な問題の解決方法

## 6. テスト
- テストの種類と目的
- テストの実行方法
- テストカバレッジの要件

## 7. ビルドとデプロイ
- ビルドプロセス
- デプロイメントフロー
- 環境ごとの設定
`;
}

function createSetupGuidePrompt(files: File[]): string {
  const FILE_SEPARATOR = '==========';
  const filesContents = files
    .map(file => `${file.path}\n${file.content}\n${FILE_SEPARATOR}`)
    .join('\n');

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
- 出力全体を\`\`\`markdown\`\`\`や\`\`\`\`\`\`で囲まないこと

**コードファイル:**
${filesContents}

**出力例:**
# プロジェクト名 セットアップガイド

## 1. 環境要件

### 1.1 必要なソフトウェア
- 必要なランタイム環境（例：Node.js、Python、Java等）
- 必要なパッケージマネージャー（例：npm、yarn、pip等）
- 必要な外部APIキー（存在する場合）

### 1.2 必要な外部サービス
- 必要な外部APIやサービス（存在する場合）

## 2. インストール手順

### 2.1 リポジトリのクローン
\`\`\`bash
git clone <リポジトリのURL>
cd <プロジェクトディレクトリ>
\`\`\`

### 2.2 依存関係のインストール
\`\`\`bash
<パッケージマネージャー> install
\`\`\`

## 3. 開発プロセス

### 3.1 ブランチ戦略
- \`main\`: 本番環境用のブランチ
- \`develop\`: 開発用のブランチ
- \`feature/*\`: 新機能開発用のブランチ
- \`bugfix/*\`: バグ修正用のブランチ
- \`release/*\`: リリース準備用のブランチ

### 3.2 プルリクエストのワークフロー
1. 新しいブランチを作成
2. 変更を加える
3. テストを実行
4. プルリクエストを作成
5. コードレビューを受ける
6. 変更を反映
7. マージ

### 3.3 コードレビューのプロセス
- コードの品質チェック
- テストの確認
- ドキュメントの更新確認
- パフォーマンスの確認

### 3.4 テスト戦略
- ユニットテスト
- 統合テスト
- E2Eテスト
- パフォーマンステスト

### 3.5 CI/CDパイプライン
- テスト実行用のワークフローファイル
- ビルド用のワークフローファイル
- デプロイメント用のワークフローファイル

### 3.6 リリースプロセス（必要な場合のみ）
1. バージョン番号の更新
2. CHANGELOG.mdの更新
3. タグの作成
4. パッケージの公開（必要な場合）
`;
}
