import { Component } from 'react';
import Router from 'next/router';
import Head from 'next/head';

import ProfileEditContainer from 'containers/ProfileEditContainer';
import withPage from 'hoc/withPage';

class profileEdit extends Component {
  handleDidProfileSave = userId => Router.push({ pathname: '/profile',
    query: { userId },
    prefetch: true
  });

  handleCancelButtonClick = () => Router.back();

  handleDidRemoveProfile = () => Router.push({ pathname: '/' });

  render() {
    return (
      <div>
        <Head>
          <title>{'Profile edit'}</title>
        </Head>
        <ProfileEditContainer
          onCancelButtonClick={this.handleCancelButtonClick}
          onDidProfileSave={this.handleDidProfileSave}
          onDidRemoveProfile={this.handleDidRemoveProfile}
        />
      </div>
    );
  }
}

export default withPage(profileEdit);
