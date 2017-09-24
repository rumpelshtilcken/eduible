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
