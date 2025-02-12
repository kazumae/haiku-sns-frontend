'use client';

import { DisplayHaiku } from '@/types/haiku';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import HaikuCard from './HaikuCard';
import HaikuForm from './HaikuForm';
import { useHaikus } from '@/hooks/useHaikus';

// サンプルデータ生成関数
function generateMockHaiku(id: number): DisplayHaiku {
  const samples = [
    {
      first: '夏の月',
      second: '松の梢に',
      third: '宿りけり',
    },
    {
      first: '閑かさや',
      second: '岩にしみ入る',
      third: '蝉の声',
    },
    {
      first: '春の海',
      second: '終日のたり',
      third: 'のたりかな',
    },
    {
      first: '柿食えば',
      second: '鐘が鳴るなり',
      third: '法隆寺',
    },
  ];
  
  const sample = samples[id % samples.length];
  
  return {
    id: `mock-${id}`,
    user: {
      id: `user-${id}`,
      name: `俳句詠み${id}号`,
      avatarUrl: '/images/sample-icon.jpg',
    },
    firstLine: sample.first,
    secondLine: sample.second,
    thirdLine: sample.third,
    likes: Math.floor(Math.random() * 100),
    comments: [],
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
  };
}

type Props = {
  initialHaikus: DisplayHaiku[];
};

export default function Timeline({ initialHaikus }: Props) {
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data: haikus = initialHaikus,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useHaikus({
    initialData: initialHaikus,
  });

  // 無限スクロール
  if (inView && !isFetchingNextPage && hasNextPage) {
    fetchNextPage();
  }

  const handleHaikuSubmit = (lines: { first: string; second: string; third: string }) => {
    const newHaiku: DisplayHaiku = {
      id: `${Date.now()}`,
      user: {
        id: '999',
        name: '匿名',
        avatarUrl: '/images/sample-icon.jpg',
      },
      firstLine: lines.first,
      secondLine: lines.second,
      thirdLine: lines.third,
      likes: 0,
      comments: [],
      createdAt: new Date(),
    };

    // ここで新しい俳句を追加するロジックを実装する必要があります
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <HaikuForm onHaikuSubmit={handleHaikuSubmit} />
      <div className="space-y-4">
        {haikus.map((haiku) => (
          <HaikuCard key={haiku.id} haiku={haiku} />
        ))}
        
        <div ref={ref} className="py-4 text-center">
          {isFetchingNextPage ? (
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>読み込み中...</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
} 