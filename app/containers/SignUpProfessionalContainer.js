import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SignUpProfessional } from 'components';
import * as authActions from 'actions/auth';
import * as modalActions from 'actions/modal';

class SignUpProfessionalContainer extends Component {
  static propTypes = {
    showSignInModal: PropTypes.func.isRequired,
    showSignUpProfessionalStep2Modal: PropTypes.func.isRequired,
    signupProfessional: PropTypes.func.isRequired
  };

  handleContinueButtonClick = (props) => {
    const params = this.prepareParams(props);

    this.props.signupProfessional(params, this.props.showSignUpProfessionalStep2Modal);
  };

  prepareParams = ({
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

    return params;
  };

  render() {
    return (
      <SignUpProfessional
        onContinueButtonClick={this.handleContinueButtonClick}
        onLoginButtonClick={this.props.showSignInModal}
        {...this.props}
      />
    );
  }
}

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

