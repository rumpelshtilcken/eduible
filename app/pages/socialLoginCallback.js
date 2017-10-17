import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { StatefulView } from 'components';
import * as authActions from 'actions/auth';
import * as modalActions from 'actions/modal';
import withData from 'hoc/withData';

class SocialLoginCallback extends Component {
  static propTypes = {
    socialSignInCallback: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    authenticated: PropTypes.bool,
    error: PropTypes.string,
    hideModal: PropTypes.func,
    modalType: PropTypes.string,
    showSignUpProfessionalStep2Modal: PropTypes.func
  };

  componentDidMount() {
    const hash = window.location.hash;
    this.props.socialSignInCallback(hash);
  }

  componentWillReceiveProps(nextProps) {
    const { authenticated } = nextProps;
    if (authenticated && authenticated !== this.props.authenticated) {
      this.handleAutheticated();
    }
  }

  handleAutheticated = () => {
    if (this.props.modalType === 'SIGN_UP_PROFESSIONAL') {
      this.props.showSignUpProfessionalStep2Modal();
    } else {
      this.props.hideModal();
    }

    Router.push({ pathname: '/' });
  };

  render() {
    if (this.props.error) {
      return (
        <div>
          {`Error: ${this.props.error}`}
        </div>);
    }
    return (
      <StatefulView {...this.props}>
        {'App will redirect'}
      </StatefulView>
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
    modalType: state.modal.type
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authActions, dispatch),
  ...bindActionCreators(modalActions, dispatch)
});

export default withData(connect(mapStateToProps, mapDispatchToProps)(SocialLoginCallback));
