import modalReducer from './modalReducer';

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

export default { auth: example, modal: modalReducer };
