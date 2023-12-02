import fetchData from './utils/fetchData';

const endSession = async (websiteKey: string, sessionID: string) => {
  const res = await fetchData('Session/Create', 'PUT', {
    websiteKey: websiteKey,
    sessionID: sessionID,
  });

  if (res.status !== 200) {
    console.error('Error starting session');
  }
};

export default endSession;
