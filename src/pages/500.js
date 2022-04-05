import Head from 'next/head';
import DefaultLayout from 'components/layouts/defaultLayout';

export default function Custom500() {
  const metaTitle = `useaffiliates.com - 500 beep boop crash`;
  const metaDescription =
    'Oops something went wrong, but you can find your next affiliate program.';

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
      </Head>
      <DefaultLayout
        title="Beep, boop, beep, something went wrong. 🤖"
        button={{ title: 'Go back home', link: '/' }}
      ></DefaultLayout>
    </>
  );
}
