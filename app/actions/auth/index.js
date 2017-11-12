import Auth from 'services/Auth';

import {
  AUTH_USER,
  AUTH_IN_PROGRESS,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEARDOWN
} from './authTypes';

const auth = new Auth();

/*         Local auth        */
export const signupStudent = (attr, callback) => async (dispatch) => {
  dispatch({ type: AUTH_IN_PROGRESS });

  try {
    await auth.signup('Student', attr, (err) => {
      if (err) {
        dispatch(authError(err.description || err.message || 'Unspecified error'));
        return callback && callback(err);
      }
      dispatch({ type: AUTH_USER });
      return callback && callback();
    });
  } catch (error) {
    const errorMsg = error.description || error.message || 'Unspecified error';
    dispatch(authError(errorMsg));
    return callback && callback(errorMsg);
  }
};

export const signupProfessional =
    (attr, callback) => async (dispatch) => {
      dispatch({ type: AUTH_IN_PROGRESS });

      try {
        await auth.signup('Professional', attr, (err) => {
          if (err) {
            dispatch(authError(err.description || err.message || 'Unspecified error'));
            return callback && callback(err);
          }
          dispatch({ type: AUTH_USER });
          return callback && callback();
        });
      } catch (error) {
        const errorMsg = error.description || error.message || 'Unspecified error';
        dispatch(authError(errorMsg));
        return callback && callback(errorMsg);
      }
    };

export const signinUser = ({ email, password }, callback) => async (dispatch) => {
  dispatch({ type: AUTH_IN_PROGRESS });

  try {
    await auth.signin(email, password, (err) => {
      if (err) {
        dispatch(authError(err.description || err.message || 'Unspecified error'));
        return callback && callback(err);
      }

      dispatch({ type: AUTH_USER });
      return callback && callback();
    });
  } catch (error) {
    const errorMsg = error.description || error.message || 'Unspecified error';
    dispatch(authError(errorMsg));
    return callback && callback(errorMsg);
  }
};

/*         Social auth        */
export const signinFacebook = () => async (dispatch) => {
  try {
    await auth.signinSocial('facebook');
    return dispatch({ type: AUTH_IN_PROGRESS });
  } catch (error) {
    const errorMsg = error.description || error.message || 'Unspecified error';
    return dispatch(authError(errorMsg));
  }
};

export const signinGoogle = () => async (dispatch) => {
  try {
    await auth.signinSocial('google-oauth2');
    return dispatch({ type: AUTH_IN_PROGRESS });
  } catch (error) {
    const errorMsg = error.description || error.message || 'Unspecified error';
    return dispatch(authError(errorMsg));
  }
};

export const signinLinkedin = () => async (dispatch) => {
  try {
    await auth.signinSocial('linkedin');
    return dispatch({ type: AUTH_IN_PROGRESS });
  } catch (error) {
    const errorMsg = error.description || error.message || 'Unspecified error';
    return dispatch(authError(errorMsg));
  }
};

export const socialSignInCallback = hash => async (dispatch) => {
  try {
    dispatch({ type: AUTH_IN_PROGRESS });
    await auth.signinSocialCallback(hash);
    return dispatch({ type: AUTH_USER });
  } catch (error) {
    const errorMsg = error.description || error.message || 'Unspecified error';
    return dispatch(authError(errorMsg));
  }
};

/*      Additional functions       */
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
