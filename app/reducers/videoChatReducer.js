import {
  VIDEOCHAT_FIELD_UPDATE,
  VIDEOCHAT_FIELD_ERROR,
  VIDEOCHAT_FIELD_RESET
} from 'actions/videoChat/types';

const INIT = {};

export default (state = INIT, action) => {
  switch (action.type) {
    case VIDEOCHAT_FIELD_UPDATE:
      return { ...{}, ...state, [action.name]: action.value };
    case VIDEOCHAT_FIELD_ERROR:
      return { ...state, error: { ...state.error, [action.name]: action.errorMessage } };
    case VIDEOCHAT_FIELD_RESET:
      return INIT;
    default:
      return state;
  }
};
