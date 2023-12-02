import fetchData from './utils/fetchData';

const registerVideoEvent = async (
  key: string,
  sessionId: string,
  video: HTMLVideoElement,
  type: 0 | 1 | 2
) => {
  const body = {
    websiteKey: key,
    sessionID: sessionId,
    videoID: video.id,
    type: type,
    source: video.src,
    duration: video.duration,
  };

  await fetchData('Event/CreateVideoEvent', 'POST', body);
};

export default registerVideoEvent;
