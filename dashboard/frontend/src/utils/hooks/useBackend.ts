import { useCookies } from ".";
import { ApiResponse } from "../types";

interface Backend {
  authenticate: (username: string, password: string) => Promise<ApiResponse>;
  getUser: () => Promise<ApiResponse>;
}

export const useBackend = (): Backend => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { getCookie } = useCookies();

  const fetchCall = async (endpoint: string, method: string, body?: any) => {
    const res = await fetch(`${url}/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getCookie("auth")}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    return res;
  };

  const authenticate = async (
    username: string,
    password: string,
  ): Promise<ApiResponse> => {
    const res = await fetchCall("User/Login", "POST", {
      username: username,
      password: password,
    });

    return {
      status: res.status,
      content: res.status == 200 ? await res.text() : await res.json(),
    };
  };

  const getUser = async (): Promise<ApiResponse> => {
    const res = await fetchCall("User/Me", "GET", null);

    return {
      status: res.status,
      content: await res.json(),
    };
  };

  return {
    authenticate,
    getUser,
  };
};
