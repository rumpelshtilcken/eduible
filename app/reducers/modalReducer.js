import { HIDE_MODAL, SHOW_MODAL } from 'actions/modal/types';

const INIT = {
  type: null
};

const modalReducer = (state = INIT, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        type: action.modalType,
        modalProps: action.modalProps
      };
    case HIDE_MODAL:
      return INIT;
    default:
      return state;
  }
};

export default modalReducer;
