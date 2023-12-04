import fetchData from '../utils/fetchData';

const startVideoSession = async (
  key: string,
  sessionId: string,
  video: HTMLVideoElement
) => {
  if (video.paused) return null;

  const play = {
    websiteKey: key,
    sessionID: sessionId,
    videoID: video.id,
    source: video.src,
    duration: video.duration,
  };

  const res = await fetchData('Event/CreateVideoSession', 'POST', play);

  if (res.status === 200) return await res.json();
  else return null;
};

export default startVideoSession;
