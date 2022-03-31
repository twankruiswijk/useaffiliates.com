import { useEffect } from 'react';
import { getPrograms, getCategories, getPaymentTypes } from '@/lib/notion';
import useInfinite from 'hooks/useInfinite';

import { useFilter } from '@/context/filterContext';
import DefaultLayout from '@/components/layouts/defaultLayout';
import Listing from '@/components/listing';
import LoadMoreButton from 'components/listing/loadMoreButton';

export default function Category({
  currentCategory,
  currentPaymentType,
  currentCookiePeriod,
  initialData,
  categories,
  paymentTypes,
}) {
  const {
    category,
    updateCategory,
    cookiePeriod,
    updateCookiePeriod,
    paymentType,
    updatePaymentType,
  } = useFilter();
  const { results, isLoadingMore, isValidating, size, setSize, reachedEnd } =
    useInfinite(initialData, '/api/programs');

  useEffect(() => {
    if (category !== currentCategory) {
      updateCategory(currentCategory, true);
    }

    if (paymentType !== currentPaymentType) {
      updatePaymentType(currentPaymentType, true);
    }

    if (cookiePeriod !== currentCookiePeriod) {
      updateCookiePeriod(currentCookiePeriod, true);
    }
  }, []);

  return (
    <DefaultLayout category={currentCategory} title="Affiliate programs">
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

export async function getServerSideProps({ res, params, query }) {
  const programs = await getPrograms(
    undefined,
    params.category,
    query?.paymentType,
    query?.cookiePeriod,
  );
  const categories = await getCategories();
  const paymentTypes = await getPaymentTypes();

  const categoryInDB = categories.data.some((c) => c.name === params.category);

  if (!categoryInDB) {
    return {
      notFound: true,
    };
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=59',
  );

  return {
    props: {
      currentCategory: params.category,
      currentPaymentType: query?.paymentType || '',
      currentCookiePeriod: query?.cookiePeriod || '',
      initialData: programs,
      categories: categories.data,
      paymentTypes: paymentTypes.data,
    },
  };
}
