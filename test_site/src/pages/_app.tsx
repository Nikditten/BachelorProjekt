import { DataCollectorContextProvider } from '@/analytics/index';
import Navigation from '@/components/navigation/navigation';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataCollectorContextProvider websiteKey='bc0b939b-3468-4c6c-bbbb-19127d598e9b'>
      <Navigation>
        <Component {...pageProps} />
      </Navigation>
    </DataCollectorContextProvider>
  );
}
