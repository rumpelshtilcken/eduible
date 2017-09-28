import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import * as actions from 'actions/auth';
import withData from 'hoc/withData';

class SocialLoginCallback extends Component {
  componentDidMount() {
    const hash = window.location.hash;
    this.props.socialSignInCallback(hash);
  }

  componentWillUpdate(nextProps) {
    const { authenticated } = nextProps;
    if (authenticated) {
      Router.push({ pathname: '/' });
    }
  }

  render() {
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
        {'App will redirect'}
      </div>
    );
  }
}

SocialLoginCallback.propTypes = {
  socialSignInCallback: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = (state) => {
  const { error, timestamp, forgotMsg, loading, authenticated } = state.auth;
  return {
    authenticated,
    error,
    timestamp,
    forgotMsg,
    loading
  };
};

export default withData(connect(mapStateToProps, actions)(SocialLoginCallback));
