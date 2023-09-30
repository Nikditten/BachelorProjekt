import { useEffect } from "react";

type DataCollectorProps = {};

export const DataCollectorContextValue = (): DataCollectorProps => {
  useEffect(() => {
    console.log(window.location.href);
    console.log(new Date().toISOString());

    return () => {
      console.log(window.location.href);
      console.log(new Date().toISOString());
    };
  }, []);

  return {};
};
