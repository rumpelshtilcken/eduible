import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { SignUpProfessional } from 'components';
import * as snackbarActions from 'actions/snackbar';
import * as authActions from 'actions/auth';
import * as modalActions from 'actions/modal';
import * as formActions from 'actions/form';

class SignUpProfessionalContainer extends Component {
  static propTypes = {
    reset: PropTypes.func.isRequired,
    showSignInModal: PropTypes.func.isRequired,
    showSignUpProfessionalStep2Modal: PropTypes.func.isRequired,
    showSnackbar: PropTypes.func,
    signupProfessional: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleContinueButtonClick = () => {
    if (!this.isInputsValid()) {
      this.props.showSnackbar({ messageType: 'error', message: 'Invalid inputs' });
      return;
    }
    const params = this.prepareParams();
    this.props.signupProfessional(params, this.handleDidSignUp);
  };

  isInputsValid = () =>
    Object.keys(this.props.values.error).reduce((acc, key) =>
      (acc && !this.props.values.error[key]), true);

  handleDidSignUp = () => {
    this.props.reset();
    this.props.showSnackbar({ messageType: 'success', message: 'Success' });
    this.props.showSignUpProfessionalStep2Modal();
  }

  prepareParams = () => {
    const values = _.omit(this.props.values, ['error']);

    const params = Object.keys(values).reduce((acc, key) => {
      let gKey;
      const value = this.props.values[key];
      switch (key) {
        case 'fullname':
          gKey = 'name';
          break;
        case 'date':
          gKey = 'birthday';
          break;
        default:
          gKey = key;
      }

      return value
        ? { ...acc, [gKey]: value }
        : acc;
    }, {});

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
    loading,
    values: state.form
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authActions, dispatch),
  ...bindActionCreators(formActions, dispatch),
  ...bindActionCreators(modalActions, dispatch),
  ...bindActionCreators(snackbarActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpProfessionalContainer);

