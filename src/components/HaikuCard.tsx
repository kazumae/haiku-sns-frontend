'use client';

import { Haiku } from '@/types/haiku';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { formatRelativeTime } from '@/utils/date';
import { shareToX } from '@/utils/share';

type Props = {
  haiku: Haiku;
};

export default function HaikuCard({ haiku }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(haiku.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    // TODO: API連携
  };

  const handleShare = () => {
    const url = `${window.location.origin}/haiku/${haiku.id}`;
    shareToX(haiku, url);
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center mb-4">
        {haiku.user.avatarUrl && (
          <div className="w-10 h-10 relative">
            <Image
              src={haiku.user.avatarUrl}
              alt={haiku.user.name}
              fill
              className="rounded-full object-cover"
              sizes="40px"
            />
          </div>
        )}
        <div className="ml-2">
          <span className="font-medium text-gray-900">{haiku.user.name}</span>
          <div className="text-sm text-gray-500">
            {formatRelativeTime(new Date(haiku.createdAt))}
          </div>
        </div>
      </div>
      
      <Link href={`/haiku/${haiku.id}`}>
        <div className="space-y-1 mb-4">
          <p className="text-lg text-gray-900 font-medium">{haiku.firstLine}</p>
          <p className="text-lg text-gray-900 font-medium">{haiku.secondLine}</p>
          <p className="text-lg text-gray-900 font-medium">{haiku.thirdLine}</p>
        </div>
      </Link>

      <div className="flex items-center gap-4 text-gray-700">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-1 hover:text-pink-500 transition-colors ${
            isLiked ? 'text-pink-500' : ''
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
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
          <span>{likeCount}</span>
        </button>
        <Link href={`/haiku/${haiku.id}`} className="flex items-center gap-1 hover:text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{haiku.comments.length}</span>
        </Link>
        <button 
          onClick={handleShare}
          className="flex items-center gap-1 hover:text-emerald-500 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          <span>シェア</span>
        </button>
      </div>
    </div>
  );
}