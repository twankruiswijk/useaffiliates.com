import { getPrograms } from '@/lib/notion';
import useInfinite from 'hooks/useInfinite';

import DefaultLayout from '@/components/layouts/defaultLayout';
import Listing from '@/components/listing';
import LoadMoreButton from 'components/listing/loadMoreButton';

export default function Home({ initialData }) {
  const { results, error, isLoadingMore, size, setSize, reachedEnd } =
    useInfinite(initialData, '/api/programs');

  return (
    <DefaultLayout title="Monetize your content with affiliate marketing.">
      <Listing items={results} />

      <div className="container">
        <div className="flex justify-end pt-4 -mx-6">
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

  return {
    props: {
      initialData: programs,
    },
    revalidate: 60,
  };
}
