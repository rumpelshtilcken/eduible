import { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import ModalFirst from './ModalFirst';
import ModalSecond from './ModalSecond';
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

    handleClick = () => {
      this.setState({
        showSuccess: true,
        email_input: '',
        password_input: '',
        confirmPassword_input: ''
      });
    };

  renderModalContent = () => (this.state.showSuccess ?
    <ModalSecond />
    : <ModalFirst onOpenJoinModal={this.handleOpenModal} />);

  render() {
    console.log(this.state.showSuccess);
    return (
      <Modal
        isOpen={this.props.isModalJoinOpen}
        contentLabel="onRequestClose Example"
        onRequestClose={this.handleRequestClose}
        className="JoinModal"
        overlayClassName="OverlayModal"
      >
        {this.renderModalContent()}

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
