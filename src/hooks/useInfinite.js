import useSWRInfinite from 'swr/infinite';
import { useRouter } from 'next/router';
import fetcher from '@/lib/fetcher';

export default function useInfinite(initialData, url) {
  const router = useRouter();
  const query = router.query;

  const resolveParams = new URLSearchParams({
    ...(query.category && { category: encodeURIComponent(query.category) }),
    ...(query.paymentType && { paymentType: query.paymentType }),
    ...(query.cookiePeriod && { cookiePeriod: query.cookiePeriod }),
  });

  const paramsString = resolveParams.toString();

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.hasMore) {
      return null;
    }

    if (pageIndex === 0) {
      return `${url}?${paramsString}`;
    }

    if (category) {
      return `${url}?cursor=${previousPageData.nextCursor}&${paramsString}`;
    }

    return `${url}?cursor=${previousPageData.nextCursor}&${paramsString}`;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    fallbackData: initialData ? new Array(initialData) : undefined,
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
