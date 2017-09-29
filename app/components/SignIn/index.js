import { Component } from 'react';
import Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

import SignInSocialContainer from 'containers/SignInSocialContainer';

import MuiSnackbar from 'components/Material-ui/MuiSnackbar';
import SignInFormInputs from './SignInFormInputs';
import MuiButton from '../Material-ui/MuiButton';
import stylesheet from './index.css';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    snackMessage: 'Good Job',
    isSnackOpen: false
  };

  handleRequestSnackClose = () => this.setState({ isSnackOpen: false });

  handleChange = ({ name, value }) =>
    this.setState({ [name]: value });

  handleContinueButtonClick = () => {
    this.setState({ isSnackOpen: true });
    // this.props.onContinueButtonClick(this.state);
  }

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
                  <SignInSocialContainer renderButtons={['Facebook', 'Google']} />
                  <div className="signUpLink">
                    <img className="line" src="/static/Line.jpg" alt="hrline" />
                    <p>DON&#39;T HAVE AN ACCOUNT?</p>
                    <a className="signUpLink" href="#" >Sign Up here</a>
                  </div>

                </div>

              </div>
            </div>
          </Modal>
          <MuiSnackbar
            isOpen={this.state.isSnackOpen}
            action="UNDO"
            message={this.state.snackMessage}
            handleActionTouchTap={this.handleRequestSnackClose}
            handleRequestClose={this.handleRequestSnackClose}
          />
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
