import { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import ModalDefault from './ModalDefault';
import ModalSuccess from './ModalSuccess';
import stylessheet from './index.css';

// const validator = require('email-validator');

require('isomorphic-fetch');

class HeaderModal extends Component {
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

  handleOpenModal = () => this.setState({ showSuccess: true });

  handleClick = () => {
    this.setState({
      showSuccess: false,
      email_input: '',
      password_input: '',
      confirmPassword_input: ''
    });
  };

  renderModalContent = () =>
    (this.state.showSuccess ? <ModalSuccess /> : <ModalDefault onOpenModal={this.handleOpenModal} />);

  render() {
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        contentLabel="onRequestClose Example"
        onRequestClose={this.handleRequestClose}
        className="HeaderModal"
        overlayClassName="OverlayModal"
      >
        {this.renderModalContent()}

        <style global>
          {stylessheet}
        </style>
      </Modal>
    );
  }
}

HeaderModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default HeaderModal;
