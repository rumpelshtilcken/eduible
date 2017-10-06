import { INPUT_UPDATE, FORM_RESET, INPUT_ERROR } from 'actions/form/types';

const INIT = {};

export default (state = INIT, action) => {
  switch (action.type) {
    case INPUT_UPDATE:
      return { ...{}, ...state, [action.name]: action.value };
    case INPUT_ERROR:
      return { ...state, error: { ...state.error, [action.name]: action.errorMessage } };
    case FORM_RESET:
      return INIT;
    default:
      return state;
  }
};
