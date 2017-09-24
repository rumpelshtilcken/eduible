import { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

import { ResponsiveMenu } from 'components';

import stylesSheet from './index.css';

class PageHeader extends Component {
  state = {
    isModalOpen: false,
    isProfessionalOpen: false
  };

  handleLoginButtonClick = () => {};
  handleSignUpProfessionalClick = () =>
    this.props.onOpenModal({ modalType: 'SIGN_UP_PROFESSIONALS' });
  handleSignUpButtonClik = () =>
    this.props.onOpenModal({ modalType: 'SIGN_UP_STUDENTS' });

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

        <style jsx>{stylesSheet}</style>
        </div>
      </MuiThemeProvider>
    );
  }
}

PageHeader.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOpenModal: PropTypes.func
};

export default PageHeader;
