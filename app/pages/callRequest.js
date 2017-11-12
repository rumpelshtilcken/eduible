import { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Router from 'next/router';

import withPage from 'hoc/withPage';
import withAuth from 'hoc/withAuth';
import CallRequestContainer from 'containers/CallRequestContainer';

class CallRequest extends Component {
  static propTypes = {
    url: PropTypes.shape({
      query: PropTypes.shape({
        professionalId: PropTypes.string.isRequired
      })
    })
  };

  handleBackButtonClick = () => Router.back();

  handleDidAppointmentCreate = () => Router.back();

  render() {
    if (!this.props.url.query && !this.props.url.query.professionalId) return null;

    const { professionalId } = this.props.url.query;

    return (
      <div>
        <Head>
          <title>{'Call request'}</title>
        </Head>
        <CallRequestContainer
          onBackButtonClick={this.handleBackButtonClick}
          onDidAppointmentCreate={this.handleDidAppointmentCreate}
          professionalId={professionalId}
        />
      </div>
    );
  }
}

export default withAuth(withPage(CallRequest));

