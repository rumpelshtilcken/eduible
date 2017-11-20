import { Component } from 'react';
import { hoistStatics } from 'recompact';
import getDisplayName from 'utils/getDisplayName';
import Router from 'next/router';

import { Spinner } from 'components';
import Auth from 'services/Auth';

const withAuth = hoistStatics((WrappedComponent) => {
  const auth = new Auth();
  class WithAuth extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
      if (process.browser && !auth.isAuthenticated()) {
        Router.push({ pathname: '/' });
        return;
      }
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({ loading: false });
      /* eslint-enable react/no-did-mount-set-state */
    }

    render() {
      if (this.state.loading) return <Spinner />;

      return <WrappedComponent {...this.props} />;
    }
  }

  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuth;
});

export default withAuth;
