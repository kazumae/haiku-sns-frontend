import Header from '@/components/Header';
import Timeline from '@/components/Timeline';
import { Haiku } from '@/types/haiku';

// 初期データ
const initialHaikus: Haiku[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: '松尾芭蕉',
      avatarUrl: '/images/sample-icon.jpg',
    },
    firstLine: '古池や',
    secondLine: '蛙飛び込む',
    thirdLine: '水の音',
    likes: 1000,
    comments: [],
    createdAt: new Date(),
  },
  {
    id: '2',
    user: {
      id: '2',
      name: '与謝蕪村',
      avatarUrl: '/images/sample-icon.jpg',
    },
    firstLine: '菜の花や',
    secondLine: '月は東に',
    thirdLine: '日は西に',
    likes: 800,
    comments: [],
    createdAt: new Date(),
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Timeline initialHaikus={initialHaikus} />
    </div>
  );
}
