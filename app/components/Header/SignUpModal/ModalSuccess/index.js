import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import style from './index.css';

class CodeVerificationModal extends React.Component {
  state = {
    type: 'string',
    name: 'code',
    hintText: 'A365GBK23'
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        className="ModalSuccess"
        overlayClassName="OverlayModal"
      >
        <div className="container">
          <div className="head-text">
            <div className="sign">
              <p>SIGN UP</p>
            </div>
            <p className="share">A verification code has been send to your email address.</p>
            <p className="share">
              Please enter the code below to verify your email and finish the registration process
            </p>
          </div>
          <div className="box">
            <TextField
              type={this.state.type}
              name={this.state.name}
              fullWidth
              hintText={this.state.hintText}
              hintStyle={hintStyle}
              inputStyle={inputStyle}
            />
            <div>
              <p className="pcode">Did not receive the code? send again</p>
            </div>
          </div>
          <RaisedButton
            label="Continue"
            buttonStyle={{ backgroundColor: '#7262BF', fullWidth: true }}
            labelStyle={{ color: 'white', fontSize: '11px' }}
          />
          <p className="term">
            By creating an account, you agree to{' '}
            <a href="#" className="edterms">
              Eduibles Terms and Conditions and Privacy Policy
            </a>
          </p>
          <style global>{style}</style>
        </div>
      </Modal>
    );
  }
}

const inputStyle = {
  fontSize: '11px'
};

const hintStyle = {
  fontSize: '11px'
};

CodeVerificationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default CodeVerificationModal;
