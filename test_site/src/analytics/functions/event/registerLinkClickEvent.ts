import ElementType from "../../types/ElementType";
import fetchData from "../utils/fetchData";

const registerLinkClickEvent = async (
  key: string,
  link: HTMLAnchorElement,
  session: string | null,
  url?: string,
) => {
  console.log("registerLinkClickEvent", session);
  if (!session) return null;

  const body = {
    websiteKey: key,
    sessionID: session,
    elementID: link.id,
    elementType: ElementType.Link,
    elementText: link.innerText,
    url: link.href,
  };

  await fetchData("Event/CreateClickEvent", "POST", body, url);
};

export default registerLinkClickEvent;
