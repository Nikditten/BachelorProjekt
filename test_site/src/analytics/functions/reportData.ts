const reportData = async (content: any, type: 'SESSION' | 'ANALYTIC') => {
  const endpoint = type === 'SESSION' ? 'Session' : 'Analytic';
  const url = `localhost:3000/api/${endpoint}/Report`;

  console.log('reportData', content, type);

  // const res = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(content),
  // });

  // if (res.status === 200) return true;
  // else return false;
};

export default reportData;
