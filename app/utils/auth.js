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

export const getOriginAccessToken = () => {
  const originAccessToken = localStorage.getItem('origin_access_token');
  return originAccessToken;
};

export const getClaimFromToken = (token, claim) => {
  const payload = token.split('.')[1];
  const bin = btoa(payload);
  const obj = JSON.parse(bin);
  return obj[claim];
};

export const getUserMetadata = (idToken, claim) => {
  const base64Url = idToken.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const result = JSON.parse(window.atob(base64));
  return result[claim];
};

export const convertDateToISO = (date) => {
  const d = new Date(date);
  return d.toISOString();
};
