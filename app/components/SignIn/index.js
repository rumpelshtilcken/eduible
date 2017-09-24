import { Component } from 'react';
import Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

import SignInFormInputs from './SignInForm';
import MuiButton from './MuiButton';
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
              <p className="titleContainer">{'Sign in'.toUpperCase()}</p>
              <div className="formContainer">
                <div className="formInputsContainer">
                  <SignInFormInputs params={this.state} onChange={this.handleChange} />
                </div>
                <div className="continueButtonContainer">
                  <MuiButton
                    backgroundColor={'#7262BF'}
                    onClick={this.handleContinueButtonClick}
                    title={'Continue'}
                  />
                </div>
                <div className="additionalButtonsContainer">
                  <div className="socialButtonsTitle">{'Or sign in using'.toUpperCase()}</div>
                  <MuiButton
                    backgroundColor={'#6981CA'}
                    onClick={this.props.onFacebookButtonClick}
                    title={'Facebook'}
                  />
                  <MuiButton
                    backgroundColor={'#CB5541'}
                    onClick={this.props.onGoogleButtonClick}
                    title={'Google'}
                  />
                </div>
              </div>
            </div>
          </Modal>
          <style global>{stylesheet}</style>
        </div>
      </MuiThemeProvider>
    );
  }
}

SignIn.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  onContinueButtonClick: PropTypes.func.isRequired,
  onFacebookButtonClick: PropTypes.func.isRequired,
  onGoogleButtonClick: PropTypes.func.isRequired
};

export default SignIn;
