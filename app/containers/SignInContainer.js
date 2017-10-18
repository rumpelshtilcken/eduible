import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { SignIn } from 'components';
import ValidationUtils from 'utils/ValidationUtils';
import * as authActions from 'actions/auth';
import * as formActions from 'actions/form';
import * as modalActions from 'actions/modal';
import * as snackbarActions from 'actions/snackbar';

class SignInContainer extends Component {
  static propTypes = {
    signinUser: PropTypes.func.isRequired,
    validation: PropTypes.object,
    inputs: PropTypes.arrayOf(PropTypes.object),
    signinFacebook: PropTypes.func.isRequired,
    signinGoogle: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
    authenticated: PropTypes.bool,
    error: PropTypes.string,
    showSnackbar: PropTypes.func.isRequired,
    showSignUpProfessionalModal: PropTypes.func.isRequired,
    showSignUpStudentModal: PropTypes.func.isRequired
  };

  state = {
    isSnackOpen: false
  }


  componentWillReceiveProps(nextProps) {
    const { error, authenticated } = nextProps;
    if (authenticated) this.handleDidSignIn();

    const { error: prevError } = this.props;
    if (!_.isEqual(error, prevError)) {
      this.handleSignInError(this.props.error);
    }
  }
  componentWillUnmount() {
    this.props.reset();
  }

  handleDidSignIn = () => {
    this.props.reset();
    this.props.showSnackbar({ messageType: 'success', message: 'Success' });
    this.props.hideModal();
  }

  handleContinueButtonClick = () => {
    if (!ValidationUtils.isReduxInputsValid(this.props.values.error)) {
      this.props.showSnackbar({ messageType: 'error', message: 'Invalid inputs' });
      return;
    }
    const params = this.prepareParams();
    this.props.signinUser(params, () => {});
  };

  handleRequestSnackClose = () => this.setState({ isSnackOpen: false });

  handleSignInError = error =>
    this.props.showSnackbar({ messageType: 'error', message: error });

  prepareParams = () => {
    const values = _.omit(this.props.values, ['error']);
    const params = Object.keys(values).reduce((acc, key) => {
      const value = this.props.values[key];
      return value
        ? { ...acc, [key]: value }
        : acc;
    }, {});
    return params;
  };

  validation = {
    email: ValidationUtils.emailValidation,
    password: ValidationUtils.passwordValidation
  }
  inputs = [
    {
      params: {
        title: 'EMAIL',
        name: 'email',
        type: 'email',
        validation: this.validation.email,
        placeholder: 'john@mail.com'
      }
    },
    {
      params: {
        title: 'PASSWORD',
        name: 'password',
        type: 'password',
        validation: this.validation.password,
        placeholder: 'at least six characters'
      }
    }
  ]


  render() {
    return (
      <SignIn
        {...this.props}
        onContinueButtonClick={this.handleContinueButtonClick}
        onSignUpStudentButtonClick={this.props.showSignUpStudentModal}
        onSignUpProfessionalButtonClick={this.props.showSignUpProfessionalModal}
        inputs={this.inputs}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { error, timestamp, forgotMsg, loading, authenticated } = state.auth;
  return {
    authenticated,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
