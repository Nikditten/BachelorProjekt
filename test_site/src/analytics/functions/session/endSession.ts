import fetchData from '../utils/fetchData';

const endSession = async (websiteKey: string) => {
  const sessionID = localStorage.getItem('sessionid');

  if (!sessionID) return null;

  const res = await fetchData('Session/End', 'PUT', {
    websiteKey: websiteKey,
    sessionID: sessionID,
  });

  if (res.status !== 200) {
    console.error('Error ending session');
  }

  console.log('Session ended');
};

export default endSession;
