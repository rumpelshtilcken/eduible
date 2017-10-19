import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { compose, graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { PageHeader } from 'components';
import { getCurrentUserData } from 'utils/auth';
import * as modalActions from 'actions/modal';
import * as authActions from 'actions/auth';

class PageHeaderContainer extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.name
    }),
    signoutUser: PropTypes.func,
    showSignInModal: PropTypes.func.isRequired,
    showSignUpProfessionalModal: PropTypes.func.isRequired,
    showSignUpStudentModal: PropTypes.func.isRequired
  };

  handleLogoClick = () => Router.push({ pathname: '/', prefetch: true });

  handleLogoutButtonClick = () => {
    this.props.signoutUser();
    Router.push({ pathname: '/', prefetch: true });
  };

  profileButtonClick = () => Router.push({ pathname: '/profile',
    query: { userId: this.props.user.id },
    prefetch: true });

  prepareButtons = () => (this.props.user
    ? [
      { title: `Hi, ${this.props.user.name.split(' ')[0]}`, onClick: this.profileButtonClick, profile: true },
      { title: 'Logout', onClick: this.handleLogoutButtonClick }
    ]
    : [
      { title: 'Join as professional', onClick: this.props.showSignUpProfessionalModal },
      { title: 'Sign up', onClick: this.props.showSignUpStudentModal },
      { title: 'Login', onClick: this.props.showSignInModal }
    ]);

  prepareLinks = () => (this.props.user
    ? [
      { url: '/searchUniversity', title: 'Search university', prefetch: true },
      { url: '/searchProfessional', title: 'Search professional', prefetch: true }
    ]
    : null);

  render() {
    const buttons = this.prepareButtons();
    const links = this.prepareLinks();

    return (
      <PageHeader
        onLogoClick={this.handleLogoClick}
        links={links}
        buttons={buttons}
      />
    );
  }
}

const mapStateToProps = state => ({ authenticated: state.auth.authenticated, holeState: state });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authActions, dispatch),
  ...bindActionCreators(modalActions, dispatch)
});

const getUserByAuth0Id = gql`
  query User($auth0UserId: String!) {
    User (auth0UserId: $auth0UserId) {
      id
      name
    }
  }
`;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getUserByAuth0Id, {
    skip: ({ authenticated }) => !authenticated,
    options: () => ({ variables: { auth0UserId: getCurrentUserData('sub') } }),
    props: ({ data: { User, loading, error } }) => ({ user: User, loading, error })
  })
)(PageHeaderContainer);
