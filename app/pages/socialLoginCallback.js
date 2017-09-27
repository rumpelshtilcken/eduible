import { Component } from 'react';
import PropTypes from 'prop-types';

import * as actions from 'actions/auth';
import { connect } from 'react-redux';
import withData from 'lib/withData';

class SocialLoginCallback extends Component {
  componentDidMount() {
    const hash = window.location.hash;
    this.props.socialSignInCallback(hash);
  }

  render() {
    console.log(
      this.props
    );
    if (this.props.loading) {
      return (
        <div>
          {'Loading'}
        </div>);
    }
    /* eslint-disable */
    if (this.props.error) {
      return (
        <div>
          {'Error'}
        </div>);
    }
    /* eslint-enable */
    return (
      <div>
        {'Thank you for sign up, please close the window'}
      </div>
    );
  }
}

SocialLoginCallback.propTypes = {
  socialSignInCallback: PropTypes.func.isRequired,
  loading: PropTypes.bool
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

export default withData(connect(mapStateToProps, actions)(SocialLoginCallback));
