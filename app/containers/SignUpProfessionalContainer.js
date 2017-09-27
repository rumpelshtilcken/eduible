import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SignUpProfessional } from 'components';
import * as actions from 'actions/auth';


class SignUpProfessionalContainer extends Component {
  handleContinueButtonClick = async ({
    fullname,
    date,
    email,
    password,
    country,
    zipcode
  }) => {
    this.props.signupProfessional({
      name: fullname,
      birthday: date,
      email,
      password,
      country,
      zipcode
    });
  };

  handleLinkedinButtonClick = () => this.props.signinLinkedin();

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
  signupProfessional: PropTypes.func,
  signinLinkedin: PropTypes.func
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

