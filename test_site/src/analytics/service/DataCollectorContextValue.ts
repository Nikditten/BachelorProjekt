import { useEffect, useState } from 'react';
import endSession from '../functions/endSession';
import registerButtonClickEvent from '../functions/registerButtonClickEvent';
import registerLinkClickEvent from '../functions/registerLinkClickEvent';
import registerNavigationEvent from '../functions/registerNavigationEvent';
import registerVideoEvent from '../functions/registerVideoEvent';
import startSession from '../functions/startSession';
import getBrowser from '../functions/utils/getBrowser';

type DataCollectorProps = {};

export const DataCollectorContextValue = (
  websiteKey: string
): DataCollectorProps => {
  const [sessionid, setSessionid] = useState<string | null>(null);

  useEffect(() => {
    const body = {
      websiteKey: websiteKey,
      deviceWidth: window.screen.width,
      browser: getBrowser(),
      language: navigator.language.split('-')[0],
      orientation: window.screen.orientation.type.includes('portrait') ? 0 : 1,
      isPWA: window.matchMedia('(display-mode: standalone)').matches,
    };

    startSession(body).then((res) => {
      console.log('res', res);
      if (res) {
        setSessionid(res);
      }
    });

    console.log('starting session', sessionid);

    return () => {
      endSession(websiteKey, sessionid ?? '');
    };
  }, []);

  useEffect(() => {
    if (window && sessionid)
      registerNavigationEvent(
        websiteKey,
        sessionid ?? '',
        window.location.href
      ),
        [window.location.href];
  });

  useEffect(() => {
    console.log('registering events');
    const buttons = document.getElementsByTagName('button');
    const links = document.getElementsByTagName('a');
    const videos = document.getElementsByTagName('video');

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', () => {
        registerButtonClickEvent(websiteKey, sessionid ?? '', buttons[i]);
      });
    }

    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', () => {
        registerLinkClickEvent(websiteKey, sessionid ?? '', links[i]);
      });
    }

    for (let i = 0; i < videos.length; i++) {
      videos[i].addEventListener('play', () => {
        registerVideoEvent(websiteKey, sessionid ?? '', videos[i], 0);
      });

      videos[i].addEventListener('pause', () => {
        registerVideoEvent(websiteKey, sessionid ?? '', videos[i], 1);
      });

      videos[i].addEventListener('ended', () => {
        registerVideoEvent(websiteKey, sessionid ?? '', videos[i], 2);
      });
    }
  });

  return {};
};
