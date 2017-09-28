import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import style from './index.css';

class SignUpProfessionalStep2Modal extends React.Component {
  state = {
    jobTitle: '',
    company: ''
  };

  inpt = [
    {
      title: 'JOB TITLE',
      input: {
        type: 'string',
        name: 'jobTitle',
        className: 'input',
        hintText: 'IT developer'
      }
    },
    {
      title: 'COMPANY',
      input: {
        type: 'string',
        name: 'company',
        className: 'input',
        hintText: 'Facebook'
      }
    }
  ];

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleContinueButtonClick = () => this.props.onContinueButtonClick(this.state);

  renderInput = x => (
    <TextField
      key={x.title}
      type={x.input.type}
      name={x.input.name}
      floatingLabelText={x.title}
      floatingLabelFixed
      fullWidth
      hintText={x.input.hintText}
      hintStyle={hintStyle}
      inputStyle={inputStyle}
      floatingLabelStyle={floatingLabelStyle}
      onChange={this.handleChange}
    />
  );

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Modal
            isOpen={this.props.isOpen}
            onRequestClose={this.props.onRequestClose}
            className="SignupPropfessionalStep2Modal"
            overlayClassName="OverlayModal"
          >
            <div className="container">
              <div className="head-text">
                <p className="sign">JOIN AS PROFESSIONAL</p>
                <p className="share share2">Share your knowledge and experience. Start now - it’s free</p>
              </div>
              <div className="container-box">
                <div className="box">
                  <div>{this.inpt.map(this.renderInput)}</div>
                  <div className="p-box">
                    <p className="share provide">Providing your job title and company name will help users find you on Eduible</p>
                  </div>
                </div>
                <div className="box2">
                  <RaisedButton
                    label="Continue"
                    className="btn"
                    buttonStyle={{ backgroundColor: '#7262BF', fullWidth: true }}
                    labelStyle={{ color: 'white', fontSize: '11px' }}
                    onClick={this.handleContinueButtonClick}
                  />
                  <div className="share-div">
                    <button className="share" onClick={this.props.onSkip}>{'skip this step'}</button>
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

const inputStyle = {
  fontSize: '11px'
};

const hintStyle = {
  fontSize: '11px'
};

const floatingLabelStyle = {
  fontSize: '12px',
  color: '#626262'
};

SignUpProfessionalStep2Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default SignUpProfessionalStep2Modal;
