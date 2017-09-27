import { Component } from 'react';
import PropTypes from 'prop-types';

import { SignIn } from 'components';
import * as actions from 'actions/auth';
import { connect } from 'react-redux';

class SignInContainer extends Component {
  handleContinueButtonClick = async ({ email, password }) => {
    this.props.signinUser({ email, password });
  };

  handleFacebookButtonClick = () => this.props.signinFacebook();

  handleGoogleButtonClick = () => this.props.signinGoogle();

  render() {
    console.log(this.props);
    if (this.props.loading) {
      console.log('Loading state');
    }

    if (this.props.error) {
      console.log('Error state');
    }

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
  signinUser: PropTypes.func.isRequired,
  signinFacebook: PropTypes.func.isRequired,
  signinGoogle: PropTypes.func.isRequired
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
