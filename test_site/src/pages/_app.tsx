import { DataCollectorContextProvider } from '@/analytics/index';
import Navigation from '@/components/navigation/navigation';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataCollectorContextProvider websiteKey='e83d743c-567f-4cda-824c-ecc04dbe6e73'>
      <Navigation>
        <Component {...pageProps} />
      </Navigation>
    </DataCollectorContextProvider>
  );
}
