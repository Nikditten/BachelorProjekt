import { useCallback } from "react";
import fetchCall from "../api";
import { IApiResponse } from "../types";

interface BackendAuth {
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

export const useBackendAuth = (): BackendAuth => {
  const userLogin = useCallback(
    async (username: string, password: string): Promise<IApiResponse> => {
      const res = await fetchCall("User/Login", "POST", {
        username: username,
        password: password,
      });

      if (res.status === 200) {
        return {
          status: res.status,
          content: await res.text(),
        };
      }

      return {
        status: res.status,
        content: res.statusText,
      };
    },
    [],
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

      if (res.status === 200) {
        return {
          status: res.status,
          content: await res.text(),
        };
      }

      return {
        status: res.status,
        content: res.statusText,
      };
    },
    [],
  );

  const getUser = useCallback(async (): Promise<IApiResponse> => {
    const res = await fetchCall("User/Me", "GET", null);

    if (res.status === 200) {
      return {
        status: res.status,
        content: await res.text(),
      };
    }

    return {
      status: res.status,
      content: null,
    };
  }, []);

  const changeName = useCallback(
    async (name: string): Promise<IApiResponse> => {
      const res = await fetchCall("User/Name", "PUT", {
        name: name,
      });

      return {
        status: res.status,
        content: res.statusText,
      };
    },
    [],
  );

  const changeUsername = useCallback(
    async (username: string): Promise<IApiResponse> => {
      const res = await fetchCall("User/Username", "PUT", {
        username: username,
      });

      return {
        status: res.status,
        content: res.statusText,
      };
    },
    [],
  );

  const changePassword = useCallback(
    async (
      oldPassword: string,
      newPassword: string,
      confirmPassword: string,
    ): Promise<IApiResponse> => {
      const res = await fetchCall("User/Password", "PUT", {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });

      return {
        status: res.status,
        content: res.statusText,
      };
    },
    [],
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
