import { Component } from 'react';
import PropTypes from 'prop-types';

import HeaderModal from './HeaderModal';
import JoinModal from './JoinModal';
import stylesSheet from './index.css';

require('isomorphic-fetch');

class Header extends Component {
  state = {
    isModalOpen: false,
    isJoinModalOpen: false
  };

  handleRequestClose = () =>
    this.setState({
      isModalOpen: false,
      isJoinModalOpen: false });

  handleSignUpButtonClik = () => this.setState({ isModalOpen: true });

  handleJoinButtonClik = () => this.setState({ isJoinModalOpen: true });

  render() {
    return (
      <header>
        <div className="box">
          <div className="logo">
            <img src={'/static/eduible.svg'} alt={'logo'} />
          </div>
          <HeaderModal
            isModalOpen={this.state.isModalOpen}
            onRequestClose={this.handleRequestClose}
          />
          <JoinModal
            isOpen={this.state.isJoinModalOpen}
            onRequestClose={this.handleRequestClose}
          />
          <div className="navbar">
            <div>
              <button className="button" onClick={this.handleJoinButtonClik}>
            JOIN AS PROFESSIONAL
              </button>
            </div>
            <div>
              <button className="button" onClick={this.handleSignUpButtonClik}>
            SIGN UP
              </button>
            </div>
            <div>
              <button className="button" >
            LOGIN
              </button>
            </div>
          </div>
        </div>
        <style jsx>{stylesSheet}</style>
      </header>
    );
  }
}

Header.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default Header;
