import { Component } from 'react';
import Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import SignUpFormInputs from './SignUpFormInputs';
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
            className="SignUpAsProfessional"
            overlayClassName="OverlayModal"
          >

            <div className="container">
              <div>
                <p className="sign">{'Sign up'.toUpperCase()}</p>
                <p className="share">Share your knowledge and experience. Start now - it’s free</p>
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
                <div className="linkedinbtn-div" >
                  <p>OR JOIN WITH</p>
                  <RaisedButton
                    label="FACEBOOK"
                    fullWidth
                    buttonStyle={{ backgroundColor: '#6981CA' }}
                    labelStyle={{
                      color: 'white',
                      fontSize: '11px',
                      fontFamily: 'Effra'
                    }}
                    onClick={this.props.onFacebookButtonClick}
                  />
                  <RaisedButton
                    label="GOOGLE"
                    fullWidth
                    buttonStyle={{ backgroundColor: '#CB5541' }}
                    labelStyle={{
                      color: 'white',
                      fontSize: '11px',
                      fontFamily: 'Effra'
                    }}
                    onClick={this.props.onGoogleButtonClick}
                  />
                </div>
                <div className="loginhere-div">
                  <img src="/static/Line.jpg" alt="hrline" />
                  <p>ALREADY A MEMBER?</p>
                  <button onClick={this.props.onLoginButtonClick}>Login here</button>
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
