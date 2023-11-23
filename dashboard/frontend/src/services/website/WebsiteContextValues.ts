import { useBackend } from "@/utils/hooks/useBackend";
import { IWebsite } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";

type WebsiteProps = {
  websites: IWebsite[];
  activeWebsite: IWebsite | null;
  setActiveWebsite: (website: IWebsite | null) => void;
  fetchWebsites: () => Promise<void>;
  createNewWebsite: (name: string, url: string) => Promise<void>;
  deleteWebsiteById: (id: string) => Promise<void>;
  updateWebsiteById: (id: string, name: string, url: string) => Promise<void>;
};

export const WebsiteContextValue = (): WebsiteProps => {
  const { getWebsites, deleteWebsite, createWebsite, updateWebsite } =
    useBackend();

  const { user } = useAuth();

  const [websites, SetWebsites] = useState<IWebsite[]>([]);

  const [activeWebsite, setActiveWebsite] = useState<IWebsite | null>(null);

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
      }
    },
    [deleteWebsite],
  );

  const createNewWebsite = useCallback(
    async (name: string, url: string) => {
      const website: IWebsite = {
        id: "",
        isAdmin: true,
        name,
        url,
      };

      const { status, content } = await createWebsite(name, url);

      website.id = content;

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

  useEffect(() => {
    fetchWebsites();
  }, [fetchWebsites]);

  return {
    websites,
    activeWebsite,
    setActiveWebsite,
    fetchWebsites,
    createNewWebsite,
    deleteWebsiteById,
    updateWebsiteById,
  };
};
