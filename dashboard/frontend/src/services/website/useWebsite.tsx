import { FC, PropsWithChildren, createContext, useContext } from "react";
import { WebsiteContextValue } from "./WebsiteContextValues";

const WebsiteContext = createContext<ReturnType<typeof WebsiteContextValue>>(
  {} as any,
);

export const WebsiteContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = WebsiteContextValue();

  return (
    <WebsiteContext.Provider value={value}>{children}</WebsiteContext.Provider>
  );
};

export const useWebsite = () => useContext(WebsiteContext);
