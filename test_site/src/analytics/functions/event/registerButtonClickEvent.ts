import ElementType from '@/analytics/types/ElementType';
import fetchData from '../utils/fetchData';

const registerButtonClickEvent = async (
  key: string,
  button: HTMLButtonElement,
  session: string | null,
  url?: string
) => {
  console.log('registerButtonClickEvent', session);
  if (!session) return null;

  const body = {
    websiteKey: key,
    sessionID: session,
    elementID: button.id,
    elementType: ElementType.Button,
    elementText: button.innerText,
    url: window.location.href,
  };

  await fetchData('Event/CreateClickEvent', 'POST', body, url);
};

export default registerButtonClickEvent;
