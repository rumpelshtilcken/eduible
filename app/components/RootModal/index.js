import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

import SignUpStudents from './SignUpStudents';
import SignUpProfessionals from './SignUpProfessionals';

const MODAL_COMPONENTS = {
  SIGN_UP_STUDENTS: SignUpStudents,
  SIGN_UP_PROFESSIONALS: SignUpProfessionals
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return (
    <MuiThemeProvider>
      <SpecificModal {...modalProps} />
    </MuiThemeProvider>
  );
};

ModalRoot.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.object
};

export default connect(
  state => state.modal
)(ModalRoot);
