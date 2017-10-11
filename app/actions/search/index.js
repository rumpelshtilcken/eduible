import * as types from './types';

export const searchUpdate = ({ name, value }) => dispatch => dispatch({
  type: types.SEARCH_UPDATE, name, value
});

export const resetFilter = ({ name }) => dispatch =>
  dispatch({ type: types.RESET_FILTER, name });

export const reset = () => dispatch => dispatch({ type: types.SEARCH_RESET });
