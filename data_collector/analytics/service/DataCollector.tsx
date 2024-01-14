import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
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

interface Props {
  websiteKey: string;
  apiUrl?: string;
}

export const DataCollector: FC<PropsWithChildren<Props>> = ({
  children,
  websiteKey,
  apiUrl,
}) => {
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

    startSession(body, apiUrl).then((session) => {
      console.log('startSession', session);
      setSession(session);
    });
  }, [websiteKey]);

  useEffect(() => {
    registerNavigationEvent(websiteKey, window.location.href, session, apiUrl);
  }, [router.pathname]);

  useEffect(() => {
    window.onclick = (e: any) => {
      if (e.target instanceof HTMLButtonElement) {
        registerButtonClickEvent(websiteKey, e.target, session, apiUrl);
      } else if (e.target instanceof HTMLAnchorElement) {
        registerLinkClickEvent(websiteKey, e.target, session, apiUrl);
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
        if (video.currentTime > 0 && videoSession) return;
        startVideoSession(websiteKey, video, session, apiUrl).then(
          (videoSession) => {
            console.log('startVideoSession', videoSession);
            setVideoSession(videoSession);
          }
        );
      };

      video.onpause = () => {
        if (video.currentTime === video.duration) return;
        pauseVideoSession(websiteKey, video, videoSession, apiUrl);
      };

      video.onended = () => {
        endVideoSession(websiteKey, video.currentTime, videoSession, apiUrl);
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

  return <>{children}</>;
};
