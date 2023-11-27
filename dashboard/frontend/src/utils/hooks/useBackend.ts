import { useCallback } from "react";
import fetchCall from "../api";
import { IApiResponse } from "../types";

interface Backend {
  getWebsites: () => Promise<IApiResponse>;
  createWebsite: (name: string, url: string) => Promise<IApiResponse>;
  deleteWebsite: (id: string) => Promise<IApiResponse>;
  updateWebsite: (
    id: string,
    name: string,
    url: string,
  ) => Promise<IApiResponse>;
  shareWebsite: (id: string, userid: string) => Promise<IApiResponse>;
  deleteSharedWebsite: (
    websiteid: string,
    userid: string,
  ) => Promise<IApiResponse>;
}

export const useBackend = (): Backend => {
  const getWebsites = useCallback(async (): Promise<IApiResponse> => {
    const res = await fetchCall("Website/UserWebsites", "GET", null);

    try {
      return {
        status: res.status,
        content: await res.json(),
      };
    } catch {
      return {
        status: res.status,
        content: null,
      };
    }
  }, []);

  const deleteWebsite = useCallback(
    async (id: string): Promise<IApiResponse> => {
      const res = await fetchCall(
        `Website/Delete?websiteid=${id}`,
        "DELETE",
        null,
      );

      return {
        status: res.status,
        content: null,
      };
    },
    [],
  );

  const createWebsite = useCallback(
    async (name: string, url: string): Promise<IApiResponse> => {
      const res = await fetchCall(`Website/Create`, "POST", {
        name,
        url,
      });

      try {
        return {
          status: res.status,
          content: await res.text(),
        };
      } catch {
        return {
          status: res.status,
          content: null,
        };
      }
    },
    [],
  );

  const updateWebsite = useCallback(
    async (id: string, name: string, url: string): Promise<IApiResponse> => {
      const res = await fetchCall(`Website/Update`, "PUT", {
        id,
        name,
        url,
      });

      return {
        status: res.status,
        content: null,
      };
    },
    [],
  );

  const shareWebsite = useCallback(
    async (id: string, username: string): Promise<IApiResponse> => {
      const res = await fetchCall(`Shared/Create`, "POST", {
        id,
        username,
      });

      try {
        return {
          status: res.status,
          content: await res.json(),
        };
      } catch {
        return {
          status: res.status,
          content: null,
        };
      }
    },
    [],
  );

  const deleteSharedWebsite = useCallback(
    async (websiteid: string, userid: string): Promise<IApiResponse> => {
      const res = await fetchCall(`Shared/Delete`, "DELETE", {
        websiteid,
        userid,
      });

      return {
        status: res.status,
        content: null,
      };
    },
    [],
  );

  return {
    getWebsites,
    createWebsite,
    deleteWebsite,
    updateWebsite,
    shareWebsite,
    deleteSharedWebsite,
  };
};
