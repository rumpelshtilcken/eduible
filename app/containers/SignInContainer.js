import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SignIn } from 'components';
import * as actions from 'actions/auth';

class SignInContainer extends Component {
  handleContinueButtonClick = async ({ email, password }) => {
    this.props.signinUser({ email, password });
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

export default connect(mapStateToProps, actions)(SignInContainer);
