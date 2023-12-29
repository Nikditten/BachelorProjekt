import { useRouter } from 'next/router';
import { useEffect } from 'react';
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

    startSession(body);

    window.addEventListener('unload', () => endSession(websiteKey));
  }, []);

  useEffect(() => {
    registerNavigationEvent(websiteKey, window.location.href);
  }, [router.pathname]);

  useEffect(() => {
    window.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      console.log('target', target.innerText);
      if (e.target instanceof HTMLButtonElement) {
        registerButtonClickEvent(websiteKey, e.target);
      } else if (e.target instanceof HTMLAnchorElement) {
        registerLinkClickEvent(websiteKey, e.target);
      }
    });

    window.addEventListener('play', (e) => {
      if (e.target instanceof HTMLVideoElement) {
        startVideoSession(websiteKey, e.target);
      }
    });

    window.addEventListener('pause', (e) => {
      if (e.target instanceof HTMLVideoElement) {
        pauseVideoSession(websiteKey, e.target);
      }
    });

    window.addEventListener('ended', (e) => {
      if (e.target instanceof HTMLVideoElement) {
        endVideoSession(websiteKey, e.target.currentTime);
      }
    });

    return () => {
      window.removeEventListener('click', () => {});
      window.removeEventListener('play', () => {});
      window.removeEventListener('pause', () => {});
      window.removeEventListener('ended', () => {});
    };
  }, []);

  return {};
};
