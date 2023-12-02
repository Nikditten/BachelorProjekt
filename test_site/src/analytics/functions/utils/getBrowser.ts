const getBrowser = () => {
  const userAgent = navigator.userAgent;
  let browser = 'Other';

  if (userAgent.indexOf('Chrome') > -1) {
    browser = 'Chrome';
  } else if (userAgent.indexOf('Firefox') > -1) {
    browser = 'Firefox';
  } else if (userAgent.indexOf('Safari') > -1) {
    browser = 'Safari';
  }

  return browser;
};

export default getBrowser;
