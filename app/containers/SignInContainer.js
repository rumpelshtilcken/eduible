import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { SignIn } from 'components';
import * as authActions from 'actions/auth';
import * as formActions from 'actions/form';
import * as modalActions from 'actions/modal';

class SignInContainer extends Component {
  static propTypes = {
    signinUser: PropTypes.func.isRequired,
    signinFacebook: PropTypes.func.isRequired,
    signinGoogle: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
    authenticated: PropTypes.bool
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleContinueButtonClick = () => {
    const params = this.prepareParams();
    this.props.signinUser(params, this.handleDidSignIn);
  };

  handleDidSignIn = () => {
    if (this.props.authenticated) {
      this.props.reset();
      this.props.hideModal();
    }
  }

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

  render() {
    /* eslint-disable */
    if (this.props.loading) {
      console.log('Loading state');
    }

    if (this.props.error) {
      console.log('Error state');
    }
    /* eslint-enable */

    return (
      <SignIn
        onContinueButtonClick={this.handleContinueButtonClick}
        {...this.props}
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
  ...bindActionCreators(modalActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
