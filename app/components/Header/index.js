import { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SignUpModal from './SignUpModal';
import ProfessionalModal from './ProfessionalModal';
import stylesSheet from './index.css';

require('isomorphic-fetch');

class Header extends Component {
  state = {
    isModalOpen: false,
    isProfessionalOpen: false
  };

  handleRequestClose = () =>
    this.setState({
      isModalOpen: false,
      isProfessionalOpen: false });

  handleSignUpButtonClik = () => this.setState({ isModalOpen: true });

  handleJoinButtonClik = () => this.setState({ isProfessionalOpen: true });
  render() {
    return (
      <MuiThemeProvider>
        <header>
          <div className="box">
            <div className="logo">
              <img src={'/static/eduible.svg'} alt={'logo'} />
            </div>
            <SignUpModal
              isModalOpen={this.state.isModalOpen}
              onRequestClose={this.handleRequestClose}
            />
            <ProfessionalModal
              isOpen={this.state.isProfessionalOpen}
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
      </MuiThemeProvider>
    );
  }
}
Header.propTypes = {
  headerLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      link: PropTypes.string
    })
  )

};
export default Header;
