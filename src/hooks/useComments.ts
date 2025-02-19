import { useQuery } from '@tanstack/react-query';
import { getComments } from '../api/client';
import { DisplayComment } from '../types/haiku';

type UseCommentsOptions = {
  skip?: number;
  limit?: number;
  initialData?: {
    comments: DisplayComment[];
    paginate: {
      total: number;
      skip: number;
      limit: number;
    };
  };
};

export const useComments = (postId: number, options: UseCommentsOptions = {}) => {
  const { skip = 0, limit = 100, initialData } = options;

  return useQuery({
    queryKey: ['comments', postId, skip, limit],
    queryFn: () => getComments(postId, skip, limit),
    initialData,
  });
}; 