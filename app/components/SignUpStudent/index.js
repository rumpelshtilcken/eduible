import { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import { MuiButton, StatefulView } from 'components';

import SignInSocialContainer from 'containers/SignInSocialContainer';
import ValidationUtils from 'utils/ValidationUtils';

import SignUpFormInputs from './SignUpFormInputs';
import style from './index.css';

class SignUpStudent extends Component {
  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    onLoginButtonClick: PropTypes.func.isRequired,
    onContinueButtonClick: PropTypes.func.isRequired
  };

  validation = {
    fullname: ValidationUtils.fullnameValidation,
    email: ValidationUtils.emailValidation,
    password: ValidationUtils.passwordValidation
  }

  render() {
    return (
      <Modal
        isOpen
        onRequestClose={this.props.onRequestClose}
        className="signUpStudentModalContainer"
        overlayClassName="signUpStudentModalOverlayModal"
      >
        <StatefulView {...this.props}>
          <div className="signUpStudentContainer">
            <p className="signUpStudentHeaderTitle">
              {'Sign up'.toUpperCase()}
            </p>
            <div className="signUpStudentBodyContainer">
              <div className="inputs">
                <SignUpFormInputs
                  validation={this.validation}
                  onContinueButtonClick={this.props.onContinueButtonClick}
                />
              </div>
              <div className="signUpStudentContinueButton">
                <MuiButton onClick={this.props.onContinueButtonClick} />
              </div>
              <div className="rightSideBar">
                <div className="signUpStudentSocialContainer">
                  <p>{'Or sign up using'.toUpperCase()}</p>
                  <SignInSocialContainer renderButtons={['Facebook', 'Google']} />
                </div>
                <div className="signUpStudentLoginContainer">
                  <img src="static/Line.jpg" alt="dividerLine" />
                  <p>{'Already a member?'.toUpperCase()}</p>
                  <input
                    type="button"
                    className="loginButton"
                    onClick={this.props.onLoginButtonClick}
                    value={'Log in here'}
                  />
                </div>
              </div>
            </div>
          </div>
        </StatefulView>
        <style global jsx>{style}</style>
      </Modal>
    );
  }
}

export default SignUpStudent;
