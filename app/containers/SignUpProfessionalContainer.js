import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SignUpProfessional } from 'components';
import * as authActions from 'actions/auth';
import * as modalActions from 'actions/modal';

class SignUpProfessionalContainer extends Component {
  handleContinueButtonClick = ({
    fullname,
    date,
    email,
    password,
    country,
    zipcode
  }) => {
    const params = {
      name: fullname,
      email,
      password
    };

    if (date) {
      params.birthday = date;
    }

    if (country) {
      params.country = country;
    }

    if (zipcode) {
      params.zipcode = zipcode;
    }
    console.log(this.props);
    this.props.signupProfessional(params, this.props.showSignUpProfessionalStep2Modal);
  };

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
  signinLinkedin: PropTypes.func,
  showSignUpProfessionalStep2Modal: PropTypes.func
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
  ...bindActionCreators(authActions, dispatch),
  ...bindActionCreators(modalActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpProfessionalContainer);

