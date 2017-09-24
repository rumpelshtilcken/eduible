import { Component } from 'react';
import PropTypes from 'prop-types';

import { SignIn } from 'components';
import * as actions from 'actions/auth';
import { connect } from 'react-redux';

class SignInContainer extends Component {
  handleContinueButtonClick = async ({ email, password }) => {
    this.props.signinUser({ email, password }, () => console.log('Success'));
  };

  handleFacebookButtonClick = () => {
    // TODO: facebook login
    this.webAuth.authorize({ connection: 'facebook' });
  };

  handleGoogleButtonClick = () => {
    // TODO: google login
    this.webAuth.authorize({ connection: 'google' });
  };

  render() {
    return (
      <SignIn
        onContinueButtonClick={this.handleContinueButtonClick}
        onFacebookButtonClick={this.handleFacebookButtonClick}
        onGoogleButtonClick={this.handleGoogleButtonClick}
        {...this.props}
      />
    );
  }
}

SignInContainer.propTypes = {
  signinUser: PropTypes.func
};

const mapStateToProps = (state) => {
  const { error, timestamp, forgotMsg, loading } = state.auth;
  return {
    error,
    timestamp,
    forgotMsg,
    loading
  };
};

export default connect(mapStateToProps, actions)(SignInContainer);
