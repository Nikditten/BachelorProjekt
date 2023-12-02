import fetchData from './utils/fetchData';

const registerButtonClickEvent = async (
  key: string,
  sessionId: string,
  button: HTMLButtonElement
) => {
  const body = {
    websiteKey: key,
    sessionID: sessionId,
    elementID: button.id,
    tagName: button.tagName,
    value: button.innerText,
    type: button.type,
  };

  await fetchData('Event/CreateClickEvent', "POST", body);
};

export default registerButtonClickEvent;
