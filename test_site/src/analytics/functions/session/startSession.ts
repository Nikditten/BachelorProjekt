import fetchData from '../utils/fetchData';

const startSession = async (
  body: any,
  url?: string
): Promise<string | null> => {
  const res = await fetchData('Session/Create', 'POST', body, url);

  if (res.status !== 200) {
    return null;
  } else {
    const session = await res.json();
    return session;
  }
};

export default startSession;
