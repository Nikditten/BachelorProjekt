import fetchData from './utils/fetchData';

const registerNavigationEvent = async (
  key: string,
  sessionId: string,
  url: string
) => {
  await fetchData('Event/CreateNavigationEvent', 'POST', {
    websiteKey: key,
    sessionID: sessionId,
    url,
  });
};

export default registerNavigationEvent;
