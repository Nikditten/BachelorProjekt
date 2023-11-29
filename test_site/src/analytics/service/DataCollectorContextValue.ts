import { useEffect } from 'react';
import reportData from '../functions/reportData';

type DataCollectorProps = {};

export const DataCollectorContextValue = (
  websiteKey: string
): DataCollectorProps => {
  useEffect(() => {
    reportData(
      {
        websiteKey,
        isPWA: window.matchMedia('(display-mode: standalone)').matches,
        deviceWidth: window.screen.width,
        userAgent: navigator.userAgent,
        language: navigator.language,
        orientation: window.screen.orientation.type,
      },
      'SESSION'
    );
  });

  return {};
};
