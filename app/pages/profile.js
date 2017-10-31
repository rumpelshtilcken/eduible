import { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Router from 'next/router';

import withPage from 'hoc/withPage';
import ProfileContainer from 'containers/ProfileContainer';

class ProfilePage extends Component {
  static propTypes = {
    url: PropTypes.shape({
      query: PropTypes.shape({
        userId: PropTypes.string.isRequired
      })
    })
  };

  handleConnectButtonClick = appointmentId =>
    Router.push({
      pathname: '/videoChat',
      query: { appointmentId }
    });

  handleProfileEditButtonClick = () =>
    Router.push({
      pathname: '/profileEdit'
    });

  handleRequestCallClick = ({ professionalId }) =>
    Router.push({
      pathname: '/callRequest',
      query: {
        professionalId
      }
    });

  render() {
    const { userId } = this.props.url.query;

    return (
      <div>
        <Head>
          <title>{'Profile'}</title>
        </Head>
        <ProfileContainer
          userId={userId}
          onRequestCallClick={this.handleRequestCallClick}
          onEditButtonClick={this.handleProfileEditButtonClick}
          onConnectButtonClick={this.handleConnectButtonClick}
        />
      </div>
    );
  }
}

export default withPage(ProfilePage);
