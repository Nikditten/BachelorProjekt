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
        language: navigator.language.split('-')[0],
        os: navigator.platform,
        orientation: window.screen.orientation.type.includes('portrait')
          ? 0
          : 1,
        isPWA: window.matchMedia('(display-mode: standalone)').matches,
      },
      'Session'
    );
  }, []);

  useEffect(() => {
    const buttons = document.getElementsByTagName('button');

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', () => {
        reportData(
          {
            key: websiteKey,
            session: 'string',
            buttonName: buttons[i].innerText,
            buttonId: buttons[i].id,
            buttonType: buttons[i].type,
          },
          'Analytic'
        );
      });
    }
  });

  useEffect(() => {
    const links = document.getElementsByTagName('a');

    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', () => {
        reportData(
          {
            key: websiteKey,
            linkName: links[i].innerText,
            linkId: links[i].id,
            linkValue: links[i].href,
          },
          'Analytic'
        );
      });
    }
  });

  useEffect(() => {
    const videos = document.getElementsByTagName('video');

    for (let i = 0; i < videos.length; i++) {
      videos[i].addEventListener('play', () => {
        reportData(
          {
            key: websiteKey,
            videoName: videos[i].innerText,
            videoId: videos[i].id,
            videoValue: videos[i].src,
            length: videos[i].duration,
          },
          'Analytic'
        );
      });

      videos[i].addEventListener('pause', () => {
        reportData(
          {
            key: websiteKey,
            videoName: videos[i].innerText,
            videoId: videos[i].id,
            videoValue: videos[i].src,
            progress: videos[i].currentTime,
          },
          'Analytic'
        );
      });

      videos[i].addEventListener('ended', () => {
        reportData(
          {
            key: websiteKey,
            videoName: videos[i].innerText,
            videoId: videos[i].id,
            videoValue: videos[i].src,
          },
          'Analytic'
        );
      });
    }
  });

  return {};
};
