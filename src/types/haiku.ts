// フロントエンド表示用の型定義
export type User = {
  id: number;
  name: string;
  icon_url: string;
};

export type Comment = {
  id: string;
  user: User;
  firstLine: string; // 7音
  secondLine: string; // 7音
  createdAt: Date;
};

export type DisplayHaiku = {
  id: string;
  user: User;
  firstLine: string;    // 5音
  secondLine: string;   // 7音
  thirdLine: string;    // 5音
  likes: number;
  comments: Comment[];
  createdAt: Date;
};

// API連携用の型定義
export interface APIHaikuUser {
  id: number;
  name: string;
  icon_url: string;
}

export interface APIHaiku {
  id: number;
  first_phrase: string;
  second_phrase: string;
  third_phrase: string;
  full_text: string;
  note: string;
  season: string;
  kigo: string;
  posted_at: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  user: APIHaikuUser;
}

export interface PaginateResponse<T> {
  paginate: {
    total: number;
    skip: number;
    limit: number;
  };
  items: T[];
}

// APIの俳句データをフロントエンド表示用に変換する関数
export const convertAPIHaikuToDisplay = (apiHaiku: APIHaiku): DisplayHaiku => {
  return {
    id: apiHaiku.id.toString(),
    user: {
      id: apiHaiku.user.id,
      name: apiHaiku.user.name,
      icon_url: apiHaiku.user.icon_url,
    },
    firstLine: apiHaiku.first_phrase,
    secondLine: apiHaiku.second_phrase,
    thirdLine: apiHaiku.third_phrase,
    likes: apiHaiku.likes_count,
    comments: [],
    createdAt: new Date(apiHaiku.created_at),
  };
};

export type CreateHaikuRequest = {
  first_phrase: string;
  second_phrase: string;
  third_phrase: string;
};

export type Haiku = {
  id: number;
  first_phrase: string;
  second_phrase: string;
  third_phrase: string;
  full_text: string;
  note: string | null;
  season: string | null;
  kigo: string | null;
  posted_at: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  user: User;
};

export type APIComment = {
  id: number;
  post_id: number;
  first_phrase: string;
  second_phrase: string;
  full_text: string;
  posted_at: string;
  created_at: string;
  updated_at: string;
};

export type DisplayComment = {
  id: string;
  postId: string;
  firstLine: string;
  secondLine: string;
  createdAt: Date;
};

// APIのコメントデータをフロントエンド表示用に変換する関数
export const convertAPICommentToDisplay = (apiComment: APIComment): DisplayComment => {
  return {
    id: apiComment.id.toString(),
    postId: apiComment.post_id.toString(),
    firstLine: apiComment.first_phrase,
    secondLine: apiComment.second_phrase,
    createdAt: new Date(apiComment.created_at),
  };
}; 