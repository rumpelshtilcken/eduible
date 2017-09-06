import { Component } from 'react';

import SignUpModal from './SignUpModal';
import JoinAsProfessional from './JoinAsProfessional';
import stylesSheet from './index.css';

require('isomorphic-fetch');

class Header extends Component {
  state = {
    isModalOpen: false,
    isJoinAsProfessionalOpen: false
  };

  handleRequestClose = () =>
    this.setState({
      isModalOpen: false,
      isJoinAsProfessionalOpen: false });

  handleSignUpButtonClik = () => this.setState({ isModalOpen: true });

  handleJoinButtonClik = () => this.setState({ isJoinAsProfessionalOpen: true });
  render() {
    return (
      <header>
        <div className="box">
          <div className="logo">
            <img src={'/static/eduible.svg'} alt={'logo'} />
          </div>
          <SignUpModal
            isModalOpen={this.state.isModalOpen}
            onRequestClose={this.handleRequestClose}
          />
          <JoinAsProfessional
            isOpen={this.state.isJoinAsProfessionalOpen}
            onRequestClose={this.handleRequestClose}
          />
          <div className="navbar">
            <div>
              <button className="btn" onClick={this.handleJoinButtonClik}>
            JOIN AS PROFESSIONAL
              </button>
            </div>
            <div>
              <button className="btn" onClick={this.handleSignUpButtonClik}>
            SIGN UP
              </button>
            </div>
            <div>
              <button className="btn" >
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

export default Header;
