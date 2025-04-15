# 貢献ガイド

Blueprint AIへの貢献に興味を持っていただき、ありがとうございます！このドキュメントでは、プロジェクトへの貢献方法について説明します。

## 行動規範

このプロジェクトとそのコミュニティは、[Contributor Covenant](https://www.contributor-covenant.org/)の行動規範に従います。

## 開発環境のセットアップ

1. リポジトリをフォーク
2. ローカルにクローン

```bash
git clone https://github.com/your-username/blueprint-ai.git
cd blueprint-ai
```

3. 依存関係をインストール

```bash
npm install
```

## 開発ワークフロー

1. 新しいブランチを作成

```bash
git checkout -b feature/your-feature-name
```

2. 変更を加える

3. テストを実行

```bash
npm test
```

4. 変更をコミット

```bash
git commit -m "feat: add your feature"
```

5. ブランチにプッシュ

```bash
git push origin feature/your-feature-name
```

6. プルリクエストを作成

## コーディング規約

- TypeScriptの型を適切に使用
- ESLintのルールに従う
- テストを書く
- ドキュメントを更新する

## プルリクエストのプロセス

1. プルリクエストを作成する前に、最新の`main`ブランチをマージ
2. 変更内容を明確に説明
3. 関連するIssueを参照
4. テストが通ることを確認
5. コードレビューに対応

## バグ報告

1. Issueテンプレートを使用
2. 再現手順を詳細に記述
3. 期待される動作と実際の動作を説明
4. 環境情報を提供

## 機能リクエスト

1. Issueテンプレートを使用
2. 機能の目的を説明
3. ユースケースを提供
4. 代替案を検討

## ドキュメント

- README.mdの更新
- コードコメントの追加
- APIドキュメントの更新

## リリースプロセス

1. バージョン番号の更新
2. CHANGELOG.mdの更新
3. タグの作成
4. npmへの公開

## 質問やサポート

- GitHub Issuesを使用
- ディスカッション機能を活用
- コミュニティチャンネルに参加

## 謝辞

貢献していただいたすべての方に感謝します！
