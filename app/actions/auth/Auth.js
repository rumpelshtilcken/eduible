import auth0 from 'auth0-js';
import { gql } from 'react-apollo';

import { auth0Config } from 'config';
import initApollo from 'lib/initApollo';
import { getUserMetadata, convertDateToISO } from 'utils/auth';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: auth0Config.domain,
    clientID: auth0Config.clientId,
    // audience: `https://${auth0Config.domain}/userinfo`,
    redirectUri: auth0Config.callbackUrl,
    scope: auth0Config.scope,
    responseType: 'token id_token'
  });

  apolloClient = initApollo();

  signupStudent = async ({ email, password, name, birthdate }) => {
    try {
      this.auth0.signupAndAuthorize({
        connection: 'Username-Password-Authentication',
        email,
        password
      }, (err, authResult) => {
        if (err) throw new Error(err);

        const createUser = gql`
          mutation (
            $auth0UserId: String! 
            $email: String! 
            $name: String! 
            $birthdate: DateTime!
            $userType: UserType!
            $student: UserstudentStudent
          ){
            createUser(
              auth0UserId: $auth0UserId
              birthdate: $birthdate,
              name: $name
              email: $email
              userType: $userType
              student: $student
            ) {
              id
              student {
                id
              }
            }
          }
        `;

        const auth0UserId = getUserMetadata(authResult.idToken, 'sub');

        const birthdateISO = convertDateToISO(birthdate);

        const variables = {
          auth0UserId,
          email,
          name,
          birthdate: birthdateISO,
          userType: 'Student',
          student: {}
        };

        this.apolloClient.mutate({ mutation: createUser, variables })
          .then(res => console.log('Apollo succes: ', res))
          .catch(err => console.log('Apollo error: ', err));
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  signupProfessional = ({ email, password, name, birthdate, country, zipCode }) => {
    try {
      this.auth0.signupAndAuthorize({
        connection: 'Username-Password-Authentication',
        email,
        password
      }, (err, authResult) => {
        if (err) throw new Error(err);

        const createUser = gql`
          mutation (
            $auth0UserId: String! 
            $email: String! 
            $name: String! 
            $birthdate: DateTime!
            $userType: UserType!
            $professional: UserprofessionalProfessional
          ){
            createUser(
              auth0UserId: $auth0UserId
              birthdate: $birthdate,
              name: $name
              email: $email
              userType: $userType
              professional: $professional
            ) {
              id
              professional {
                id
              }
            }
          }
        `;

        const auth0UserId = getUserMetadata(authResult.idToken, 'sub');
        const birthdateISO = convertDateToISO(birthdate);

        const variables = {
          auth0UserId,
          email,
          name,
          birthdate: birthdateISO,
          userType: 'Professional',
          professional: {
            location: {
              country,
              zipcode: zipCode
            }
          }
        };

        this.apolloClient.mutate({ mutation: createUser, variables })
          .then(res => console.log('Apollo succes: ', res))
          .catch(err => console.log('Apollo error: ', err));
      });
    } catch (error) {
      throw new Error(error);
    }
  };

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

  signin = (username, password, callback) => new Promise((resolve, reject) => {
    this.auth0.client.login(
      { realm: auth0Config.realm, username, password },
      async (err, authResult) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(authResult);
        await callback(authResult);
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
