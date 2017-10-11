import {
  SEARCH_UPDATE,
  SEARCH_RESET,
  RESET_FILTER
} from 'actions/search/types';

const INIT = {
  input: ''
};

export default (state = INIT, action) => {
  switch (action.type) {
    case SEARCH_UPDATE:
      return { ...state, [action.name]: action.value };
    case SEARCH_RESET:
      return INIT;
    case RESET_FILTER:
      return { ...state, [action.name]: null };
    default:
      return state;
  }
};
