import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SignUpProfessional } from 'components';
import * as authActions from 'actions/auth';
import * as formActions from 'actions/form';
import * as modalActions from 'actions/modal';
import * as snackbarActions from 'actions/snackbar';
import ValidationUtils from 'utils/ValidationUtils';

class SignUpProfessionalContainer extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    error: PropTypes.string,
    reset: PropTypes.func.isRequired,
    showSignInModal: PropTypes.func.isRequired,
    showSignUpProfessionalStep2Modal: PropTypes.func.isRequired,
    showSnackbar: PropTypes.func,
    signupProfessional: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const { error, authenticated } = nextProps;
    if (authenticated) this.handleDidSignUp();

    const { error: prevError } = this.props;
    if (!_.isEqual(error, prevError)) {
      this.handleSignUpError(this.props.error);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleContinueButtonClick = () => {
    if (!ValidationUtils.isReduxInputsValid(this.props.values.error)) {
      this.props.showSnackbar({ messageType: 'error', message: 'Invalid inputs' });
      return;
    }
    const params = this.prepareParams();
    this.props.signupProfessional(params);
  };

  handleDidSignUp = () => {
    this.props.reset();
    this.props.showSnackbar({ messageType: 'success', message: 'Success' });
    this.props.showSignUpProfessionalStep2Modal();
  }

  handleSignUpError = error =>
    this.props.showSnackbar({ messageType: 'error', message: error });

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
  const { authenticated, error, loading } = state.auth;
  return {
    authenticated,
    error,
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

