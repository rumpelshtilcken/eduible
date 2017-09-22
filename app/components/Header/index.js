import { Component } from 'react';
import cx from 'classnames';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

import SignUpModal from './SignUpModal';
import ProfessionalModal from './ProfessionalModal';
import stylesSheet from './index.css';

require('isomorphic-fetch');

class Header extends Component {
  state = {
    isModalOpen: false,
    isProfessionalOpen: false,
    userName: 'Ann',
    burgerMenu: false
  };

  handleRequestClose = () =>
    this.setState({
      isModalOpen: false,
      isProfessionalOpen: false
    });

  handleSignUpButtonClik = () => this.setState({ isModalOpen: true });
  handleJoinButtonClik = () => this.setState({ isProfessionalOpen: true });

  handleBurgerMenuClick = () => {
    if (!this.state.burgerMenu) {
      this.menuRef.style.transform = 'perspective(800px) rotateX(0deg)';
    } else {
      this.menuRef.style.transform = 'perspective(800px) rotateX(-90deg)';
    }
    this.setState({ menu: !this.state.menu });
  };

  render() {
    /* eslint-disable */
    const { links } = this.props;
    return (
      <MuiThemeProvider>
        <header>
          <div className="box">
            <div className="logo">
              <img src={'static/Icons/logoColored.svg'} alt={'logo'} />
            </div>
            <div className="menu">
              <button className="burgerButton" onClick={this.handleMenuClick}>
                <img
                  className={cx('menu', {
                    menuIcon: !this.state.menu,
                    closeIcon: this.state.menu
                  })}
                  alt={'menu'}
                />
              </button>
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
                <button className="btn">LOGIN</button>
              </div>
            </div>
            <ul ref={ref => (this.menuRef = ref)} className="menuContainer">
              {links.map(item => (
                <li key={item.label} className="linkContainer">
                  {' '}
                  <a className="link" href={item.link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="nickname">Hi, {this.state.nickname}!</div>
          </div>
          <style jsx>{stylesSheet}</style>
        </header>
      </MuiThemeProvider>
    );
  }
}

Header.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Header;
