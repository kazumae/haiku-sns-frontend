import { environment } from '../config/environment';
import { CreateHaikuRequest, Haiku, APIComment, convertAPICommentToDisplay } from '../types/haiku';

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

export const getComments = async (postId: number, skip: number = 0, limit: number = 100) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts/${postId}/comments?skip=${skip}&limit=${limit}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('コメントの取得に失敗しました');
  }

  const data: PaginateResponse<APIComment> = await response.json();
  return {
    comments: data.items.map(convertAPICommentToDisplay),
    paginate: data.paginate
  };
}; 