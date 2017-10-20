import { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Router from 'next/router';

import withPage from 'hoc/withPage';
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

  render() {
    if (!this.props.url.query && !this.props.url.query.professionalId) return null;

    const { professionalId } = this.props.url.query;

    return (
      <div>
        <Head>
          <title>{'Call request'}</title>
        </Head>
        <CallRequestContainer
          professionalId={professionalId}
          onBackButtonClick={this.handleBackButtonClick}
        />
      </div>
    );
  }
}

export default withPage(CallRequest);

