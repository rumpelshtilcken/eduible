import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SignIn } from 'components';
import * as authActions from 'actions/auth';
import * as modalActions from 'actions/modal';

class SignInContainer extends Component {
  handleContinueButtonClick = async ({ email, password }) => {
    this.props.signinUser({ email, password }, this.props.hideModal);
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

SignInContainer.propTypes = {
  signinUser: PropTypes.func.isRequired,
  signinFacebook: PropTypes.func.isRequired,
  signinGoogle: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
