import fetchData from '../utils/fetchData';

const pauseVideoSession = async (
  key: string,
  video: HTMLVideoElement,
  videoSession: string | null
) => {
  console.log('pauseVideoSession', videoSession);

  if (!videoSession) return null;
  if (video.currentTime === 0 || video.duration === video.currentTime)
    return null;

  const play = {
    websiteKey: key,
    videoSessionID: videoSession,
    duration: video.currentTime,
  };

  const res = await fetchData('Event/PauseVideoSession', 'POST', play);

  return res.status === 200;
};

export default pauseVideoSession;
