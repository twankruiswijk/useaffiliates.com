import Head from 'next/head';
import { getAllPrograms, getProgram } from 'lib/notion';

import DefaultLayout from '@/components/layouts/defaultLayout';

export default function ProgramPage({ program }) {
  const {
    id,
    name,
    description,
    categories,
    logo,
    link,
    cookiePeriod,
    paymentType,
  } = program;

  const metaTitle = `useaffiliates.com - ${name} affiliate program`;
  const metaDescription = description;

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
          content={`https://useaffiliates.com/program/${encodeURIComponent(
            id,
          )}`}
        />
      </Head>

      <DefaultLayout title="Affiliate programs" showNewsletter>
        <div className="container">
          <section className="bg-white relative shadow-button rounded overflow-hidden -mt-8 mb:-mt-24 lg:-mx-6 p-12">
            <h1>{name}</h1>
            <p>{description}</p>
          </section>
        </div>
      </DefaultLayout>
    </>
  );
}

export async function getStaticPaths() {
  const programs = await getAllPrograms();

  const paths = programs.data.map((p) => ({
    params: { id: p.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const program = await getProgram(params.id);

  return {
    props: {
      program: program,
    },
  };
}
