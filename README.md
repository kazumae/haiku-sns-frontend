This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Storybook の使い方

## 概要
このプロジェクトではStorybookを使用してUIコンポーネントの開発と管理を行っています。Storybookは、コンポーネントを独立した環境で開発・テストできるツールです。

## 起動方法

```bash
npm run storybook
# または
yarn storybook
```

デフォルトで http://localhost:6006 で起動します。

## ストーリーの作成方法

各コンポーネントのストーリーは `src/stories` ディレクトリに配置します。
基本的な構造は以下の通りです：

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../components/ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    // コンポーネントのプロパティをここで設定
  },
};
```

## ディレクトリ構成

```
.
├── .storybook/          # Storybook設定ファイル
├── src/
│   ├── components/      # UIコンポーネント
│   └── stories/         # Storybookのストーリーファイル
```

## コマンド一覧

- `yarn storybook`: 開発モードでStorybookを起動
- `yarn build-storybook`: Storybookを静的サイトとしてビルド

## ベストプラクティス

1. 新しいコンポーネントを作成したら、必ずストーリーも作成する
2. コンポーネントの全ての重要な状態をストーリーとして定義する
3. argsを使用してプロパティを制御可能にする
4. コンポーネントのドキュメントとして活用する
