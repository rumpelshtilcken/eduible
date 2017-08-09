import Modal from 'react-modal';
import { Component } from 'react';

import fetch from 'isomorphic-fetch';
import stylesheet from './index.css';
import modalStylesheet from './modal.css';

const validator = require('email-validator');

require('isomorphic-fetch');


class Header extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      email_input: '',
      password_input: '',
      confirmPassword_input: ''
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleClick = () => {
    this.setState({
      showModal: true,
      email_input: '',
      password_input: '',
      confirmPassword_input: ''
    });
  };
  render() {
    return (
      <header><div className="box">
        <div className="logo">
          <img src={'/static/eduible.svg'} alt={'logo'} />
        </div>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className="Modal"
          overlayClassName="OverlayModal"
        >
          <div className="inputBox">
            <h1>SIGN UP</h1>
            <p>EMAIL</p>
            <input ref={el => (this.state.email_input = el)} type="string" name="email" className="input" placeholder="john.doe@example.com" />
            <p>PASSWORD</p>
            <input ref={el => (this.state.password_input = el)} type="string" name="password" className="input" placeholder="at least 8 characters" />
            <p>CONFIRM PASSWORD</p>
            <input ref={el => (this.state.confirmPassword_input = el)} type="string" name="confrimPassword" className="input" />
            <button className="continueButton">CONTINUE</button>
            <p>OR SIGN UP USING</p>
            <button className="facebookButton">FACEBOOK</button>
            <button className="googleButton">GOOGLE</button>
            <p>ALREADY A MEMBER</p>
            <button className="loginButton">Log in here</button>
          </div>
        </Modal>
        <button className="button" onClick={this.handleOpenModal}>SIGN UP</button>
      </div>
      <style jsx>{stylesheet}</style>
      <style jsx global>{modalStylesheet}</style>
      </header>
    );
  }
}

export default Header;