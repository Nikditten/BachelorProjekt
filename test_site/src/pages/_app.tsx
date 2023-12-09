import { DataCollectorContextProvider } from '@/analytics/index';
import Navigation from '@/components/navigation/navigation';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataCollectorContextProvider websiteKey='8f13abb7-10d9-4ffa-a259-0ce48329e222'>
      <Navigation>
        <Component {...pageProps} />
      </Navigation>
    </DataCollectorContextProvider>
  );
}
