type DataCollectorProps = {
  action: (id: string) => void;
};

export const DataCollectorContextValue = (): DataCollectorProps => {
  const action = (id: string) => {
    console.log(id);
  };

  return { action };
};
