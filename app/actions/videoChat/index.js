import {
  VIDEOCHAT_FIELD_UPDATE,
  VIDEOCHAT_FIELD_ERROR,
  VIDEOCHAT_FIELD_RESET
} from './types';

export const update = ({ name, value }) => dispatch => dispatch({
  type: VIDEOCHAT_FIELD_UPDATE, name, value
});

export const reset = () => dispatch => dispatch({ type: VIDEOCHAT_FIELD_RESET });

export const errorMessage = ({ name, errorMessage }) =>
  dispatch => dispatch({ type: VIDEOCHAT_FIELD_ERROR, name, errorMessage });
