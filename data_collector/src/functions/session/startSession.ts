import fetchData from '../utils/fetchData';

const startSession = async (body: any): Promise<boolean> => {
  const res = await fetchData('Session/Create', 'POST', body);

  if (res.status !== 200) {
    console.error('Error starting session');
    return false;
  } else {
    const session = await res.json();
    localStorage.setItem('session', session);
    return true;
  }
};

export default startSession;