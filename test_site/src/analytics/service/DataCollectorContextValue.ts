import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  endSession,
  endVideoSession,
  getBrowser,
  pauseVideoSession,
  registerButtonClickEvent,
  registerLinkClickEvent,
  registerNavigationEvent,
  startSession,
  startVideoSession,
} from '../functions';

type DataCollectorProps = {};

export const DataCollectorContextValue = (
  websiteKey: string
): DataCollectorProps => {
  const [permision, setPermission] = useState<boolean>(true);
  const router = useRouter();

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

    if (permision) startSession(body);

    window.addEventListener('beforeunload', () => endSession(websiteKey));
  }, []);

  useEffect(() => {
    registerNavigationEvent(websiteKey, window.location.href);
  }, [router.pathname]);

  useEffect(() => {
    const buttons = document.getElementsByTagName('button');
    const links = document.getElementsByTagName('a');
    const videos = document.getElementsByTagName('video');

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', () =>
        registerButtonClickEvent(websiteKey, buttons[i])
      );
    }

    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', () =>
        registerLinkClickEvent(websiteKey, links[i])
      );
    }

    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];

      video.addEventListener('play', () =>
        startVideoSession(websiteKey, video)
      );

      video.addEventListener('pause', () =>
        pauseVideoSession(websiteKey, video)
      );

      video.addEventListener('ended', () =>
        endVideoSession(websiteKey, video.currentTime)
      );
    }
  }, [router.pathname]);

  return {};
};
