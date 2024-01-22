import fetchData from '../utils/fetchData';

const endVideoSession = async (
  key: string,
  duration: number,
  videoSession: string | null,
  apiUrl?: string
) => {
  console.log('endVideoSession', videoSession);

  if (!videoSession) return null;

  const play = {
    websiteKey: key,
    videoSessionID: videoSession,
    duration: duration,
  };

  await fetchData('Event/EndVideoSession', 'POST', play, apiUrl);
};

export default endVideoSession;
