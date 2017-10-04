import { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import withPage from 'hoc/withPage';
import ProfileContainer from 'containers/ProfileContainer';

class ProfilePage extends Component {
  handleProfileEditButtonClick = ({ userType, userId }) => {
    Router.push({
      pathname: '/profileEdit',
      query: {
        userType,
        userId
      }
    });
  };

  render() {
    return (
      <div>
        <Head>
          <title>{'Profile'}</title>
        </Head>
        <ProfileContainer
          onProfileEditButtonClick={this.handleProfileEditButtonClick}
        />
      </div>
    );
  }
}

export default withPage(ProfilePage);
