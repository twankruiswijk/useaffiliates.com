import Head from 'next/head';
import DefaultLayout from '@/components/layouts/defaultLayout';

export default function Submit() {
  const metaTitle = 'useaffiliates.com - submit affiliate program';
  const metaDescription =
    'Start gathering more sign-ups for your affiliate program today.';

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
          content="https://useaffiliates.com/submit"
        />
      </Head>
      <DefaultLayout title="Start gathering more sign-ups for your affiliate program today.">
        <div className="container">
          <section className="relative min-h-[40rem] h-[50rem]  md:min-h-[50rem] md:h-[50rem] shadow-button rounded overflow-hidden -mt-8 mb:-mt-24 lg:-mx-6">
            <iframe
              src="https://tally.so/r/m68715"
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Get your affiliate program in front of creators, big and small!"
            ></iframe>
          </section>
        </div>
      </DefaultLayout>
    </>
  );
}
