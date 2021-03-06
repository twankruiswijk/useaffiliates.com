import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
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
  const { category, updateFilters } = useFilter();
  const { results, isLoadingMore, isValidating, size, setSize, reachedEnd } =
    useInfinite(initialData, '/api/programs');

  const { query } = useRouter();

  useEffect(() => {
    updateFilters({
      category: currentCategory,
      paymentType: query.paymentType,
      cookiePeriod: query.cookiePeriod,
    });
  }, [currentCategory]);

  const metaTitle = `useaffiliates.com - ${category} affiliate programs`;
  const metaDescription = `Find ${category} affiliate programs to monetize your content and make money.`;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />

        <meta key="title" property="og:title" content={metaTitle} />
        <meta
          key="description"
          property="og:description"
          content={metaDescription}
        />
        <meta
          key="url"
          property="og:url"
          content={`https://useaffiliates.com/programs/${encodeURIComponent(
            category,
          )}`}
        />
      </Head>
      <DefaultLayout
        category={currentCategory}
        title="Affiliate programs"
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
    </>
  );
}

export async function getServerSideProps({ res, params, query }) {
  const programs = await getPrograms({
    category: params.category,
    paymentType: query?.paymentType,
    cookiePeriod: query?.cookiePeriod,
  });

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
    'public, max-age=1800, s-maxage=1800, stale-while-revalidate=31540000000',
  );

  return {
    props: {
      currentCategory: params.category,
      initialData: programs,
      categories: categories.data,
      paymentTypes: paymentTypes.data,
    },
  };
}
