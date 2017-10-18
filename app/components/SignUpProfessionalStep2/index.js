import { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import { AuthForm, MuiButton, StatefulView } from 'components';

import style from './index.css';

class SignUpProfessionalStep2Modal extends Component {
  inputs = [
    {
      params: {
        title: 'JOB TITLE',
        type: 'string',
        name: 'jobTitle',
        placeholder: 'IT developer'
      }
    },
    {
      params: {
        title: 'COMPANY',
        type: 'string',
        name: 'company',
        placeholder: 'Facebook'
      }
    }
  ]

  render() {
    return (
      <Modal
        contentLabel={''}
        isOpen
        onRequestClose={this.props.onRequestClose}
        className="SignupPropfessionalStep2Modal"
        overlayClassName="OverlayModal"
      >
        <StatefulView {...this.props}>
          <div className="container">
            <div className="head-text">
              <p className="sign">JOIN AS PROFESSIONAL</p>
              <p className="share share2">Share your knowledge and experience. Start now - it’s free</p>
            </div>
            <div className="container-box">
              <div className="box">

                <AuthForm inputs={this.inputs} onContinueButtonClick={this.props.onContinueButtonClick} />
                <div className="p-box">
                  <p className="share provide">Providing your job title and company name will help users find you on Eduible</p>
                </div>
              </div>
              <div className="box2">
                <MuiButton
                  label="Continue"
                  onClick={this.props.onContinueButtonClick}
                />
                <div className="share-div">
                  <button className="share" onClick={this.props.onSkip}>{'skip this step'}</button>
                </div>
              </div>
            </div>
          </div>
        </StatefulView>
        <style global jsx>{style}</style>
      </Modal>
    );
  }
}

SignUpProfessionalStep2Modal.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  onContinueButtonClick: PropTypes.func,
  onSkip: PropTypes.func
};

export default SignUpProfessionalStep2Modal;
