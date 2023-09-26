import Navigation from "@/components/navigation/navigation";
import "@/styles/globals.css";
import { DataCollectorContextProvider } from "@/../../../data_collector/src/index";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Navigation>
      <Component {...pageProps} />
    </Navigation>
  );
}
