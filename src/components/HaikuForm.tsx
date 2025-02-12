'use client';

import { useState } from 'react';

type Props = {
  onHaikuSubmit: (lines: { first: string; second: string; third: string }) => void;
};

export default function HaikuForm({ onHaikuSubmit }: Props) {
  const [lines, setLines] = useState({
    first: '',
    second: '',
    third: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // バリデーション（空の投稿は不可）
    if (!lines.first.trim() || !lines.second.trim() || !lines.third.trim()) return;

    onHaikuSubmit(lines);

    // フォームをクリア
    setLines({
      first: '',
      second: '',
      third: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-lg shadow p-4 mb-6">
      <div className="space-y-3">
        <input
          type="text"
          placeholder="一行目 (5音)"
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
        <input
          type="text"
          placeholder="三行目 (5音)"
          value={lines.third}
          onChange={(e) => setLines(prev => ({ ...prev, third: e.target.value }))}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
          maxLength={20}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          投稿する
        </button>
      </div>
    </form>
  );
} 