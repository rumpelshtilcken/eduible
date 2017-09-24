import { WebAuth } from 'auth0-js';

import { domain, clientId } from 'config';

let webAuth = null;

const getWebAuth = async () => {
  if (webAuth) return webAuth;
  try {
    webAuth = await new WebAuth({
      domain,
      clientID: clientId,
      redirectUri: 'localhost:3000/studentProfile',
      responseType: 'token'
    });

    return webAuth;
  } catch (error) {
    throw new Error('Auth initialization error');
  }
};

export default getWebAuth;
