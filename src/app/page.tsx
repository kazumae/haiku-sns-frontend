'use client';

import Header from '@/components/Header';
import Timeline from '@/components/Timeline';
import { useHaikus } from '@/hooks/useHaikus';

export default function Home() {
  const { haikus, isLoading, error } = useHaikus({ limit: 10 });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-4">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-4 text-red-600">エラー: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Timeline initialHaikus={haikus} />
    </div>
  );
}
