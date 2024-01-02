const fetchData = async (
  endpoint: string,
  method: 'POST' | 'PUT',
  body?: any
): Promise<Response> => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}`;

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
