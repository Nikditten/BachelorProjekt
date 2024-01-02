import { deleteCookie, getCookie } from '../utils/cookie';
import fetchData from '../utils/fetchData';

const endVideoSession = async (key: string, duration: number) => {
  const sessionId = getCookie('sessionID');
  const videoSessionID = getCookie('videoSessionID');

  if (!sessionId || !videoSessionID) return null;

  const play = {
    websiteKey: key,
    sessionID: sessionId,
    videoSessionID: videoSessionID,
    duration: duration,
  };

  await fetchData('Event/EndVideoSession', 'POST', play);

  deleteCookie('videoSessionID');
};

export default endVideoSession;
