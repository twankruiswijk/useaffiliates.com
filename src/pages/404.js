import Head from 'next/head';
import DefaultLayout from 'components/layouts/defaultLayout';

export default function Custom404() {
  const metaTitle = `useaffiliates.com - 404 beep boop page not found`;
  const metaDescription =
    "We can't find what you are looking for, but you can find your next affiliate program.";

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
