import { SHOW_MODAL, HIDE_MODAL } from '../types';

const initialState = {
  modalType: '',
  modalProps: null
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default modalReducer;
