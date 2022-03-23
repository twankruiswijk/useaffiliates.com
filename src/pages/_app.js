import Head from 'next/head';
import { SWRConfig } from 'swr';
import fetcher from '@/lib/fetcher';

import { FilterProvider } from 'context/filterContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
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
