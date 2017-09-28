import { SHOW_MODAL, HIDE_MODAL } from './types';

export const hideModal = () => dispatch => dispatch({ type: HIDE_MODAL });
export const showModal = modalType => dispatch => dispatch({ type: SHOW_MODAL, modalType });
export const showSignInModal = () => showModal('SIGN_IN');
export const showSignUpProfessionalModal = () => showModal('SIGN_UP_PROFESSIONAL');
export const showSignUpStudentModal = () => showModal('SIGN_UP_STUDENT');
export const showSignUpProfessionalStep2Modal = () => showModal('SIGN_UP_PROFESSIONAL_STEP_2');
export const showSignUpProfessionalUniversity = () => showModal('SIGN_UP_PROFESSIONAL_UNIVERSITY');
