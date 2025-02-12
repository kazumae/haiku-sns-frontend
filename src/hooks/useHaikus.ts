import { useState, useEffect } from 'react';
import { APIHaiku, DisplayHaiku, PaginateResponse, convertAPIHaikuToDisplay } from '../types/haiku';
import { apiClient } from '../api/client';

interface UseHaikusProps {
  skip?: number;
  limit?: number;
}

interface UseHaikusReturn {
  haikus: DisplayHaiku[];
  isLoading: boolean;
  error: Error | null;
  total: number;
}

export const useHaikus = ({ skip = 0, limit = 100 }: UseHaikusProps = {}): UseHaikusReturn => {
  const [haikus, setHaikus] = useState<DisplayHaiku[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchHaikus = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams({
          skip: skip.toString(),
          limit: limit.toString(),
        });

        const response = await fetch(
          `${apiClient.baseURL}/api/v1/posts/?${params}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              ...apiClient.headers,
            },
          }
        );

        if (!response.ok) {
          throw new Error('俳句の取得に失敗しました');
        }

        const data: PaginateResponse<APIHaiku> = await response.json();
        const displayHaikus = data.items.map(convertAPIHaikuToDisplay);
        setHaikus(displayHaikus);
        setTotal(data.paginate.total);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchHaikus();
  }, [skip, limit]);

  return { haikus, isLoading, error, total };
}; 