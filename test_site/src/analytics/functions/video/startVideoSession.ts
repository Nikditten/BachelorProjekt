import fetchData from '../utils/fetchData';

const startVideoSession = async (key: string, video: HTMLVideoElement) => {
  if (video.currentTime > 0) return null;

  const sessionId = localStorage.getItem('session');

  if (!sessionId) return null;

  const play = {
    websiteKey: key,
    sessionID: sessionId,
    videoID: video.id,
    source: video.src,
    duration: video.duration,
  };

  const res = await fetchData('Event/CreateVideoSession', 'POST', play);

  if (res.status !== 200) {
    console.error('Error starting video session');
    return null;
  } else {
    const videosession = await res.json();
    localStorage.setItem('videosession', videosession);
  }
};

export default startVideoSession;
