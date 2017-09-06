import { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import ModalFirst from './ModalFirst';
import stylessheet from './index.css';

// const validator = require('email-validator');

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
    }

    handleOpenModal = () =>
      this.setState({ showSuccess: true });

    render() {
      return (
        <Modal
          isOpen={this.props.isModalJoinOpen}
          onRequestClose={this.handleRequestClose}
          className="JoinModal"
          overlayClassName="OverlayModal"
        >
          <ModalFirst />
          <style global>{stylessheet}</style>
        </Modal>
      );
    }
}

JoinModal.propTypes = {
  isModalJoinOpen: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  overlayClassName: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default JoinModal;
