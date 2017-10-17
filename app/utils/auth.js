export const getIdToken = () => {
  const idToken = localStorage.getItem('id_token');
  if (!idToken) {
    throw new Error('No id token found');
  }
  return idToken;
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }
  return accessToken;
};
/* eslint-disable */
const snakeToCamel = s => s.replace(/(\_\w)/g, m => m[1].toUpperCase());
/* eslint-enable */
export const parseHash = (hash) => {
  const data = hash.replace('#', '').split('&').reduce((acc, keyValue) => {
    const [key, value] = keyValue.split('=');
    acc[snakeToCamel(key)] = value;
    return acc;
  }, {});

  return data;
};

export const getOriginAccessToken = () => {
  const originAccessToken = localStorage.getItem('origin_access_token');
  return originAccessToken;
};

export const decodeJwtToken = (idToken, claim) => {
  let result = JSON.parse(atob(idToken));
  if (result && result.sub) return claim ? result[claim] : result;

  const base64Url = idToken.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  result = JSON.parse(atob(base64));
  return claim ? result[claim] : result;
};

export const getCurrentUserData = (claim) => {
  if (!process.browser) return null;
  const token = localStorage.getItem('id_token');
  return token && decodeJwtToken(token, claim);
};

export const convertDateToISO = (date) => {
  const d = new Date(date);
  return d.toISOString();
};

export const convertFromISOStringFormat = (dateISO) => {
  const date = new Date(dateISO);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = `0${dt}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  return `${year}-${month}-${dt}`;
};
