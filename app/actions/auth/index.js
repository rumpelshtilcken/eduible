import {
  AUTH_USER,
  AUTH_IN_PROGRESS,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEARDOWN
} from './authTypes';

import Auth from './Auth';

const auth = new Auth();

export const signupStudent = ({ email, password, name, birthdate }) => async (dispatch) => {
  dispatch({ type: AUTH_IN_PROGRESS });

  try {
    await auth.signupStudent({ email, password, name, birthdate });
    dispatch({ type: AUTH_USER });
  } catch (error) {
    const errorMsg = error.description || error.message || 'Unspecified error';
    dispatch(authError(errorMsg));
  }
};

export const signupProfessional =
    ({ email, password, name, birthdate, country, zipCode }) => async (dispatch) => {
      dispatch({ type: AUTH_IN_PROGRESS });

      try {
        await auth.signupProfessional({ email, password, name, birthdate, country, zipCode });
        dispatch({ type: AUTH_USER });
      } catch (error) {
        const errorMsg = error.description || error.message || 'Unspecified error';
        dispatch(authError(errorMsg));
      }
    };

export const signinUser = ({ email, password }, callback) => (dispatch) => {
  dispatch({ type: AUTH_IN_PROGRESS });

  auth.signin(email, password, callback)
    .then(() => dispatch({ type: AUTH_USER }))
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
