import { bindActionCreators } from 'redux';
import { Component } from 'react';
import Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { MuiButton, MuiSnackbar } from 'components';
import * as formActions from 'actions/form';

import SignInSocialContainer from 'containers/SignInSocialContainer';
import ValidationUtils from 'utils/ValidationUtils';

import SignInFormInputs from './SignInFormInputs';
import stylesheet from './index.css';

class SignIn extends Component {
  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    onContinueButtonClick: PropTypes.func.isRequired,
    values: PropTypes.object
  };

  state = {
    snackMessage: 'Good Job',
    isSnackOpen: false
  };

  validation = {
    email: ValidationUtils.emailValidation,
    password: ValidationUtils.passwordValidation
  }

  handleRequestSnackClose = () => this.setState({ isSnackOpen: false });

  handleContinueButtonClick = () => {
    const { error } = this.props.values;

    const isNotValid = error
      && Object.keys(error).reduce((acc, key) => (acc && !error[key]), true);

    return !isNotValid
      ? this.setState({ snackMessage: 'Invalid inputs', isSnackOpen: true })
      : this.props.onContinueButtonClick();
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
                  <SignInFormInputs
                    validation={this.validation}
                  />
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

const mapStateToProps = state => ({ values: state.form });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(formActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

