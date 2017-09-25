import auth0 from 'auth0-js';
import { auth0Config } from 'config';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: auth0Config.domain,
    clientID: auth0Config.clientId,
    // audience: `https://${auth0Config.domain}/userinfo`,
    redirectUri: auth0Config.callbackUrl,
    scope: auth0Config.scope,
    responseType: 'token id_token'
  });

  constructor() {
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  signup = (username, password) => new Promise((resolve, reject) => {
    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      email: username,
      password
    }, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });

  signin = (username, password) => new Promise((resolve, reject) => {
    this.auth0.client.login(
      { realm: auth0Config.realm, username, password },
      (err, authResult) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(authResult);
        this.setSession(authResult);
        return resolve();
      }
    );
  })

  signout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('origin_access_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  handleAuthentication = () => new Promise((resolve, reject) => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        return resolve();
      } else if (err) {
        console.log(err);
        return reject(err);
      }
    });
  })

  setSession = (authResult) => {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
