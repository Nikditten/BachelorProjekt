import fetchData from '../utils/fetchData';

const endSession = async (websiteKey: string) => {
  const sessionID = localStorage.getItem('session');

  if (!sessionID) return null;

  const res = await fetchData('Session/End', 'PUT', {
    websiteKey: websiteKey,
    sessionID: sessionID,
  });

  localStorage.removeItem('session');
};

export default endSession;
