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
  const [sessionStarted, setSessionStarted] = useState(false);
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

    (async () => {
      const started = await startSession(body);
      setSessionStarted(started);
    })();

    window.addEventListener('beforeunload', () => endSession(websiteKey));
  }, []);

  useEffect(() => {
    if (sessionStarted)
      registerNavigationEvent(websiteKey, window.location.href);
  }, [router.pathname]);

  useEffect(() => {
    window.addEventListener('click', (e) => {
      console.log(e.target);
      if (e.target instanceof HTMLButtonElement) {
        if (sessionStarted) registerButtonClickEvent(websiteKey, e.target);
      } else if (e.target instanceof HTMLAnchorElement) {
        if (sessionStarted) registerLinkClickEvent(websiteKey, e.target);
      }
    });

    window.addEventListener('play', (e) => {
      if (e.target instanceof HTMLVideoElement) {
        if (sessionStarted) startVideoSession(websiteKey, e.target);
      }
    });

    window.addEventListener('pause', (e) => {
      if (e.target instanceof HTMLVideoElement) {
        if (sessionStarted) pauseVideoSession(websiteKey, e.target);
      }
    });

    window.addEventListener('ended', (e) => {
      if (e.target instanceof HTMLVideoElement) {
        if (sessionStarted) endVideoSession(websiteKey, e.target.currentTime);
      }
    });

    return () => {
      window.removeEventListener('click', () => {});
      window.removeEventListener('play', () => {});
      window.removeEventListener('pause', () => {});
      window.removeEventListener('ended', () => {});
    };
  }, [router.pathname]);

  return {};
};
