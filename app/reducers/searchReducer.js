import {
  SEARCH_UPDATE,
  SEARCH_RESET
} from 'actions/search/types';

const INIT = {
  input: ''
};

export default (state = INIT, action) => {
  switch (action.type) {
    case SEARCH_UPDATE:
      return { ...state, input: action.input };
    case SEARCH_RESET:
      return INIT;
    default:
      return state;
  }
};
