import fetchData from './utils/fetchData';

const registerButtonClickEvent = async (
  key: string,
  sessionId: string,
  button: HTMLButtonElement,
  currentUrl: string
) => {
  const body = {
    websiteKey: key,
    sessionID: sessionId,
    currentUrl: currentUrl,
    elementID: button.id,
    tagName: button.tagName.toLowerCase(),
    value: button.innerText,
    type: button.type,
  };

  await fetchData('Event/CreateClickEvent', 'POST', body);
};

export default registerButtonClickEvent;
