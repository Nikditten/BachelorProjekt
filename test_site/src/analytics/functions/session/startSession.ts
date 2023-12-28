import fetchData from '../utils/fetchData';

const startSession = async (body: any) => {
  const res = await fetchData('Session/Create', 'POST', body);

  if (res.status !== 200) {
    console.error('Error starting session');
    return null;
  } else {
    const session = await res.json();
    localStorage.setItem('session', session);
  }
};

export default startSession;