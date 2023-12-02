import fetchData from './utils/fetchData';

const registerLinkClickEvent = async (
  key: string,
  sessionId: string,
  link: HTMLAnchorElement
) => {
  const body = {
    websiteKey: key,
    sessionID: sessionId,
    elementID: link.id,
    tagName: link.tagName,
    value: link.innerText,
    url: link.href,
  };

  await fetchData('Event/CreateClickEvent', 'POST', body);
};

export default registerLinkClickEvent;
