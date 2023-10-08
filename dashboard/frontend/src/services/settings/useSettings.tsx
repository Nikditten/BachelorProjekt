import { FC, PropsWithChildren, createContext, useContext } from 'react';
import { SettingsContextValue } from './SettingsContextValue';

const SettingsContext =
  createContext<ReturnType<typeof SettingsContextValue>>(null);

export const SettingsContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const value = SettingsContextValue();

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
