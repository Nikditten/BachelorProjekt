import fetchData from '../utils/fetchData';

const registerNavigationEvent = async (
  key: string,
  url: string,
  session: string | null,
  apiUrl?: string
) => {
  console.log('registerNavigationEvent', session);
  if (!session) return null;

  await fetchData(
    'Event/CreateNavigationEvent',
    'POST',
    {
      websiteKey: key,
      sessionID: session,
      url,
    },
    apiUrl
  );
};

export default registerNavigationEvent;
