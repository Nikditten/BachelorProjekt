import fetchData from '../utils/fetchData';

const pauseVideoSession = async (key: string, video: HTMLVideoElement) => {
  const sessionId = localStorage.getItem('session');
  const videoSessionID = localStorage.getItem('videosession');

  if (!sessionId || !videoSessionID) return null;
  if (video.currentTime === 0 || video.duration === video.currentTime)
    return null;

  const play = {
    websiteKey: key,
    sessionID: sessionId,
    videoSessionID: videoSessionID,
    duration: video.currentTime,
  };

  const res = await fetchData('Event/PauseVideoSession', 'POST', play);

  return res.status === 200;
};

export default pauseVideoSession;