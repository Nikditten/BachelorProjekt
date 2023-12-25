import fetchData from '../utils/fetchData';

const registerNavigationEvent = async (key: string, url: string) => {
  const sessionId = localStorage.getItem('sessionid');

  if (!sessionId) return null;

  await fetchData('Event/CreateNavigationEvent', 'POST', {
    websiteKey: key,
    sessionID: sessionId,
    url,
  });
};

export default registerNavigationEvent;
