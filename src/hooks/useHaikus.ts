import { useInfiniteQuery } from '@tanstack/react-query';
import { DisplayHaiku, PaginateResponse, APIHaiku, convertAPIHaikuToDisplay } from '@/types/haiku';

type HaikusResponse = {
  haikus: DisplayHaiku[];
  nextPage: number | null;
};

const fetchHaikus = async (page: number): Promise<HaikusResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts?page=${page}&limit=20`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('俳句の取得に失敗しました');
  }

  const data: PaginateResponse<APIHaiku> = await response.json();
  return {
    haikus: data.items.map(convertAPIHaikuToDisplay),
    nextPage: data.paginate.skip + data.paginate.limit < data.paginate.total ? 
      Math.floor(data.paginate.skip / data.paginate.limit) + 2 : null
  };
};

type UseHaikusOptions = {
  initialData?: DisplayHaiku[];
};

export const useHaikus = ({ initialData }: UseHaikusOptions = {}) => {
  const query = useInfiniteQuery<HaikusResponse>({
    queryKey: ['haikus'],
    queryFn: ({ pageParam = 1 }) => fetchHaikus(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialData: initialData ? {
      pages: [{ haikus: initialData, nextPage: 2 }],
      pageParams: [1]
    } : undefined
  });

  const haikus = query.data?.pages.flatMap(page => page.haikus) ?? [];

  return {
    ...query,
    data: haikus
  };
}; 