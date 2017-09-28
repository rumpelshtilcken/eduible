import auth0 from 'auth0-js';
import _ from 'lodash';

import { auth0Config } from 'config';
import { decodeJwtToken } from 'utils/auth';
import GraphCool from './GraphCool';

export default class Auth {
  auth0 = new auth0.WebAuth(auth0Config);
  graphCool = new GraphCool()

  prepareAttributes = (attrs) => {
    const { country, zipcode } = attrs;
    const prepareAttrs = _.omit(attrs, ['password', 'country', 'zipcode']);
    if (attrs.country && attrs.zipcode) {
      prepareAttrs.location = {
        country,
        zipcode
      };
    }
    return prepareAttrs;
  }

  signup = async (userType, attrs, callback) => {
    try {
      console.log(attrs);
      await this.auth0.signupAndAuthorize({
        connection: 'Username-Password-Authentication',
        email: attrs.email,
        password: attrs.password
      }, async (err, authResult) => {
        console.log('Sign up called |||', err);
        if (err) {
          callback(err);
          throw err;
        }
        try {
          console.log('Sign up');
          const auth0UserId = decodeJwtToken(authResult.idToken, 'sub');
          await this.graphCool.createUser({
            userType,
            auth0UserId,
            ...this.prepareAttributes(attrs)
          });
          console.log('Sign up');
          this.setSession(authResult);
          console.log('Sign up');
          callback();
        } catch (error) {
          throw error;
        }
      });
    } catch (error) {
      throw error;
    }
  }

  signin = async (username, password, callback) => {
    try {
      await this.auth0.client.login(
        { realm: auth0Config.realm, username, password },
        (err, authResult) => {
          if (err) {
            callback(err);
            throw err;
          }
          callback();
          this.setSession(authResult);
        });
    } catch (error) {
      throw error;
    }
  }

  signinSocial = (connectionType, callback) => {
    try {
      this.auth0.authorize({
        connection: connectionType,
        responseType: 'id_token'
      }, (err) => {
        if (err) {
          callback(err);
          throw err;
        }
      });
    } catch (error) {
      throw error;
    }
  }

  signinSocialCallback = async (hash) => {
    try {
      await this.graphCool.upsertUser(hash);
      await this.setSessionHash(hash);
    } catch (err) {
      throw err;
    }
  };

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
    // figrue out meaing of this  + new Date().getTime())
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000));
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    console.log('Session setted and app should redirect');
  }

  setSessionHash = (hash) => {
    this.auth0.parseHash(hash, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        return this.setSession(authResult);
      }
      console.log(authResult.idTokenPayload.exp);
      if (authResult.idTokenPayload) {
        return this.setSession({
          idToken: authResult.idToken,
          expiresIn: authResult.idTokenPayload.exp
        });
      }

      if (err) {
        return err;
      }
    });
  };

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
