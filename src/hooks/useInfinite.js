import useSWRInfinite from 'swr/infinite';
import fetcher from '@/lib/fetcher';

export default function useInfinite(initialData, url, category) {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.hasMore) {
      return null;
    }

    if (pageIndex === 0) {
      return category ? `${url}?category=${category}` : '';
    }

    if (category) {
      return `${url}?cursor=${previousPageData.nextCursor}&category=${category}`;
    }

    return `${url}?cursor=${previousPageData.nextCursor}`;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    fallbackData: new Array(initialData),
    revalidateFirstPage: false,
  });

  const normalizeData = data ? data.map((d) => d.data) : [];
  const results = normalizeData ? [].concat(...normalizeData) : [];

  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === 'undefined';

  const isEmpty = data?.[0]?.length === 0;
  const reachedEnd =
    isEmpty || (data && data[data.length - 1]?.hasMore === false);

  return { results, error, isLoadingMore, size, setSize, reachedEnd };
}
