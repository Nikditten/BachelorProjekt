import fetchData from '../utils/fetchData';

const pauseVideoSession = async (
  key: string,
  sessionId: string,
  video: HTMLVideoElement,
  videoSessionID: string
) => {
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
