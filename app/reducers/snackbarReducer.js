import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR
} from 'actions/snackbar/types';

const INIT = {
  message: '',
  messageType: ''
};

export default (state = INIT, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return { ...state, messageType: action.messageType, message: action.message };
    case HIDE_SNACKBAR:
      return INIT;
    default:
      return state;
  }
};
