'use client';

import { Haiku } from '@/types/haiku';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { formatRelativeTime } from '@/utils/date';
import { shareToX } from '@/utils/share';

interface Props {
  haiku: Haiku;
}

export const SocialHaikuCard = ({ haiku }: Props) => {
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
      {/* 既存のソーシャルカードの内容 */}
    </div>
  );
}; 