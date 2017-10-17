import { Component } from 'react';
import Router from 'next/router';
import Head from 'next/head';

import ProfileEditContainer from 'containers/ProfileEditContainer';
import withPage from 'hoc/withPage';

class profileEdit extends Component {
  handleDidSave = () => {};

  handleCancelButtonClick = () => console.log(Router.back());

  render() {
    return (
      <div>
        <Head>
          <title>{'Profile edit'}</title>
        </Head>
        <ProfileEditContainer
          onCancelButtonClick={this.handleCancelButtonClick}
        />
      </div>
    );
  }
}

export default withPage(profileEdit);
