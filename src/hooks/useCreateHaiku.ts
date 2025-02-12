import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHaiku } from '../api/client';
import { CreateHaikuRequest, Haiku } from '../types/haiku';

export const useCreateHaiku = () => {
  const queryClient = useQueryClient();

  return useMutation<Haiku, Error, CreateHaikuRequest>({
    mutationFn: (data: CreateHaikuRequest) => createHaiku(data),
    onSuccess: () => {
      // 俳句一覧のキャッシュを更新
      queryClient.invalidateQueries({ queryKey: ['haikus'] });
    },
  });
}; 