import Head from 'next/head';
import DefaultLayout from '@/components/layouts/defaultLayout';
import { Widget } from '@typeform/embed-react';

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
          <section className="bg-white relative min-h-[50rem] h-[50rem] -mt-8 mb:-mt-24 lg:-mx-6 rounded shadow-md">
            <Widget
              id="RVmmlA9O"
              style={{ height: '100%', width: '100%' }}
              medium="embed-sdk"
              iframeProps={{ title: 'Submit your affiliate program ' }}
            />
          </section>
        </div>
      </DefaultLayout>
    </>
  );
}
