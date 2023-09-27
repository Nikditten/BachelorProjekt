import Navigation from "@/components/navigation/navigation";
import "@/styles/globals.css";
import { DataCollectorContextProvider } from "@/analytics/index";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataCollectorContextProvider>
      <Navigation>
        <Component {...pageProps} />
      </Navigation>
    </DataCollectorContextProvider>
  );
}
