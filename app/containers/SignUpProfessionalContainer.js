import { Component } from 'react';
import PropTypes from 'prop-types';

import { SignUpProfessional } from 'components';
import * as actions from 'actions/auth';
import { connect } from 'react-redux';

class SignUpProfessionalContainer extends Component {
  handleContinueButtonClick = async ({
    fullname,
    date,
    email,
    password,
    country,
    zipCode
  }) => {
    this.props.signupProfessional({
      name: fullname,
      birthdate: date,
      email,
      password,
      country,
      zipCode
    });
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
  signupProfessional: PropTypes.func
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

