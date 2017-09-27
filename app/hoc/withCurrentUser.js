import { Component } from 'react';
import { connect } from 'react-redux';
import { hoistStatics } from 'recompact';

import getDisplayName from 'utils/getDisplayName';

const withCurrentUser = hoistStatics((CompositeComponent) => {
  class WithCurrentUser extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        // not authenticated
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        // not authenticated
      }
    }

    render() {
      if (this.props.authenticated) {
        // not authenticated
        return <div>{'AUTHENTICATED'}</div>;
      }

      return (
        <CompositeComponent {...this.props} />
      );
    }
  }

  WithCurrentUser.displayName = `WithLayout(${getDisplayName(CompositeComponent)})`;

  const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

  return connect(mapStateToProps)(WithCurrentUser);
});

export default withCurrentUser;
