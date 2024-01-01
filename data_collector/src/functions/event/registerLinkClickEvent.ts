import fetchData from '../utils/fetchData';

const registerLinkClickEvent = async (key: string, link: HTMLAnchorElement) => {
  const sessionId = localStorage.getItem('session');

  if (!sessionId) return null;

  const body = {
    websiteKey: key,
    sessionID: sessionId,
    elementID: link.id,
    elementType: 'link',
    elementText: link.innerText,
    url: link.href,
  };

  await fetchData('Event/CreateClickEvent', 'POST', body);
};

export default registerLinkClickEvent;
