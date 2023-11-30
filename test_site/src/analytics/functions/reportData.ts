const reportData = async (content: any, type: 'Session' | 'Analytic') => {
  const url = `https://localhost:7213/api/${type}/Create`;

  console.log('reportData', content, type);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  });

  if (res.status === 200) return res.text();
  else return false;
};

export default reportData;
