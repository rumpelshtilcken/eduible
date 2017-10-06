import * as types from './types';

export const update = ({ name, value }) => dispatch => dispatch({
  type: types.INPUT_UPDATE, name, value
});

export const reset = () => dispatch => dispatch({ type: types.INPUT_RESET });

export const errorMessage = ({ name, errorMessage }) =>
  dispatch => dispatch({ type: types.INPUT_ERROR, name, errorMessage });
