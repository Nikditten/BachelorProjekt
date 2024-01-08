import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

  const [session, setSession] = useState<string | null>(null);
  const [videoSession, setVideoSession] = useState<string | null>(null);

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

    startSession(body).then((session) => {
      console.log('startSession', session);
      setSession(session);
    });
  }, [websiteKey]);

  useEffect(() => {
    registerNavigationEvent(websiteKey, window.location.href, session);
  }, [router.pathname]);

  useEffect(() => {
    window.onclick = (e: any) => {
      if (e.target instanceof HTMLButtonElement) {
        registerButtonClickEvent(websiteKey, e.target, session);
      } else if (e.target instanceof HTMLAnchorElement) {
        registerLinkClickEvent(websiteKey, e.target, session);
      }
    };

    return () => {
      window.onclick = null;
    };
  }, [websiteKey, session]);

  useEffect(() => {
    const videos = document.querySelectorAll('video');

    videos.forEach((video) => {
      video.onplay = () => {
        if (video.currentTime > 0) return;
        startVideoSession(websiteKey, video, session).then((videoSession) => {
          console.log('startVideoSession', videoSession);
          setVideoSession(videoSession);
        });
      };

      video.onpause = () => {
        if (video.currentTime === video.duration) return;
        pauseVideoSession(websiteKey, video, videoSession);
      };

      video.onended = () => {
        endVideoSession(websiteKey, video.currentTime, videoSession);
        setVideoSession(null);
      };
    });

    return () => {
      videos.forEach((video) => {
        video.onplay = null;
        video.onpause = null;
        video.onended = null;
      });
    };
  }, [websiteKey, router.pathname, videoSession, session]);

  return {};
};
