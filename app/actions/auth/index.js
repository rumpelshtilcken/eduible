import fetch from 'isomorphic-unfetch';

import { auth0Config } from 'config';
import { getAccessToken } from 'utils/auth';

import {
  AUTH_USER,
  AUTH_IN_PROGRESS,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEARDOWN
} from './authTypes';

import Auth from './Auth';

const auth = new Auth();

export const signinUser = ({ email, password }, callback) => (dispatch) => {
  dispatch({ type: AUTH_IN_PROGRESS });

  auth.signin(email, password, callback)
    .then(() => {
      const auth0AccessToken = getAccessToken();

      fetch(`${auth0Config.apiUrl}/getOriginAccessToken`, {
        headers: {
          Authorization: `Bearer ${auth0AccessToken}`
        }
      })
        .then((res) => {
          const { success, originAccessToken } = res.data;

          if (success === 'true') {
            localStorage.setItem('origin_access_token', originAccessToken);
            dispatch({ type: AUTH_USER });
            return callback();
          }
          return dispatch(authError('Error fetching Origin Access Token'));
        })
        .catch((error) => {
          const errorMsg = error.description || error.message || 'Unspecified error';
          return dispatch(authError(errorMsg));
        });
    })
    .catch((error) => {
      const errorMsg = error.description || error.message || 'Unspecified error';
      return dispatch(authError(errorMsg));
    });
};

export const authError = (error) => {
  const timestamp = Date.now();
  return {
    type: AUTH_ERROR,
    error,
    timestamp
  };
};

export const signoutUser = () => {
  auth.signout();
  return { type: UNAUTH_USER };
};

export const cleardown = () => ({
  type: CLEARDOWN
});

export const handleAuthentication = () => (dispatch) => {
  auth.handleAuthentication()
    .then(() => dispatch({ type: AUTH_USER }))
    .catch(() => dispatch({ type: UNAUTH_USER }));
};
