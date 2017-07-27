import Modal from 'react-modal';
import { Component } from 'react';

import fetch from 'isomorphic-fetch';
import stylesheet from './index.css';

const validator = require('email-validator');

require('isomorphic-fetch');

const customStyle = {
  overlay: {
    position: 'fixed',
    top: '0',
    left: 0,
    right: 0,
    bottom: 0
  },
  content: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '0'
  }
};

class Header extends Component {
  state = {
    modalIsOpen: false
  }

  handleClick = () => {
    this.setState({
      modalIsOpen: true,
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
          isOpen={this.state.modalIsOpen}
          style={customStyle}
          contentLabel="Example Modal"
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
        <button className="button" onClick={this.handleClick}>SIGN UP</button>
      </div>
      <style jsx>{stylesheet}</style>
      </header>
    );
  }
}

export default Header;
