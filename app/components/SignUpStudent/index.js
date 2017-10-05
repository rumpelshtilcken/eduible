import { Component } from 'react';
import Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

import { MuiSnackbar, MuiButton } from 'components';
import SignInSocialContainer from 'containers/SignInSocialContainer';

import SignUpFormInputs from './SignUpFormInputs';
import style from './index.css';

class SignUpStudent extends Component {
  state = {
    fullname: '',
    date: '',
    email: '',
    password: '',
    isSnackOpen: false,
    snackMessage: 'Good Job'
  };

  handleRequestSnackClose = () => this.setState({ isSnackOpen: false });

  handleChange = ({ name, value }) => this.setState({ [name]: value });

  handleContinueButtonClick = () => {
    this.setState({ isSnackOpen: true });
    this.props.onContinueButtonClick(this.state);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Modal
            isOpen
            onRequestClose={this.props.onRequestClose}
            className="SignUpAsStudent"
            overlayClassName="OverlayModal"
          >

            <div className="container">
              <div>
                <p className="sign">SIGN UP</p>
              </div>
              <div className="container-div">

                <SignUpFormInputs params={this.state} onChange={this.handleChange} />

                <MuiButton
                  className="continuebtn-div"
                  onClick={this.handleContinueButtonClick}
                />
                <div className="signIns">
                  <div className="linkedinbtn-div" >
                    <p>OR SIGN UP USING</p>
                    <SignInSocialContainer renderButtons={['Facebook', 'Google']} />
                  </div>
                  <div className="loginhere-div">
                    <img src="/static/Line.jpg" alt="hrline" />
                    <p>ALREADY A MEMBER?</p>
                    <a className="signUpLink" href="#" >Login here</a>
                  </div>
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

SignUpStudent.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  onContinueButtonClick: PropTypes.func.isRequired
};

export default SignUpStudent;
