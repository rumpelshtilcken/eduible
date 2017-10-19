import { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import { MuiButton, StatefulView } from 'components';
import SignInSocialContainer from 'containers/SignInSocialContainer';
import ValidationUtils from 'utils/ValidationUtils';

import SignUpFormInputs from './SignUpFormInputs';
import stylesheet from './index.css';

class SignUpProfessional extends Component {
  static propTypes = {
    onContinueButtonClick: PropTypes.func.isRequired,
    onLoginButtonClick: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired
  };

  validation = {
    fullname: ValidationUtils.fullnameValidation,
    email: ValidationUtils.emailValidation,
    password: ValidationUtils.passwordValidation
  }

  render() {
    return (
      <Modal
        contentLabel={''}
        isOpen
        onRequestClose={this.props.onRequestClose}
        className="signUpProfessionalModal"
        overlayClassName="signUpProfessionalOverlayModal"
      >
        <StatefulView {...this.props}>
          <div className="signUpProfessionalContainer">
            <p className="signUpProfessionalHeaderTitle">
              {'Join as professional'.toUpperCase()}
            </p>
            <p className="signUpProfessionalHeaderDescription">
              {'Share your knowledge and experience. Start now - it’s free'}
            </p>
            <div className="signUpProfessionalBodyContainer">
              <SignUpFormInputs
                validation={this.validation}
                onContinueButtonClick={this.props.onContinueButtonClick}
              >
                <div className="signUpProfessionalSocialContainerIn" >
                  <p>{'Or join with'.toUpperCase()}</p>
                  <SignInSocialContainer renderButtons={['Linkedin']} />
                </div>
                <div className="signUpProfessionalLoginContainerIn">
                  <img className="loginContainerLine" src="static/Line.jpg" alt="dividerLine" />
                  <p>{'Already a member?'.toUpperCase()}</p>
                  <button
                    className="loginButton"
                    onClick={this.props.onLoginButtonClick}
                  >
                    {'Log in here'}
                  </button>
                </div>
              </SignUpFormInputs>
              <MuiButton
                className="signUpProfessionalContinueButton"
                onClick={this.props.onContinueButtonClick}
              />
              <div className="signUpProfessionalSocialContainer" >
                <p>{'Or join with'.toUpperCase()}</p>
                <SignInSocialContainer renderButtons={['Linkedin']} />
              </div>
              <div className="signUpProfessionalLoginContainer">
                <img className="loginContainerLine" src="static/Line.jpg" alt="dividerLine" />
                <p>{'Already a member?'.toUpperCase()}</p>
                <button
                  className="loginButton"
                  onClick={this.props.onLoginButtonClick}
                >
                  {'Log in here'}
                </button>
              </div>
            </div>
          </div>
        </StatefulView>
        <style global jsx>{stylesheet}</style>
      </Modal>
    );
  }
}

export default SignUpProfessional;
