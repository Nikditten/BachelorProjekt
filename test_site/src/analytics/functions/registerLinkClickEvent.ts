import fetchData from './utils/fetchData';

const registerLinkClickEvent = async (
  key: string,
  sessionId: string,
  link: HTMLAnchorElement,
  currentUrl: string
) => {
  const body = {
    websiteKey: key,
    sessionID: sessionId,
    currentUrl: currentUrl,
    elementID: link.id,
    tagName: link.tagName.toLowerCase(),
    value: link.innerText,
    url: link.href,
  };

  await fetchData('Event/CreateClickEvent', 'POST', body);
};

export default registerLinkClickEvent;
