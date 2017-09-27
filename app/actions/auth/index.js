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
export const signupStudent = attr => async (dispatch) => {
  dispatch({ type: AUTH_IN_PROGRESS });

  try {
    await auth.signup('Student', attr, err => console.log('SSS: ', err) || (err ? dispatch(authError('err')) : dispatch({ type: AUTH_USER })));
  } catch (error) {
    const errorMsg = error.description || error.message || 'Unspecified error';
    dispatch(authError(errorMsg));
  }
};

export const signupProfessional =
    attr => async (dispatch) => {
      dispatch({ type: AUTH_IN_PROGRESS });

      try {
        await auth.signup('Professional', attr, err => console.log('SSS: ', err) || (err ? dispatch(authError('err')) : dispatch({ type: AUTH_USER })));
        dispatch({ type: AUTH_USER });
      } catch (error) {
        const errorMsg = error.description || error.message || 'Unspecified error';
        dispatch(authError(errorMsg));
      }
    };

export const signinUser = ({ email, password }) => async (dispatch) => {
  dispatch({ type: AUTH_IN_PROGRESS });

  try {
    await auth.signin(email, password, err => console.log('SSS: ', err) || (err ? dispatch(authError('err')) : dispatch({ type: AUTH_USER })));
  } catch (error) {
    const errorMsg = error.description || error.message || 'Unspecified error';
    return dispatch(authError(errorMsg));
  }
};

/*         Social auth        */
export const signinFacebook = () => async (dispatch) => {
  dispatch({ type: AUTH_IN_PROGRESS });

  try {
    await auth.signinSocial('facebook');
  } catch (error) {
    console.log(error);
    const errorMsg = error.description || error.message || 'Unspecified error';
    return dispatch(authError(errorMsg));
  }
};

export const signinGoogle = () => async (dispatch) => {
  dispatch({ type: AUTH_IN_PROGRESS });
  try {
    await auth.signinSocial('google');
  } catch (error) {
    const errorMsg = error.description || error.message || 'Unspecified error';
    return dispatch(authError(errorMsg));
  }
};

export const signinLinkedin = () => async (dispatch) => {
  dispatch({ type: AUTH_IN_PROGRESS });
  try {
    await auth.signinSocial('linkedin');
  } catch (error) {
    const errorMsg = error.description || error.message || 'Unspecified error';
    return dispatch(authError(errorMsg));
  }
};

export const socialSignInCallback = hash => async (dispatch) => {
  try {
    await auth.signinSocialCallback(hash);
    console.log('Succes social signin');
    dispatch({ type: AUTH_USER });
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
