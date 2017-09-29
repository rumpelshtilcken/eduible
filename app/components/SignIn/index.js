import { Component } from 'react';
import Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

import SignInSocialContainer from 'containers/SignInSocialContainer';

import SignInFormInputs from './SignInFormInputs';
import MuiButton from '../Material-ui/MuiButton';
import stylesheet from './index.css';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = ({ name, value }) =>
    this.setState({ [name]: value });

  handleContinueButtonClick = () => this.props.onContinueButtonClick(this.state);

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Modal
            isOpen
            onRequestClose={this.props.onRequestClose}
            className="SignInModal"
            overlayClassName="OverlayModal"
          >
            <div className="signInContainer">
              <p className="titleContainer">SIGN IN</p>
              <div className="formContainer">
                <div className="formInputsContainer">
                  <SignInFormInputs params={this.state} onChange={this.handleChange} />
                  <a className="forgotPassword" href="#" >Forgot your password?</a>
                </div>
                <div className="continueButtonContainer">
                  <MuiButton
                    onClick={this.handleContinueButtonClick}
                  />
                </div>

                <div className="additionalButtonsContainer">
                  <div className="socialButtonsTitle">OR SIGN IN USING</div>
                  <SignInSocialContainer renderButtons={['Facebook', 'Google', 'Linkedin']} />
                  <div className="signUpLink">
                    <img className="line" src="/static/Line.jpg" alt="hrline" />
                    <p>DON&#39;T HAVA ACCOUNT?</p>
                    <a className="signUpLink" href="#" >Sign Up here</a>
                  </div>

                </div>

              </div>
            </div>
          </Modal>
          <style global jsx>{stylesheet}</style>
        </div>
      </MuiThemeProvider>
    );
  }
}

SignIn.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  onContinueButtonClick: PropTypes.func.isRequired
};

export default SignIn;
