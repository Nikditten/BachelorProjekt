import { FC, PropsWithChildren, createContext, useContext } from 'react';
import { DataCollectorContextValue } from './DataCollectorContextValue';

interface Props {
  websiteKey: string;
}

const DataCollectorContext = createContext<
  ReturnType<typeof DataCollectorContextValue>
>({} as any);

export const DataCollectorContextProvider: FC<PropsWithChildren<Props>> = ({
  children,
  websiteKey,
}) => {
  const value = DataCollectorContextValue(websiteKey);

  return (
    <DataCollectorContext.Provider value={value}>
      {children}
    </DataCollectorContext.Provider>
  );
};

export const useDataCollector = () => useContext(DataCollectorContext);
