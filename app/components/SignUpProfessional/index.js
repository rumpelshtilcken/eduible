import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { MuiButton, MuiSnackbar } from 'components';
import * as formActions from 'actions/form';

import { connect } from 'react-redux';
import { MuiButton, MuiSnackbar } from 'components';
import * as formActions from 'actions/form';

import SignInSocialContainer from 'containers/SignInSocialContainer';
import ValidationUtils from 'utils/ValidationUtils';

import SignUpFormInputs from './SignUpFormInputs';
import stylesheet from './index.css';

class SignUpProfessional extends Component {
  static propTypes = {
    onContinueButtonClick: PropTypes.func.isRequired,
    onLoginButtonClick: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    values: PropTypes.object
  };

  state = {
    snackMessage: 'Good Job',
    isSnackOpen: false
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

  validation = {
    fullname: ValidationUtils.fullnameValidation,
    email: ValidationUtils.emailValidation,
    password: ValidationUtils.passwordValidation
  }

  render() {
    return (
      <MuiThemeProvider>
        <Scrollbars>
          <Modal
            contentLabel={''}
            isOpen
            onRequestClose={this.props.onRequestClose}
            className="signUpProfessionalModal"
            overlayClassName="signUpProfessionalOverlayModal"
          >
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
                />
                <MuiButton
                  className="signUpProfessionalContinueButton"
                  onClick={this.handleContinueButtonClick}
                />
                <div className="signUpProfessionalSocialContainer" >
                  <p>{'Or join with'.toUpperCase()}</p>
                  <SignInSocialContainer renderButtons={['Linkedin']} />
                </div>
                <div className="signUpProfessionalLoginContainer">
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
              <style global jsx>{stylesheet}</style>
            </div>
          </Modal>
          <MuiSnackbar
            isOpen={this.state.isSnackOpen}
            action="UNDO"
            message={this.state.snackMessage}
            handleActionTouchTap={this.handleRequestSnackClose}
            handleRequestClose={this.handleRequestSnackClose}
          />
        </Scrollbars>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({ values: state.form });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(formActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpProfessional);
