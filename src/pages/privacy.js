import Head from 'next/head';
import DefaultLayout from '@/components/layouts/defaultLayout';

export default function Privacy() {
  const metaTitle = 'useaffiliates.com - privacy statement';
  const metaDescription = 'Much privacy, such legal stuff, wow.';

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
          content="https://useaffiliates.com/privacy"
        />
      </Head>

      <DefaultLayout title="Connecting creators with affiliate programs.">
        <div className="container">
          <section className="bg-white relative -mt-8 mb:-mt-24 lg:-mx-6 rounded shadow-md px-6 py-4 md:py-8">
            <div className="grid--default">
              <div className="col-span-12 md:col-span-8 md:col-start-3">
                <h2 className="text-3xl font-heading mb-2">Privacy</h2>
              </div>
            </div>
          </section>
        </div>
      </DefaultLayout>
    </>
  );
}
