import { useEffect } from 'react';
import reportData from '../functions/reportData';

type DataCollectorProps = {};

export const DataCollectorContextValue = (): DataCollectorProps => {
  useEffect(() => {
    reportData(
      {
        isPwa: window.matchMedia('(display-mode: standalone)').matches,
        devicewidth: window.screen.width,
        userAgent: navigator.userAgent,
        language: navigator.language,
        orientation: window.screen.orientation.type,
        screenRatio: (window.screen.width / window.screen.height).toFixed(2),
      },
      'SESSION'
    );
  });

  return {};
};
