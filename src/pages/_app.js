import Head from 'next/head';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import fetcher from '@/lib/fetcher';
import * as Fathom from 'fathom-client';

import { FilterProvider } from 'context/filterContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    Fathom.load('ROOPJONW', {
      includedDomains: ['useaffiliates.com'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return (
    <>
      <Head>
        <title>useaffiliates.com</title>
        <meta
          name="description"
          content="Monetize your content with affiliate marketing."
        />

        <meta key="title" property="og:title" content="useaffiliates.com" />
        <meta
          key="description"
          property="og:description"
          content="Monetize your content with affiliate marketing."
        />
        <meta key="url" property="og:url" content="https://useaffiliates.com" />
        <meta key="type" property="og:type" content="website" />
        <meta
          key="image"
          property="og:image"
          content="https://useaffiliates.com/img/og.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff6f26" />
        <meta name="msapplication-TileColor" content="#ff6f26" />
        <meta name="theme-color" content="#ff6f26" />
      </Head>

      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <FilterProvider>
          <Component {...pageProps} />
        </FilterProvider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
