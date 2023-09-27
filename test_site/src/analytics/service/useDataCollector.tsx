import { FC, PropsWithChildren, createContext, useContext } from "react";
import { DataCollectorContextValue } from "./DataCollectorContextValue";

const DataCollectorContext =
  createContext<ReturnType<typeof DataCollectorContextValue>>(null);

export const DataCollectorContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const value = DataCollectorContextValue();

  return (
    <DataCollectorContext.Provider value={value}>
      {children}
    </DataCollectorContext.Provider>
  );
};

export const useDataCollector = () => useContext(DataCollectorContext);
