import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  endSession,
  endVideoSession,
  getBrowser,
  pauseVideoSession,
  registerButtonClickEvent,
  registerLinkClickEvent,
  startSession,
  startVideoSession,
} from '../functions';

type DataCollectorProps = {};

export const DataCollectorContextValue = (
  websiteKey: string
): DataCollectorProps => {
  const [permision, setPermission] = useState<boolean>(true);
  const router = useRouter();
  const [videoSessionID, setVideoSessionID] = useState<string | null>(null);

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

    if (permision) {
      startSession(body).then((session) => {
        localStorage.setItem('sessionid', session);
        console.log('Session started', session);
      });
    }

    window.addEventListener('beforeunload', () => {
      console.log('Session ended', localStorage.getItem('sessionid') ?? '');
      endSession(websiteKey);
      localStorage.removeItem('sessionid');
    });
  }, []);

  useEffect(() => {
    const buttons = document.getElementsByTagName('button');
    const links = document.getElementsByTagName('a');
    const videos = document.getElementsByTagName('video');

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', () => {
        console.log('button clicked');
        registerButtonClickEvent(websiteKey, buttons[i]);
      });
    }

    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', () => {
        console.log('link clicked');
        registerLinkClickEvent(websiteKey, links[i]);
      });
    }

    for (let i = 0; i < videos.length; i++) {
      videos[i].addEventListener('play', () => {
        console.log('video played');
        startVideoSession(websiteKey, videos[i]).then((videosession) =>
          localStorage.setItem('videosession', videosession)
        );
      });

      videos[i].addEventListener('pause', () => {
        console.log('video paused', videoSessionID);
        if (videos[i].currentTime < videos[i].duration)
          pauseVideoSession(websiteKey, videos[i]);
      });

      videos[i].addEventListener('ended', () => {
        console.log('video ended', videoSessionID);
        endVideoSession(websiteKey, videos[i]);

        setVideoSessionID(null);
      });
    }
  }, [router.pathname]);

  return {};
};
