export type User = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type Comment = {
  id: string;
  user: User;
  firstLine: string; // 7音
  secondLine: string; // 7音
  createdAt: Date;
};

export type Haiku = {
  id: string;
  user: User;
  firstLine: string;    // 5音
  secondLine: string;   // 7音
  thirdLine: string;    // 5音
  likes: number;
  comments: Comment[];
  createdAt: Date;
}; 