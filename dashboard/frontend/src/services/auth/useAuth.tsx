import { FC, PropsWithChildren, createContext, useContext } from "react";
import { AuthContextValue } from "./AuthContextValues";

const AuthContext = createContext<ReturnType<typeof AuthContextValue>>(
  {} as any,
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = AuthContextValue();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
