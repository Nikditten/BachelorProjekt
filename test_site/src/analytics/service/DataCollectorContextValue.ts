import { useCallback, useEffect, useState } from 'react';
import endSession from '../functions/endSession';
import registerButtonClickEvent from '../functions/registerButtonClickEvent';
import registerLinkClickEvent from '../functions/registerLinkClickEvent';
import getBrowser from '../functions/utils/getBrowser';
import endVideoSession from '../functions/video/endVideoSession';
import pauseVideoSession from '../functions/video/pauseVideoSession';
import startVideoSession from '../functions/video/startVideoSession';
import fetchData from '../functions/utils/fetchData';

type DataCollectorProps = {};

export const DataCollectorContextValue = (
  websiteKey: string
): DataCollectorProps => {
  const [sessionid, setSessionid] = useState<string | null>(null);
  const [videoSessionID, setVideoSessionID] = useState<string | null>(null);

  const startSession = useCallback(async (body: any) => {
    const res = await fetchData('Session/Create', 'POST', body);

    if (res.status !== 200) {
      console.error('Error starting session');
      return null;
    } else {
      return await res.json();
    }
  }, []);

  useEffect(() => {
    const body = {
      websiteKey: websiteKey,
      landingPage: window.location.href,
      deviceWidth: window.screen.width,
      browser: getBrowser(),
      language: navigator.language.split('-')[0],
      orientation: window.screen.orientation.type.includes('portrait') ? 0 : 1,
      isPWA: window.matchMedia('(display-mode: standalone)').matches,
    };

    console.log('Starting session');
    (async () => {
      const id = await startSession(body);
      console.log('Session started', id);
      setSessionid(id);
    })();
    console.log('Session registered', sessionid);

    return () => {
      endSession(websiteKey, sessionid!);
    };
  }, []);

  useEffect(() => {
    const buttons = document.getElementsByTagName('button');
    const links = document.getElementsByTagName('a');
    const videos = document.getElementsByTagName('video');

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', () => {
        console.log('button clicked');
        registerButtonClickEvent(
          websiteKey,
          sessionid ?? '',
          buttons[i],
          window.location.href
        );
      });
    }

    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', () => {
        console.log('link clicked');
        registerLinkClickEvent(
          websiteKey,
          sessionid ?? '',
          links[i],
          window.location.href
        );
      });
    }

    for (let i = 0; i < videos.length; i++) {
      videos[i].addEventListener('play', () => {
        console.log('video played');
        startVideoSession(websiteKey, sessionid ?? '', videos[i]).then(
          (videosession) => setVideoSessionID(videosession)
        );
      });

      videos[i].addEventListener('pause', () => {
        console.log('video paused');
        pauseVideoSession(
          websiteKey,
          sessionid ?? '',
          videos[i],
          videoSessionID ?? ''
        );
      });

      videos[i].addEventListener('ended', () => {
        console.log('video ended');
        endVideoSession(
          websiteKey,
          sessionid ?? '',
          videos[i],
          videoSessionID ?? ''
        );

        setVideoSessionID(null);
      });
    }
  });

  return {};
};
