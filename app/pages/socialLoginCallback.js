import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import * as authActions from 'actions/auth';
import * as modalActions from 'actions/modal';
import withData from 'hoc/withData';

class SocialLoginCallback extends Component {
  static propTypes = {
    socialSignInCallback: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    authenticated: PropTypes.bool,
    error: PropTypes.string,
    hideModal: PropTypes.func
  };

  componentDidMount() {
    const hash = window.location.hash;
    this.props.socialSignInCallback(hash);
  }

  render() {
    if (this.props.authenticated) {
      this.props.hideModal();
      Router.push({ pathname: '/' });
    }

    if (this.props.loading) {
      return (
        <div>
          {'Loading'}
        </div>);
    }
    if (this.props.error) {
      return (
        <div>
          {`Error: ${this.props.error}`}
        </div>);
    }
    return (
      <div>
        {'App will redirect'}
      </div>
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
    loading
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authActions, dispatch),
  ...bindActionCreators(modalActions, dispatch)
});

export default withData(connect(mapStateToProps, mapDispatchToProps)(SocialLoginCallback));
