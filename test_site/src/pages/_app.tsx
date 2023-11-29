import { DataCollectorContextProvider } from '@/analytics/index';
import Navigation from '@/components/navigation/navigation';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataCollectorContextProvider websiteKey='test'>
      <Navigation>
        <Component {...pageProps} />
      </Navigation>
    </DataCollectorContextProvider>
  );
}
