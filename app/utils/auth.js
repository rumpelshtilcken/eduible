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
  const base64Url = idToken.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const result = JSON.parse(window.atob(base64));
  console.log(result);
  return claim ? result[claim] : result;
};

export const getCurrentUserData = (claim) => {
  const token = localStorage.getItem('id_token');
  return decodeJwtToken(token, claim);
};

export const convertDateToISO = (date) => {
  const d = new Date(date);
  return d.toISOString();
};
