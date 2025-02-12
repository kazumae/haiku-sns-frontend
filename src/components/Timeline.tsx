'use client';

import { Haiku } from '@/types/haiku';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import HaikuCard from './HaikuCard';
import HaikuForm from './HaikuForm';

// サンプルデータ生成関数
function generateMockHaiku(id: number): Haiku {
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
  initialHaikus: Haiku[];
};

export default function Timeline({ initialHaikus }: Props) {
  const [haikus, setHaikus] = useState<Haiku[]>(initialHaikus);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadMoreHaikus = async () => {
    setLoading(true);
    
    const newHaikus = Array.from({ length: 5 }, (_, i) => 
      generateMockHaiku(page * 5 + i)
    );
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setHaikus(prev => [...prev, ...newHaikus]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    if (inView && !loading) {
      loadMoreHaikus();
    }
  }, [inView]);

  const handleHaikuSubmit = (lines: { first: string; second: string; third: string }) => {
    const newHaiku: Haiku = {
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

    setHaikus(prev => [newHaiku, ...prev]);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <HaikuForm onHaikuSubmit={handleHaikuSubmit} />
      <div className="space-y-4">
        {haikus.map((haiku) => (
          <HaikuCard key={haiku.id} haiku={haiku} />
        ))}
        
        <div ref={ref} className="py-4 text-center">
          {loading ? (
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