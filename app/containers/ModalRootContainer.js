import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from 'actions/modal';

import SignInContainer from './SignInContainer';
import SignUpStudentsContainer from './SignUpStudentsContainer';
import SignUpProfessionalContainer from './SignUpProfessionalContainer';
import SignUpProfessionalStep2Container from './SignUpProfessionalStep2Container';
import SignUpProfessionalUniversityContainer from './SignUpProfessionalUniversityContainer';

class ModalRootContainer extends Component {
  MODAL_COMPONENTS = {
    SIGN_UP_PROFESSIONAL: SignUpProfessionalContainer,
    SIGN_IN: SignInContainer,
    SIGN_UP_STUDENT: SignUpStudentsContainer,
    SIGN_UP_PROFESSIONAL_STEP_2: SignUpProfessionalStep2Container,
    SIGN_UP_PROFESSIONAL_UNIVERSITY: SignUpProfessionalUniversityContainer,
    LOADING: <div>Loading...</div>
  };

  render() {
    const { type } = this.props;
    if (type === null) {
      return null;
    }

    const SpecificModal = this.MODAL_COMPONENTS[type];
    return (
      <SpecificModal isOpen onRequestClose={this.props.hideModal} />
    );
  }
}

ModalRootContainer.propTypes = {
  type: PropTypes.string,
  hideModal: PropTypes.func.isRequired
};

const mapStateToProps = ({ modal }) => modal;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalRootContainer);
