import { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import ModalFirst from './ModalFirst';

require('isomorphic-fetch');

class JoinModal extends Component {
  state = {
    showSuccess: false,
    emailInput: '',
    passwordInput: '',
    confirmPasswordInput: ''
  };

  handleRequestClose = () => {
    this.setState({ showSuccess: false });
    this.props.onRequestClose();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isModalJoinOpen}
        onRequestClose={this.handleRequestClose}
        className="JoinModal"
        overlayClassName="OverlayModal"
      >
        <ModalFirst />
      </Modal>
    );
  }
}

JoinModal.propTypes = {
  isModalJoinOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default JoinModal;
