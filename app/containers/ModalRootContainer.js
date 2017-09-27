import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignInContainer from './SignInContainer';
import SignUpContainerStudentContainer from './SignUpStudentsContainer';
import SignUpProfessionalContainer from './SignUpProfessionalContainer';

class ModalRootContainer extends Component {
  MODAL_COMPONENTS = {
    SIGN_UP_PROFESSIONALS: SignUpProfessionalContainer,
    SIGN_IN: SignInContainer,
    SIGN_UP_STUDENTS: SignUpContainerStudentContainer
  };

  render() {
    const { modalType, modalProps } = this.props;
    if (!modalType) {
      return null;
    }

    const SpecificModal = this.MODAL_COMPONENTS[modalType];
    return <SpecificModal {...modalProps} />;
  }
}

ModalRootContainer.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.object
};

export default connect(
  state => state.modal
)(ModalRootContainer);
