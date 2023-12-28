import fetchData from '../utils/fetchData';

const registerButtonClickEvent = async (
  key: string,
  button: HTMLButtonElement
) => {
  const sessionId = localStorage.getItem('session');

  if (!sessionId) return null;

  const body = {
    websiteKey: key,
    sessionID: sessionId,
    elementID: button.id,
    elementType: 'button',
    elementText: button.innerText,
  };

  await fetchData('Event/CreateClickEvent', 'POST', body);
};

export default registerButtonClickEvent;
