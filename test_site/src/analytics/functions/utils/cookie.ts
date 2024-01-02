export const setCookie = (name: string, value: string, exp?: Date) => {
  const expString = exp ? `expires=${exp.toUTCString()};` : '';

  document.cookie = `${name}=${value}; ${expString} path=/`;
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split(';');
  const cookie = cookies
    .find((cookie) => cookie.split('=')[0] === name)
    ?.split('=')[1];

  return cookie;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
