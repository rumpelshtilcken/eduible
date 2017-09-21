import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ModalDefault from './ModalDefault';
import ModalSuccess from './ModalSuccess';

// const validator = require('email-validator');

require('isomorphic-fetch');

class SignUpModal extends Component {
  state = {
    showSuccess: false
  };

  handleRequestClose = () => {
    this.setState({ showSuccess: false });
    this.props.onRequestClose();
  }

  handleOpenModal = () =>
    this.setState({ showSuccess: true });

  handleClick = () => this.setState({ showSuccess: true });

  renderModalContent = () => (this.state.showSuccess ?
    <ModalSuccess
      isOpen={this.state.showSuccess}
      onRequestClose={this.handleRequestClose}
    />
    : <ModalDefault
      isOpen={this.props.isModalOpen}
      onRequestClose={this.props.onRequestClose}
      onOpenModal={this.handleOpenModal}
    />);

  render() {
    return (
      <div>
        { this.renderModalContent()}
      </div>
    );
  }
}

SignUpModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default SignUpModal;
