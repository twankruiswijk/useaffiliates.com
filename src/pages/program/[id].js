import { useMemo } from 'react';
import Head from 'next/head';
import { getAllPrograms, getProgram } from 'lib/notion';

import DefaultLayout from '@/components/layouts/defaultLayout';
import BlurredUpImage from '@/components/blurredImage';
import CategoryTags from '@/components/listing/categoryTags';
import PaymentType from '@/components/listing/paymentType';
import CookiePeriod from '@/components/listing/cookiePeriod';
import Button from '@/shared/button';

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

  const metaTitle = `useaffiliates.com - ${name}'s affiliate program`;
  const metaDescription = `${name}'s affiliate program - ${description}`;

  const memoedImage = useMemo(() => {
    return (
      <BlurredUpImage
        imgSrc={logo}
        alt={name}
        props={{
          width: 70,
          height: 70,
          unoptimized: true,
          className: 'rounded',
        }}
      />
    );
  }, [logo, name]);

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

      <DefaultLayout
        title="Monetize your content with affiliate marketing."
        showNewsletter
      >
        <div className="container">
          <article className="bg-white relative shadow-button rounded overflow-hidden -mt-8 mb:-mt-24 lg:-mx-6 p-6 md:p-12">
            <header className="mb-3">
              <span className="w-fit relative flex rounded shadow-button mb-4 bg-gradient-to-br from-primary to-orange-300">
                {memoedImage}
              </span>

              <h1 className="text-xl md:text-2xl font-bold my-2">
                {name}&apos;s affiliate program
              </h1>

              <CategoryTags categories={categories} />
            </header>

            <p className="max-w-xl text-base md:text-lg mb-4">{description}</p>

            <div className="space-y-1.5 mb-6">
              <PaymentType showLabel type={paymentType} />
              <CookiePeriod showLabel period={cookiePeriod} />
            </div>

            <div className="flex flex-col md:flex-row space-y-2.5 md:space-y-0 md:space-x-2.5">
              <Button url={link} title="Go to program" blank />
              <Button url={link} title="Explore more programs" blank outline />
            </div>
          </article>
        </div>
      </DefaultLayout>
    </>
  );
}

export async function getStaticPaths() {
  const programs = await getAllPrograms();

  const paths = programs.map((p) => ({
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
