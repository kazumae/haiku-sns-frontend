'use client';
import { useState } from 'react';

interface HaikuCardProps {
  first: string;   // 上の句（5文字）
  middle: string;  // 中の句（7文字）
  last: string;    // 下の句（5文字）
  likes?: number;  // いいね数（オプション）
}

export const HaikuCard = ({ first, middle, last, likes = 0 }: HaikuCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="bg-white rounded-[10px] px-12 py-6 shadow-md h-[420px] flex flex-col justify-between">
      <div className="writing-vertical h-full flex justify-start items-center">
        <div className="flex flex-col text-[24px] tracking-[0.4em] font-['02UtsukushiMincho'] leading-loose text-[#000] mt-8">
          <p>{first}</p>
          <p className="mt-12">{middle}</p>
          <p className="mt-32">{last}</p>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 transition-colors ${
            isLiked ? 'text-pink-500' : 'text-gray-400'
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill={isLiked ? "currentColor" : "none"} 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
          <span className="text-base">{likeCount}</span>
        </button>
      </div>
    </div>
  );
};

// 縦書きのためのスタイル
const styles = `
  .writing-vertical {
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
`;