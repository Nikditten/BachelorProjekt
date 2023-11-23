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
}

export const useBackend = (): Backend => {
  const getWebsites = useCallback(async (): Promise<IApiResponse> => {
    const res = await fetchCall("Website/UserWebsites", "GET", null);

    return {
      status: res.status,
      content: await res.json(),
    };
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
        content: await res.json(),
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

      return {
        status: res.status,
        content: await res.text(),
      };
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
        content: await res.text(),
      };
    },
    [],
  );

  return {
    getWebsites,
    createWebsite,
    deleteWebsite,
    updateWebsite,
  };
};
