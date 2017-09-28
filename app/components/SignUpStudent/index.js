import { Component } from 'react';
import Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import SignUpFormInputs from './SignUpFormInputs';
import SignInSocialContainer from '../SignInSocial';
import style from './index.css';

class SignUpStudent extends Component {
  state = {
    fullname: '',
    date: '',
    email: '',
    password: ''
  };

  handleChange = ({ name, value }) => this.setState({ [name]: value });

  handleContinueButtonClick = () => this.props.onContinueButtonClick(this.state);

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

                <RaisedButton
                  label="Continue"
                  className="continuebtn-div"
                  buttonStyle={{ backgroundColor: '#7262BF', fullWidth: true }}
                  labelStyle={{ color: 'white', fontSize: '11px' }}
                  onClick={this.handleContinueButtonClick}
                />
                <div className="signIns">
                  <SignInSocialContainer renderButtons={['Facebook', 'Google', 'Linkedin']} />

                  <div className="loginhere-div">
                    <img className="line" src="/static/Line.jpg" alt="hrline" />
                    <p>ALREADY A MEMBER?</p>
                    <a className="signUpLink" href="#" >Login here</a>
                  </div>
                </div>
              </div>
              <style global jsx>{style}</style>
            </div>
          </Modal>
        </div>
      </MuiThemeProvider>
    );
  }
}

SignUpStudent.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  onContinueButtonClick: PropTypes.func.isRequired,
  onLoginButtonClick: PropTypes.func.isRequired,
  onGoogleButtonClick: PropTypes.func.isRequired,
  onFacebookButtonClick: PropTypes.func.isRequired
};

export default SignUpStudent;
