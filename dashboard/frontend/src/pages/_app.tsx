import { AuthContextProvider } from "@/services/auth/useAuth";
import { WebsiteContextProvider } from "@/services/website/useWebsite";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

// SOURCE: nextpage with layout: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts (06/10/2023)
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AuthContextProvider>
      <WebsiteContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </WebsiteContextProvider>
    </AuthContextProvider>
  );
}
