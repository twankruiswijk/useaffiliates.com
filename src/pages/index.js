import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getPrograms, getCategories, getPaymentTypes } from '@/lib/notion';
import useInfinite from 'hooks/useInfinite';
import { useFilter } from '@/context/filterContext';

import DefaultLayout from '@/components/layouts/defaultLayout';
import Listing from '@/components/listing';
import LoadMoreButton from 'components/listing/loadMoreButton';

export default function Home({ initialData, categories, paymentTypes }) {
  const { updateFilters } = useFilter();
  const { results, isLoadingMore, size, setSize, reachedEnd, isValidating } =
    useInfinite(initialData, '/api/programs');

  const { query } = useRouter();

  useEffect(() => {
    updateFilters({
      category: '',
      paymentType: query.paymentType,
      cookiePeriod: query.cookiePeriod,
    });
  }, []);

  return (
    <DefaultLayout
      title="Monetize your content with affiliate marketing."
      showNewsletter
    >
      <Listing
        items={results}
        categories={categories}
        paymentTypes={paymentTypes}
        isValidating={isValidating}
      />

      <div className="container">
        <div className="flex md:justify-end pt-4 lg:-mx-6">
          {!reachedEnd && (
            <LoadMoreButton
              isLoading={isLoadingMore}
              onLoadMore={() => setSize(size + 1)}
            />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export async function getServerSideProps({ query, res }) {
  const programs = await getPrograms({
    paymentType: query?.paymentType,
    cookiePeriod: query?.cookiePeriod,
  });

  const categories = await getCategories();
  const paymentTypes = await getPaymentTypes();

  res.setHeader(
    'Cache-Control',
    'public, max-age=1800, s-maxage=1800, stale-while-revalidate=31540000000',
  );

  return {
    props: {
      initialData: programs,
      categories: categories.data,
      paymentTypes: paymentTypes.data,
    },
  };
}
