import Modal from 'react-modal';
import PropTypes from 'prop-types';

import { AuthForm, MuiButton, StatefulView } from 'components';
import SignInSocialContainer from 'containers/SignInSocialContainer';

import stylesheet from './index.css';

const SignIn = ({
  ...props,
  onRequestClose,
  onContinueButtonClick,
  inputs,
  onSignUpStudentButtonClick,
  onSignUpProfessionalButtonClick
}) => (
  <div>
    <Modal
      isOpen
      onRequestClose={onRequestClose}
      className="SignInModal"
      overlayClassName="OverlayModal"
    >
      <StatefulView {...props}>
        <div className="signInContainer">
          <p className="titleContainer">SIGN IN</p>
          <div className="formContainer">
            <div className="formInputsContainer">
              <AuthForm inputs={inputs} onContinueButtonClick={onContinueButtonClick} />
              <a className="forgotPassword" href="#" >Forgot your password?</a>
            </div>
            <div className="continueButtonContainer">
              <MuiButton
                onClick={onContinueButtonClick}
              />
            </div>
            <div className="additionalButtonsContainer">
              <div className="socialButtonsTitle">OR SIGN IN USING</div>
              <SignInSocialContainer renderButtons={['Facebook', 'Google', 'Linkedin']} />
              <div className="signUpLink">
                <img className="line" src="/static/Line.jpg" alt="hrline" />
                <p>DON&#39;T HAVE AN ACCOUNT?</p>
                <button
                  className="signUpButton"
                  onClick={onSignUpStudentButtonClick}
                >
                  {'Sign Up as Professional'}
                </button>
                <button
                  className="signUpButton"
                  onClick={onSignUpProfessionalButtonClick}
                >
                  {'Sign Up as Student'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </StatefulView>
    </Modal>
    <style global jsx>{stylesheet}</style>
  </div>
);


SignIn.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  onContinueButtonClick: PropTypes.func.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.object),
  onSignUpStudentButtonClick: PropTypes.func.isRequired,
  onSignUpProfessionalButtonClick: PropTypes.func.isRequired
};

export default SignIn;

