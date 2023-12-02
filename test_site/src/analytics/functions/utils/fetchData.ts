const fetchData = async (
  endpoint: string,
  method: 'POST' | 'PUT',
  body?: any
): Promise<Response> => {
  const url = `https://localhost:7213/api/${endpoint}`;

  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res;
};

export default fetchData;
