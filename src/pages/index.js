import { useEffect } from 'react';
import { getPrograms, getCategories, getPaymentTypes } from '@/lib/notion';
import useInfinite from 'hooks/useInfinite';
import { useFilter } from '@/context/filterContext';

import DefaultLayout from '@/components/layouts/defaultLayout';
import Listing from '@/components/listing';
import LoadMoreButton from 'components/listing/loadMoreButton';

export default function Home({
  initialData,
  categories,
  paymentTypes,
  currentPaymentType,
  currentCookiePeriod,
}) {
  const { updateCategory, updatePaymentType, updateCookiePeriod } = useFilter();
  const { results, isLoadingMore, size, setSize, reachedEnd, isValidating } =
    useInfinite(initialData, '/api/programs');

  useEffect(() => {
    updateCategory('', true);
    updatePaymentType(currentPaymentType, true);
    updateCookiePeriod(currentCookiePeriod, true);
  }, []);

  return (
    <DefaultLayout title="Monetize your content with affiliate marketing.">
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

export async function getServerSideProps({ query }) {
  const programs = await getPrograms(
    undefined,
    undefined,
    query?.paymentType,
    query?.cookiePeriod,
  );
  const categories = await getCategories();
  const paymentTypes = await getPaymentTypes();

  return {
    props: {
      initialData: programs,
      categories: categories.data,
      paymentTypes: paymentTypes.data,
      currentPaymentType: query?.paymentType || '',
      currentCookiePeriod: query?.cookiePeriod || '',
    },
  };
}
