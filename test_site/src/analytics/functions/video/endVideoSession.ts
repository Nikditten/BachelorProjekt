import fetchData from '../utils/fetchData';

const endVideoSession = async (
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

  const res = await fetchData('Event/EndVideoSession', 'POST', play);

  return res.status === 200;
};

export default endVideoSession;
