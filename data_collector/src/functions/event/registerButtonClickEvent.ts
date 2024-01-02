import ElementType from '@/analytics/types/ElementType';
import { getCookie } from '../utils/cookie';
import fetchData from '../utils/fetchData';

const registerButtonClickEvent = async (
  key: string,
  button: HTMLButtonElement
) => {
  const sessionId = getCookie('sessionID');

  console.log('button', button);

  if (!sessionId) return null;

  const body = {
    websiteKey: key,
    sessionID: sessionId,
    elementID: button.id,
    elementType: ElementType.Button,
    elementText: button.innerText,
    url: window.location.href,
  };

  await fetchData('Event/CreateClickEvent', 'POST', body);
};

export default registerButtonClickEvent;
