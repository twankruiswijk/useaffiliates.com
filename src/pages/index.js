import { getPrograms } from '@/lib/notion';

import DefaultLayout from '@/components/layouts/defaultLayout';
import Listing from '@/components/listing';

export default function Home({ programs }) {
  return (
    <DefaultLayout title="Monetize your content with affiliate marketing.">
      <Listing items={programs} />
    </DefaultLayout>
  );
}

export async function getServerSideProps(context) {
  const programs = await getPrograms();

  return {
    props: {
      programs: programs.data,
    },
  };
}
