import * as types from './types';

export const showSnackbar = ({ messageType = 'success', message }) => dispatch => dispatch({
  type: types.SHOW_SNACKBAR, messageType, message
});

export const hideSnackbar = () => dispatch =>
  dispatch({ type: types.HIDE_SNACKBAR });
