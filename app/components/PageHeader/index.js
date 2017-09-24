import { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

import { ResponsiveMenu } from 'components';

import SignUpModal from './SignUpModal';
import ProfessionalModal from './ProfessionalModal';
import stylesSheet from './index.css';

class PageHeader extends Component {
  state = {
    isModalOpen: false,
    isProfessionalOpen: false
  };

  handleLoginButtonClick = () => {};
  handleSignUpProfessionalClick = () => this.setState({ isProfessionalOpen: true });
  handleSignUpButtonClik = () => this.setState({ isModalOpen: true });

  headerButtons = [
    { title: 'Join as professional', onClick: this.handleSignUpProfessionalClick },
    { title: 'Sign up', onClick: this.handleSignUpButtonClik },
    { title: 'Login', onClick: this.handleLoginButtonClick }
  ];

  handleRequestClose = () =>
    this.setState({
      isModalOpen: false,
      isProfessionalOpen: false
    });

  render() {
    /* eslint-disable */
    return (
      <MuiThemeProvider>
        <div>
          <div className="headerContainer">
            <div className="logo">
              <img src={'static/Icons/logoColored.svg'} alt={'logo'} />
            </div>
            <ResponsiveMenu buttons={this.headerButtons}/>
          </div>

          <SignUpModal
            isModalOpen={this.state.isModalOpen}
            onRequestClose={this.handleRequestClose}
          />
          <ProfessionalModal
            isOpen={this.state.isProfessionalOpen}
            onRequestClose={this.handleRequestClose}
          />
        <style jsx>{stylesSheet}</style>
        </div>
      </MuiThemeProvider>
    );
  }
}

PageHeader.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default PageHeader;
