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
          <section className="bg-white relative min-h-[40rem] -mt-8 mb:-mt-24 lg:-mx-6 rounded shadow-md px-6 py-4 md:py-8">
            <div className="grid--default">
              <div className="col-span-12 md:col-span-8 md:col-start-3">
                <h2 className="text-3xl font-heading mb-4">
                  We are still working on this part of the project! 🔨
                </h2>

                <p className="text-zinc-600">
                  If you already want to submit your affiliate program, feel
                  free to{' '}
                  <a href="mailto:twan@tarch.nl" className="underline">
                    reach out
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>
        </div>
      </DefaultLayout>
    </>
  );
}
