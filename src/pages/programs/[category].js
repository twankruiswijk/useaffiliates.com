import { useEffect } from 'react';
import { getPrograms, getCategories, getPaymentTypes } from '@/lib/notion';
import useInfinite from 'hooks/useInfinite';

import { useFilter } from '@/context/filterContext';
import DefaultLayout from '@/components/layouts/defaultLayout';
import Listing from '@/components/listing';
import LoadMoreButton from 'components/listing/loadMoreButton';

export default function Category({
  currentCategory,
  initialData,
  categories,
  paymentTypes,
}) {
  const { category, updateCategory } = useFilter();
  const { results, error, isLoadingMore, size, setSize, reachedEnd } =
    useInfinite(initialData, `/api/programs`, currentCategory);

  useEffect(() => {
    if (category !== currentCategory) {
      updateCategory(currentCategory);
    }
  }, [updateCategory, currentCategory, category]);

  return (
    <DefaultLayout category={currentCategory} title="Affiliate programs">
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

export async function getStaticPaths() {
  const categories = await getCategories();

  const paths = categories.data.map((category) => ({
    params: { category: category.name },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const programs = await getPrograms(undefined, params.category);
  const categories = await getCategories();
  const paymentTypes = await getPaymentTypes();

  return {
    props: {
      currentCategory: params.category,
      initialData: programs,
      categories: categories.data,
      paymentTypes: paymentTypes.data,
    },
    revalidate: 60,
  };
}
