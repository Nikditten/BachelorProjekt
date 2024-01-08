const fetchData = async (
  endpoint: string,
  method: 'POST' | 'PUT',
  body?: any,
  apiURL?: string
): Promise<Response> => {
  const url = `${
    apiURL ?? process.env.NEXT_PUBLIC_BACKEND_URL
  }/api/collector/${endpoint}`;

  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return res;
  } catch (error) {
    console.error(error);
  }

  return new Response();
};

export default fetchData;
