import fetchData from '../utils/fetchData';

const endVideoSession = async (key: string, duration: number) => {
  const sessionId = localStorage.getItem('session');
  const videoSessionID = localStorage.getItem('videosession');

  if (!sessionId || !videoSessionID) return null;

  const play = {
    websiteKey: key,
    sessionID: sessionId,
    videoSessionID: videoSessionID,
    duration: duration,
  };

  await fetchData('Event/EndVideoSession', 'POST', play);

  localStorage.removeItem('videosession');
};

export default endVideoSession;
