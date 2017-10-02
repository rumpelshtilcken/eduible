import { Component } from 'react';
import Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

import SignInSocialContainer from 'containers/SignInSocialContainer';

import MuiSnackbar from 'components/Material-ui/MuiSnackbar';
import MuiButton from 'components/Material-ui/MuiButton';
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

  handleChange = x => this.setState({ [x.name]: x.value });

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
            className="SignUpAsProfessional"
            overlayClassName="OverlayModal"
          >
            <div className="container">
              <div>
                <p className="sign">JOIN AS PROFESSIONAL</p>
                <p className="share">Share your knowledge and experience. Start now - it’s free</p>
              </div>
              <div className="container-div">
                <SignUpFormInputs params={this.state} onChange={this.handleChange} />
                <MuiButton
                  className="continuebtn-div"
                  onClick={this.handleContinueButtonClick}
                />
                <div className="linkedinbtn-div" >
                  <p>OR JOIN WITH</p>
                  <SignInSocialContainer renderButtons={['Linkedin']} />
                </div>
                <div className="loginhere-div">
                  <img src="static/Line.jpg" alt="hrline" />
                  <p>ALREADY A MEMBER?</p>
                  <a className="signUpLink" href="#" >Sign Up here</a>
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
        </div>
      </MuiThemeProvider>
    );
  }
}

SignUpProfessional.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  onContinueButtonClick: PropTypes.func.isRequired
};

export default SignUpProfessional;
