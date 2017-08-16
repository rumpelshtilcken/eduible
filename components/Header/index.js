import { Component } from 'react';

// import fetch from 'isomorphic-fetch';
import HeaderModal from './HeaderModal';
import stylesSheet from './index.css';

// const validator = require('email-validator');

require('isomorphic-fetch');

class Header extends Component {
  state = {
    isModalOpen: false
  };

  handleRequestClose = () => this.setState({ isModalOpen: false });

  handleSignUpButtonClik = () => console.log('handle') || this.setState({ isModalOpen: true });

  render() {
    return (
      <header>
        <div className="box">
          <div className="logo">
            <img src={'/static/eduible.svg'} alt={'logo'} />
          </div>
          <HeaderModal
            isModalOpen={this.state.isModalOpen}
            className="HeaderModal"
            overlayClassName="OverlayModal"
            onRequestClose={this.handleRequestClose}
          />

          <button className="button" onClick={this.handleSignUpButtonClik}>
            SIGN UP
          </button>
        </div>
        <style jsx>{stylesSheet}</style>
      </header>
    );
  }
}

export default Header;
