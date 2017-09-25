import { Component } from 'react';
import PropTypes from 'prop-types';

import { SignUpProfessional } from 'components';
import * as actions from 'actions/auth';
import { connect } from 'react-redux';

class SignUpProfessionalContainer extends Component {
  /* eslint-disable no-unused-vars */
  handleContinueButtonClick = async ({
    fullname,
    date,
    email,
    password,
    country,
    zipCode
  }) => {
    /* eslint-enable no-unused-vars */
    this.props.signupUser({
      email,
      password
    }, () =>
      this.props.signinUser({ email, password })
    );
  };

  handleLinkedinButtonClick = () => {};

  handleLoginButtonClick = () => {
    // TODO: open Login modal
  };

  render() {
    return (
      <SignUpProfessional
        onContinueButtonClick={this.handleContinueButtonClick}
        onLinkedinButtonClick={this.handleLinkedinButtonClick}
        onLoginButtonClick={this.handleLoginButtonClick}
        {...this.props}
      />
    );
  }
}

SignUpProfessionalContainer.propTypes = {
  signinUser: PropTypes.func,
  signupUser: PropTypes.func
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

export default connect(mapStateToProps, actions)(SignUpProfessionalContainer);

