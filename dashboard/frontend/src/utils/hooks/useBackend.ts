import { useCallback } from "react";
import { useCookies } from ".";
import { IApiResponse } from "../types";

interface Backend {
  userLogin: (username: string, password: string) => Promise<IApiResponse>;
  userSignup: (
    name: string,
    username: string,
    password: string,
  ) => Promise<IApiResponse>;
  changeName: (name: string) => Promise<IApiResponse>;
  changeUsername: (username: string) => Promise<IApiResponse>;
  changePassword: (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) => Promise<IApiResponse>;
  getUser: () => Promise<IApiResponse>;
}

export const useBackend = (): Backend => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { getCookie } = useCookies();

  const fetchCall = useCallback(
    async (endpoint: string, method: string, body?: any) => {
      const res = await fetch(`${url}/${endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getCookie("auth")}`,
        },
        body: body ? JSON.stringify(body) : null,
      });

      return res;
    },
    [getCookie, url],
  );

  const userLogin = useCallback(
    async (username: string, password: string): Promise<IApiResponse> => {
      const res = await fetchCall("User/Login", "POST", {
        username: username,
        password: password,
      });

      return {
        status: res.status,
        content: res.status == 200 ? await res.text() : await res.json(),
      };
    },
    [fetchCall],
  );

  const userSignup = useCallback(
    async (
      name: string,
      username: string,
      password: string,
    ): Promise<IApiResponse> => {
      const res = await fetchCall("User/Create", "POST", {
        name: name,
        username: username,
        password: password,
      });

      return {
        status: res.status,
        content: res.status == 200 && (await res.text()),
      };
    },
    [fetchCall],
  );

  const getUser = useCallback(async (): Promise<IApiResponse> => {
    const res = await fetchCall("User/Me", "GET", null);

    return {
      status: res.status,
      content: res.status === 200 ? await res.json() : await res.statusText,
    };
  }, [fetchCall]);

  const changeName = useCallback(
    async (name: string): Promise<IApiResponse> => {
      const res = await fetchCall("User/Name", "PUT", {
        name: name,
      });

      return {
        status: res.status,
        content: await res.statusText,
      };
    },
    [fetchCall],
  );

  const changeUsername = useCallback(
    async (username: string): Promise<IApiResponse> => {
      const res = await fetchCall("User/Username", "PUT", {
        username: username,
      });

      return {
        status: res.status,
        content: await res.statusText,
      };
    },
    [fetchCall],
  );

  const changePassword = useCallback(
    async (
      oldPassword: string,
      newPassword: string,
      confirmPassword: string,
    ) => {
      const res = await fetchCall("User/Password", "PUT", {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });

      return {
        status: res.status,
        content: await res.statusText,
      };
    },
    [fetchCall],
  );

  return {
    userLogin,
    getUser,
    userSignup,
    changeName,
    changeUsername,
    changePassword,
  };
};
