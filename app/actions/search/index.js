import * as types from './types';

export const searchUpdate = ({ input }) => dispatch => dispatch({
  type: types.SEARCH_UPDATE, input
});

export const reset = () => dispatch => dispatch({ type: types.SEARCH_RESET });
