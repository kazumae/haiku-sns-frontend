'use client';

import HaikuCard from '@/components/HaikuCard';
import CommentForm from '@/components/CommentForm';
import { useState, use } from 'react';
import { DisplayHaiku, Comment } from '@/types/haiku';
import Link from 'next/link';
import Header from '@/components/Header';
import { formatRelativeTime } from '@/utils/date';
import { useHaiku } from '@/hooks/useHaiku';
import { useComments } from '@/hooks/useComments';

export default function HaikuPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: haiku, isLoading: haikuLoading, error: haikuError } = useHaiku(Number(resolvedParams.id));
  const { data: commentsData, isLoading: commentsLoading, error: commentsError } = useComments(Number(resolvedParams.id));

  if (haikuLoading || commentsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="animate-pulse">
            <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
            <div className="space-y-4">
              <div className="h-24 bg-gray-200 rounded-lg"></div>
              <div className="h-24 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (haikuError || !haiku || commentsError || !commentsData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            データの取得に失敗しました
          </div>
        </div>
      </div>
    );
  }

  const handleCommentSubmit = (newComment: Omit<Comment, 'id' | 'createdAt'>) => {
    // TODO: コメント投稿APIと連携
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <nav className="bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 w-fit"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            <span>タイムラインに戻る</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto py-8 px-4">
        <HaikuCard haiku={haiku} />
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            コメント ({commentsData.paginate.total})
          </h2>
          <CommentForm haikuId={resolvedParams.id} onCommentSubmit={handleCommentSubmit} />
          <div className="space-y-4 mt-6">
            {commentsData.comments.map((comment) => (
              <div key={comment.id} className="bg-white rounded-lg shadow p-4">
                <div className="space-y-1">
                  <p className="text-lg text-gray-900">{comment.firstLine}</p>
                  <p className="text-lg text-gray-900">{comment.secondLine}</p>
                  <div className="text-sm text-gray-500">
                    {formatRelativeTime(comment.createdAt)}
                  </div>
                </div>
              </div>
            ))}
            {commentsData.comments.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                まだコメントがありません
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 