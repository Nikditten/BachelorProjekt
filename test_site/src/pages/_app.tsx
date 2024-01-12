import { DataCollector } from '@/analytics/index';
import Navigation from '@/components/navigation/navigation';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataCollector websiteKey='3778c7b5-a10c-411c-9cfe-682b4e2e9e81'>
      <Navigation>
        <Component {...pageProps} />
      </Navigation>
    </DataCollector>
  );
}
