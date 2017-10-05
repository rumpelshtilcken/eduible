import { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

import { MuiButton, MuiSnackbar } from 'components';
import SignInSocialContainer from 'containers/SignInSocialContainer';
import ValidationUtils from 'utils/ValidationUtils';

import SignUpFormInputs from './SignUpFormInputs';
import style from './index.css';

class SignUpProfessional extends Component {
  state = {
    fullname: '',
    date: '',
    email: '',
    password: '',
    country: '',
    zipcode: '',
    snackMessage: 'Good Job',
    isSnackOpen: false
  };

  handleRequestSnackClose = () => this.setState({ isSnackOpen: false });

  handleChange = (event, date) => (date
    ? this.setState({ date })
    : this.setState({ [event.target.name]: event.target.value }));


  handleContinueButtonClick = () => {
    // TODO: check is valid all inputs
    // this.props.onContinueButtonClick(this.state);
  }

  validation = {
    fullname: fullname =>
      !ValidationUtils.isValidName(fullname)
    &&
    'First name and last name must be uppercased',
    email: email =>
      !ValidationUtils.isValidEmail(email)
    &&
    'Email not valid',
    password: password =>
      !ValidationUtils.isValidPassword(password)
    &&
    'Password must be more than 6 character'
  }

  render() {
    return (
      <MuiThemeProvider>
        <Scrollbars autohide>
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
                  params={this.state}
                  onChange={this.handleChange}
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
              <style global jsx>{style}</style>
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

SignUpProfessional.propTypes = {
  onContinueButtonClick: PropTypes.func.isRequired,
  onLoginButtonClick: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default SignUpProfessional;
