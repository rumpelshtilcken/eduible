import {
  AUTH_USER,
  AUTH_IN_PROGRESS,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEARDOWN
} from './authTypes';

import Auth from './Auth';

const auth = new Auth();

/*         Local auth        */
export const signupStudent = (attr, callback) => async (dispatch) => {
  dispatch({ type: AUTH_IN_PROGRESS });

  try {
    console.log('sign up student');
    await auth.signup('Student', attr, (err) => {
      console.log('ssss', callback);
      callback();
      return err ? dispatch(authError('err')) : dispatch({ type: AUTH_USER });
    });
  } catch (error) {
    const errorMsg = error.description || error.message || 'Unspecified error';
    dispatch(authError(errorMsg));
  }
};

export const signupProfessional =
    (attr, callback) => async (dispatch) => {
      dispatch({ type: AUTH_IN_PROGRESS });

      try {
        console.log('sign up dsds', attr);
        const result = await auth.signup('Professional', attr, (err) => {
          console.log('callback');
          callback();
          return err ? dispatch(authError('err')) : dispatch({ type: AUTH_USER });
        });
        console.log('result: ', result);
        dispatch({ type: AUTH_USER });
      } catch (error) {
        console.log(error);
        const errorMsg = error.description || error.message || 'Unspecified error';
        dispatch(authError(errorMsg));
      }
    };

export const signinUser = ({ email, password }) => async (dispatch) => {
  dispatch({ type: AUTH_IN_PROGRESS });

  try {
    await auth.signin(email, password, err => (err ? dispatch(authError('err')) : dispatch({ type: AUTH_USER })));
  } catch (error) {
    const errorMsg = error.description || error.message || 'Unspecified error';
    return dispatch(authError(errorMsg));
  }
};

/*         Social auth        */
export const signinFacebook = () => async (dispatch) => {
  try {
    await auth.signinSocial('facebook');
    return dispatch({ type: AUTH_IN_PROGRESS });
  } catch (error) {
    console.log(error);
    const errorMsg = error.description || error.message || 'Unspecified error';
    return dispatch(authError(errorMsg));
  }
};

export const signinGoogle = () => async (dispatch) => {
  try {
    await auth.signinSocial('google');
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
    console.log(error);
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
