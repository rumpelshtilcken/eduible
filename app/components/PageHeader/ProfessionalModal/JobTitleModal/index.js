import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import style from './index.css';

const inpt = [
  {
    title: 'JOB TITLE',
    input: {
      type: 'string',
      name: 'jobtitle',
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

class JobTitleMoModal extends React.Component {
  renderInput = x => (
    <TextField
      type={x.input.type}
      name={x.input.name}
      floatingLabelText={x.title}
      floatingLabelFixed
      fullWidth
      hintText={x.input.hintText}
      errorText={this.props.errorText}
      onBlur={this.props.onChange}
      hintStyle={hintStyle}
      inputStyle={inputStyle}
      floatingLabelStyle={floatingLabelStyle}
    />
  );

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        className="JobTitleModal"
        overlayClassName="OverlayModal"
      >
        <div className="container">
          <div className="head-text">
            <p className="sign">JOIN AS PROFESSIONAL</p>
            <p className="share share2">Share your knowledge and experience. Start now - it’s free</p>
          </div>
          <div className="container-box">
            <div className="box">
              <div>{inpt.map(this.renderInput)}</div>
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
                onClick={this.props.openCodeVerificationModal}
              />
              <div className="share-div">
                <a href="#" className="share">skip this step</a>
              </div>
            </div>
          </div>
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

const floatingLabelStyle = {
  fontSize: '12px',
  color: '#626262'
};

JobTitleMoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  openCodeVerificationModal: PropTypes.func.isRequired
};

export default JobTitleMoModal;
