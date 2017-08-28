import { Component } from 'react';

import JoinModal from './JoinModal';

import HeaderModal from './HeaderModal';
import stylesSheet from './index.css';

require('isomorphic-fetch');

class Header extends Component {
  state = {
    isModalOpen: false,
    isOpen: false
  };

  handleRequestClose = () => {
    this.setState({ isOpen: false });
    this.setState({ isModalOpen: false });
  }

  handleSignUpButtonClik = () => this.setState({ isModalOpen: true });

  handleJoinButtonClik = () => this.setState({ isOpen: true });

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
          <JoinModal
            isOpen={this.state.isOpen}
            className="JoinModal"
            overlayClassName="OverlayModal"
            onRequestClose={this.handleRequestClose}
          />
          <button className="buttonJoin" onClick={this.handleJoinButtonClik}>
            JOIN AS PROFESSIONAL
          </button>
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
