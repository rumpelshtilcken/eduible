import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SignUpStudent } from 'components';
import * as actions from 'actions/auth';


class SignUpStudentContainer extends Component {
  handleContinueButtonClick = async ({
    fullname,
    date,
    email,
    password
  }) => {
    this.props.signupStudent({
      name: fullname,
      birthday: date,
      email,
      password
    });
  };

  handleFacebookButtonClick = () => {};

  handleGoogleButtonClick = () => {};

  handleLoginButtonClick = () => {
    // TODO: open Login modal
  };

  render() {
    return (
      <SignUpStudent
        onContinueButtonClick={this.handleContinueButtonClick}
        onGoogleButtonClick={this.handleGoogleButtonClick}
        onFacebookButtonClick={this.handleFacebookButtonClick}
        onLoginButtonClick={this.handleLoginButtonClick}
        {...this.props}
      />
    );
  }
}

SignUpStudentContainer.propTypes = {
  signupStudent: PropTypes.func.isRequired
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

export default connect(mapStateToProps, actions)(SignUpStudentContainer);
