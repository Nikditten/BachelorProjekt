import { useEffect } from "react";

type DataCollectorProps = {};

export const DataCollectorContextValue = (): DataCollectorProps => {
  useEffect(() => {
    const href = window.location.href;
    console.log(href);
    console.log(new Date().toISOString());

    return () => {
      console.log(window.location.href);
      console.log(new Date().toISOString());
    };
  });

  return {};
};
