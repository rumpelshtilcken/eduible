import { SHOW_MODAL, HIDE_MODAL } from './types';

export const hideModal = () => dispatch => dispatch({ type: HIDE_MODAL });
export const showModal = (modalType, modalProps) => dispatch =>
  dispatch({ type: SHOW_MODAL, modalType, modalProps });
export const showSignInModal = modalProps => showModal('SIGN_IN', modalProps);
export const showSignUpProfessionalModal = modalProps => showModal('SIGN_UP_PROFESSIONAL', modalProps);
export const showSignUpStudentModal = modalProps => showModal('SIGN_UP_STUDENT', modalProps);
export const showSignUpProfessionalStep2Modal = modalProps =>
  showModal('SIGN_UP_PROFESSIONAL_STEP_2', modalProps);
export const showSignUpProfessionalUniversity = modalProps =>
  showModal('SIGN_UP_PROFESSIONAL_UNIVERSITY', modalProps);
