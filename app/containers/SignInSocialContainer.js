import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SignInSocial } from 'components';
import * as actions from 'actions/auth';

class SignInSocialContainer extends Component {
  handleFacebookButtonClick = () => this.props.signinFacebook();

  handleGoogleButtonClick = () => this.props.signinGoogle();

  handleLinkedinButtonClick = () => this.props.signinLinkedin();

  render() {
    return (
      <SignInSocial
        renderButtons={this.props.renderButtons}
        onFacebookButtonClick={this.handleFacebookButtonClick}
        onGoogleButtonClick={this.handleGoogleButtonClick}
        onLinkedinButtonClick={this.handleLinkedinButtonClick}
      />
    );
  }
}

SignInSocialContainer.propTypes = {
  renderButtons: PropTypes.arrayOf(PropTypes.string).isRequired,
  signinFacebook: PropTypes.func,
  signinGoogle: PropTypes.func,
  signinLinkedin: PropTypes.func
};

export default connect(null, actions)(SignInSocialContainer);
