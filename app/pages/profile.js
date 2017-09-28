import { Component } from 'react';
import Head from 'next/head';

import withPage from 'hoc/withPage';
import ProfileContainer from 'containers/ProfileContainer';

class ProfilePage extends Component {
  handleNotifyMeButtonClick = () => {
    // TODO: navigate back
  };

  render() {
    return (
      <div>
        <Head>
          <title>{'Profile'}</title>
        </Head>
        <ProfileContainer />
      </div>
    );
  }
}

export default withPage(ProfilePage);
