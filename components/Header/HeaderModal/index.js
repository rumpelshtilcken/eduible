import { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import ModalDefault from './ModalDefault';
import ModalSuccess from './ModalSuccess';

// const validator = require('email-validator');

require('isomorphic-fetch');

class HeaderModal extends Component {
    state = {
      showSuccess: true,
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

    handleClick = () => {
      this.setState({
        showSuccess: true,
        email_input: '',
        password_input: '',
        confirmPassword_input: ''
      });
    };

  renderModalContent = () => (this.state.showSuccess ?
    <ModalSuccess />
    : <ModalDefault onOpenModal={this.handleOpenModal} />);

  render() {
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        contentLabel="onRequestClose Example"
        onRequestClose={this.handleRequestClose}
        className={this.props.className}
        overlayClassName={this.props.overlayClassName}
      >
        {this.renderModalContent()}
      </Modal>
    );
  }
}

HeaderModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  overlayClassName: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default HeaderModal;
