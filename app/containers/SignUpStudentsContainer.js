import { bindActionCreators } from 'redux';
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
    const params = {
      name: fullname,
      email,
      password
    };

    if (date) {
      params.birthday = date;
    }

    this.props.signupStudent(
      params,
      () => this.props.hideModal()
    );
  };

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
  signupStudent: PropTypes.func.isRequired,
  hideModal: PropTypes.func
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

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch({ type: 'HIDE_MODAL' }),
  ...bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStudentContainer);
