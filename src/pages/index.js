import { useEffect } from 'react';
import { getPrograms, getCategories, getPaymentTypes } from '@/lib/notion';
import useInfinite from 'hooks/useInfinite';
import { useFilter } from '@/context/filterContext';

import DefaultLayout from '@/components/layouts/defaultLayout';
import Listing from '@/components/listing';
import LoadMoreButton from 'components/listing/loadMoreButton';

export default function Home({ initialData, categories, paymentTypes }) {
  const { updateCategory } = useFilter();
  const { results, error, isLoadingMore, size, setSize, reachedEnd } =
    useInfinite(initialData, '/api/programs');

  useEffect(() => {
    updateCategory('');
  }, [updateCategory]);

  return (
    <DefaultLayout title="Monetize your content with affiliate marketing.">
      <Listing
        items={results}
        categories={categories}
        paymentTypes={paymentTypes}
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

export async function getStaticProps() {
  const programs = await getPrograms();
  const categories = await getCategories();
  const paymentTypes = await getPaymentTypes();

  return {
    props: {
      initialData: programs,
      categories: categories.data,
      paymentTypes: paymentTypes.data,
    },
    revalidate: 60,
  };
}
