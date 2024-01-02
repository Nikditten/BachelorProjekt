import ElementType from '@/analytics/types/ElementType';
import fetchData from '../utils/fetchData';
import { getCookie } from '../utils/cookie';

const registerLinkClickEvent = async (key: string, link: HTMLAnchorElement) => {
  const sessionId = getCookie('sessionID');

  if (!sessionId) return null;

  const body = {
    websiteKey: key,
    sessionID: sessionId,
    elementID: link.id,
    elementType: ElementType.Link,
    elementText: link.innerText,
    url: link.href,
  };

  await fetchData('Event/CreateClickEvent', 'POST', body);
};

export default registerLinkClickEvent;
