import { useBackend } from "@/utils/hooks/useBackend";
import { IAnalyticsData, IWebsite } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";

type WebsiteProps = {
  websites: IWebsite[];
  activeWebsite: IWebsite | null;
  analyticsData: IAnalyticsData | null;
  setActiveWebsite: (website: IWebsite | null) => void;
  fetchWebsites: () => Promise<void>;
  createNewWebsite: (name: string, url: string) => Promise<void>;
  deleteWebsiteById: (id: string) => Promise<void>;
  updateWebsiteById: (id: string, name: string, url: string) => Promise<void>;
  createSharedWebsite: (websiteid: string, userid: string) => Promise<void>;
  removeSharedWebsite: (websiteid: string, userid: string) => Promise<void>;
  fetchAnalyticsData: () => Promise<void>;
};

export const WebsiteContextValue = (): WebsiteProps => {
  const {
    getWebsites,
    deleteWebsite,
    createWebsite,
    updateWebsite,
    shareWebsite,
    deleteSharedWebsite,
    getAnalyticsData,
  } = useBackend();

  const { user } = useAuth();

  const [websites, SetWebsites] = useState<IWebsite[]>([]);

  const [activeWebsite, setActiveWebsite] = useState<IWebsite | null>(null);

  const [analyticsData, setAnalyticsData] = useState<IAnalyticsData | null>(
    null,
  );

  const fetchWebsites = useCallback(async () => {
    const { content } = await getWebsites();

    const fetchedWebsites: IWebsite[] = content ?? [];

    if (fetchedWebsites.length > 0) {
      setActiveWebsite(fetchedWebsites[0]);
    }

    SetWebsites(fetchedWebsites);
  }, [getWebsites]);

  const deleteWebsiteById = useCallback(
    async (id: string) => {
      const { status } = await deleteWebsite(id);

      if (status === 200) {
        SetWebsites((prev) => prev.filter((website) => website.id !== id));

        if (activeWebsite?.id === id) {
          if (websites.length > 1) setActiveWebsite(websites[0]);
          else setActiveWebsite(null);
        }
      }
    },
    [activeWebsite?.id, deleteWebsite, websites],
  );

  const createNewWebsite = useCallback(
    async (name: string, url: string) => {
      const { status, content } = await createWebsite(name, url);

      const website: IWebsite = {
        id: content.id,
        key: content.key,
        isAdmin: true,
        name,
        url,
      };

      if (status === 200) {
        SetWebsites((prev) => [...prev, website]);
      }
    },
    [createWebsite],
  );

  const updateWebsiteById = useCallback(
    async (id: string, name: string, url: string) => {
      const { status } = await updateWebsite(id, name, url);

      if (status === 200) {
        SetWebsites((prev) =>
          prev.map((website) => {
            if (website.id === id) {
              return {
                ...website,
                name,
                url,
              };
            }

            return website;
          }),
        );
      }
    },
    [updateWebsite],
  );

  const createSharedWebsite = useCallback(
    async (websiteid: string, username: string) => {
      const { status, content } = await shareWebsite(websiteid, username);

      if (status === 200) {
        SetWebsites((prev) =>
          prev.map((website) => {
            if (website.id === websiteid) {
              return {
                ...website,
                sharedWith: [...(website.sharedWith ?? []), content],
              };
            }

            return website;
          }),
        );
      }
    },
    [shareWebsite],
  );

  const removeSharedWebsite = useCallback(
    async (websiteid: string, userid: string) => {
      const { status } = await deleteSharedWebsite(websiteid, userid);

      if (status === 200) {
        if (user?.id == userid) {
          SetWebsites((prev) =>
            prev.filter((website) => website.id !== websiteid),
          );

          if (activeWebsite?.id === websiteid) {
            if (websites.length > 1) setActiveWebsite(websites[0]);
            else setActiveWebsite(null);
          }
        } else {
          SetWebsites((prev) =>
            prev.map((website) => {
              if (website.id === websiteid) {
                return {
                  ...website,
                  sharedWith: website?.sharedWith?.filter(
                    (user) => user.id !== userid,
                  ),
                };
              }

              return website;
            }),
          );
        }
      }
    },
    [activeWebsite?.id, deleteSharedWebsite, user?.id, websites],
  );

  const fetchAnalyticsData = useCallback(async () => {
    if (!activeWebsite) return;

    const { content } = await getAnalyticsData(activeWebsite.id);

    console.log(content);

    setAnalyticsData(content);
  }, [activeWebsite, getAnalyticsData]);

  useEffect(() => {
    fetchWebsites();
  }, []);

  useEffect(() => {
    fetchAnalyticsData();
  }, [activeWebsite]);

  return {
    websites,
    activeWebsite,
    setActiveWebsite,
    fetchWebsites,
    createNewWebsite,
    deleteWebsiteById,
    updateWebsiteById,
    createSharedWebsite,
    removeSharedWebsite,
    fetchAnalyticsData,
    analyticsData,
  };
};
