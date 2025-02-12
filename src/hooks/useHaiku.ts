import { useQuery } from '@tanstack/react-query';
import { getHaiku } from '../api/client';
import { APIHaiku, DisplayHaiku, convertAPIHaikuToDisplay } from '../types/haiku';

type UseHaikuOptions = {
  initialData?: DisplayHaiku;
};

export const useHaiku = (id: number, { initialData }: UseHaikuOptions = {}) => {
  return useQuery({
    queryKey: ['haiku', id],
    queryFn: async () => {
      const apiHaiku = await getHaiku(id);
      return convertAPIHaikuToDisplay(apiHaiku as APIHaiku);
    },
    initialData,
  });
}; 