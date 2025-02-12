'use client';

import { useState } from 'react';
import { Comment } from '@/types/haiku';

type Props = {
  haikuId: string;
  onCommentSubmit: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
};

export default function CommentForm({ haikuId, onCommentSubmit }: Props) {
  const [lines, setLines] = useState({
    first: '',
    second: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // バリデーション（空のコメントは投稿できない）
    if (!lines.first.trim() || !lines.second.trim()) return;

    onCommentSubmit({
      user: {
        id: '999', // TODO: 実際のユーザーIDを使用
        name: '匿名', // TODO: 実際のユーザー名を使用
      },
      firstLine: lines.first,
      secondLine: lines.second,
    });

    // フォームをクリア
    setLines({ first: '', second: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4">
      <div className="space-y-3">
        <input
          type="text"
          placeholder="一行目 (7音)"
          value={lines.first}
          onChange={(e) => setLines(prev => ({ ...prev, first: e.target.value }))}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
          maxLength={20}
        />
        <input
          type="text"
          placeholder="二行目 (7音)"
          value={lines.second}
          onChange={(e) => setLines(prev => ({ ...prev, second: e.target.value }))}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
          maxLength={20}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          コメントする
        </button>
      </div>
    </form>
  );
} 