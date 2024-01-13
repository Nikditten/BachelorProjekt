import fetchData from '../utils/fetchData';

const startVideoSession = async (
  key: string,
  video: HTMLVideoElement,
  session: string | null,
): Promise<string | null> => {
  if (video.currentTime > 0) return null;

  if (!session) return null;

  const play = {
    websiteKey: key,
    sessionID: session,
    videoID: video.id,
    source: video.src,
    duration: video.duration,
    url: window.location.href,
  };

  const res = await fetchData('Event/CreateVideoSession', 'POST', play);

  if (res.status !== 200) {
    return null;
  } else {
    const videoSession = await res.json();
    return videoSession;
  }
};

export default startVideoSession;
