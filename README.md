# DocGenius

DocGeniusは、コードベースを分析して自動的に開発ドキュメントを生成するCLIツールです。Google GenAI（Gemini）を使用して、コードの構造を理解し、開発者向けの包括的なドキュメントを生成します。

## 特徴

- コードベースの自動分析
- 開発者向けドキュメントの自動生成
- プロジェクト構造の可視化
- カスタマイズ可能な設定
- TypeScriptで実装された堅牢なコードベース
- Gemini 2.5 Proモデルを使用した高精度な分析

## 必要条件

- Node.js 20以上
- npm または yarn
- Google GenAI APIキー（Gemini 2.5 Proモデルへのアクセス権限が必要）

## インストール

```bash
npm install -g docgenius
```

## 使用方法

1. Google GenAI APIキーを取得（Gemini 2.5 Proモデルへのアクセス権限が必要）
2. 以下のコマンドを実行：

```bash
docgenius YOUR-API-KEY
```

## 設定

`config.ts`で以下の設定をカスタマイズできます：

- `fileExtensions`: 分析対象のファイル拡張子
- `excludePatterns`: 除外するパターン
- `maxFiles`: 最大ファイル数

## 出力

生成されたドキュメントは以下のような内容を含みます：

- 開発環境のセットアップ方法
- プロジェクト構造の説明
- 開発ワークフローの説明
- コーディング規約
- デバッグ方法
- テスト方法
- ビルドとデプロイメントの手順

## 開発

### セットアップ

```bash
git clone https://github.com/your-username/docgenius.git
cd docgenius
npm install
```

### 開発サーバーの起動

```bash
npm run dev --apikey YOUR-API-KEY
```

## 制限事項

- 現在、Gemini 2.5 Proモデルのみをサポートしています
- 他のAIモデルやバージョンには対応していません

## ライセンス

MIT License

## 貢献

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 謝辞

- Google GenAI（特にGemini 2.5 Pro）
- Mermaid.js
- その他の依存ライブラリの作者
