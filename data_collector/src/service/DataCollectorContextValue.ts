import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
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
      isPWA:
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes('android-app://'),
    };

    console.log(document.referrer);

    startSession(body);
  }, [websiteKey]);

  useEffect(() => {
    registerNavigationEvent(websiteKey, window.location.href);
  }, [router.pathname]);

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target instanceof HTMLButtonElement) {
        registerButtonClickEvent(websiteKey, e.target);
      } else if (e.target instanceof HTMLAnchorElement) {
        registerLinkClickEvent(websiteKey, e.target);
      }
    });

    return () => {
      window.removeEventListener('click', () => {});
    };
  }, []);

  useEffect(() => {
    const videos = document.querySelectorAll('video');

    videos.forEach((video) => {
      video.addEventListener('play', () => {
        startVideoSession(websiteKey, video);
      });

      video.addEventListener('pause', () => {
        pauseVideoSession(websiteKey, video);
      });

      video.addEventListener('ended', () => {
        endVideoSession(websiteKey, video.currentTime);
      });
    });

    return () => {
      videos.forEach((video) => {
        video.removeEventListener('play', () => {});
        video.removeEventListener('pause', () => {});
        video.removeEventListener('ended', () => {});
      });
    };
  }, [router.pathname]);

  return {};
};
