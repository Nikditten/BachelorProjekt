import { useEffect } from 'react';
import reportData from '../functions/reportData';

type DataCollectorProps = {};

export const DataCollectorContextValue = (
  websiteKey: string
): DataCollectorProps => {
  useEffect(() => {
    reportData(
      {
        key: websiteKey,
        deviceWidth: window.screen.width,
        browser: navigator.userAgent,
        language: navigator.language,
        os: navigator.platform,
        orientation: window.screen.orientation.type.includes('portrait')
          ? 0
          : 1,
        isPWA: window.matchMedia('(display-mode: standalone)').matches,
      },
      'Session'
    );
  });

  return {};
};

/*
{
  "key": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "deviceWidth": 0,
  "browser": "string",
  "language": "string",
  "os": "string",
  "orientation": 0,
  "isPWA": true
}
*/
