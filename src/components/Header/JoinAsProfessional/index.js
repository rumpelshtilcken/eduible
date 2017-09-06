import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SignUpAsProfessional from './SignUpAsProfessional';
import JobTitleModal from './JobTitleModal';
import CodeVerificationModal from './CodeVerificationModal';


class JoinAsProfessional extends Component {
  state = {
    isJobTitleModalLive: false,
    isCodeVerificationModalLive: false
  }

  handleJobTitleModal = () => {
    this.props.onRequestClose();
    this.setState({ isJobTitleModalLive: true });
  }

  handleJobTitleModalClose = () => this.setState({ isJobTitleModalLive: false });

  handleCodeVerificationModal= () => {
    this.handleJobTitleModalClose();
    this.setState({ isCodeVerificationModalLive: true });
  }

  handleCodeVerificationModalClose= () => this.setState({ isCodeVerificationModalLive: false });

  render() {
    return (
      <div>
        <SignUpAsProfessional
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
          openJobTitleModal={this.handleJobTitleModal}
        />
        <JobTitleModal
          isOpen={this.state.isJobTitleModalLive}
          onRequestClose={this.handleJobTitleModalClose}
          openCodeVerificationModal={this.handleCodeVerificationModal}
        />
        <CodeVerificationModal
          isOpen={this.state.isCodeVerificationModalLive}
          onRequestClose={this.handleCodeVerificationModalClose}
        />
      </div>);
  }
}

JoinAsProfessional.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default JoinAsProfessional;
