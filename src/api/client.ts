import { environment } from '../config/environment';
import { CreateHaikuRequest, Haiku } from '../types/haiku';

export const apiClient = {
  baseURL: environment.apiHost,
  headers: {
    'Authorization': `Bearer ${environment.apiKey}`,
  },
  // ... その他の設定
};

export const createHaiku = async (data: CreateHaikuRequest): Promise<Haiku> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('俳句の投稿に失敗しました');
  }

  return response.json();
};

export const getHaiku = async (id: number): Promise<Haiku> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('俳句の取得に失敗しました');
  }

  return response.json();
}; 