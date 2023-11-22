import { getCookie } from "./cookie";

const fetchCall = async (endpoint: string, method: string, body?: any) => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

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

export default fetchCall;
