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
          <section className="relative min-h-[40rem] h-[40rem]  md:min-h-[50rem] md:h-[50rem] -mt-8 mb:-mt-24 lg:-mx-6">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScN6ORAQi4RfANGFhzNlPQPpwGtRrXamlRlq-1GK02LeZ8VWA/viewform?embedded=true"
              height="100%"
              width="100%"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Laden…
            </iframe>
          </section>
        </div>
      </DefaultLayout>
    </>
  );
}
