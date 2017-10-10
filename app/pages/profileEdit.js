import { Component } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import PropTypes from 'prop-types';

import ProfileEditContainer from 'containers/ProfileEditContainer';
import withPage from 'hoc/withPage';

class profileEdit extends Component {
  static propTypes = {
    url: PropTypes.shape({
      query: PropTypes.shape({
        userId: PropTypes.string.isRequired,
        userType: PropTypes.string.isRequired
      })
    })
  };

  handleDidSave = () => {};

  handleCancelButtonClick = () => console.log(Router);

  render() {
    const { userId, userType } = this.props.url.query;
    return (
      <div>
        <Head>
          <title>{'Profile edit'}</title>
        </Head>
        <ProfileEditContainer
          userId={userId}
          userType={userType}
          onCancelButtonClick={this.handleCancelButtonClick}
        />
      </div>
    );
  }
}

export default withPage(profileEdit);
