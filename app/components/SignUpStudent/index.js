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

import SignUpFormInputs from './SignUpFormInputs';
import style from './index.css';

class SignUpStudent extends Component {
  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    onLoginButtonClick: PropTypes.func.isRequired,
    onContinueButtonClick: PropTypes.func.isRequired,
    values: PropTypes.object
  };

  state = {
    isSnackOpen: false,
    snackMessage: 'Good Job'
  };

  validation = {
    fullname: ValidationUtils.fullnameValidation,
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
            className="signUpStudentModalContainer"
            overlayClassName="signUpStudentModalOverlayModal"
          >
            <div className="signUpStudentContainer">
              <p className="signUpStudentHeaderTitle">
                {'Sign up'.toUpperCase()}
              </p>
              <div className="signUpStudentBodyContainer">
                <SignUpFormInputs
                  validation={this.validation}
                />
                <MuiButton
                  className="signUpStudentContinueButton"
                  onClick={this.handleContinueButtonClick}
                />
                <div className="signUpStudentSocialContainer">
                  <p>{'Or sign up using'.toUpperCase()}</p>
                  <SignInSocialContainer renderButtons={['Facebook', 'Google']} />
                </div>
                <div className="signUpStudentLoginContainer">
                  <img src="static/Line.jpg" alt="dividerLine" />
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
            <style global jsx>{style}</style>
          </Modal>
          <MuiSnackbar
            isOpen={this.state.isSnackOpen}
            action="UNDO"
            message={this.state.snackMessage}
            handleActionTouchTap={this.handleRequestSnackClose}
            handleRequestClose={this.handleRequestSnackClose}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({ values: state.form });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(formActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStudent);
