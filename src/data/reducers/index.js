
import { combineReducers } from 'redux';

const EMAIL_CHANGED = 'EMAIL_CHANGED';

const INITIAL_STATE = {
  email: ''
};

const example = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export default combineReducers({ auth: example });
