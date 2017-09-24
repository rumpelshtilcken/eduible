import { Component } from 'react';
import Head from 'next/head';

import withPage from 'hoc/withPage';
import CallRequestContainer from 'containers/CallRequestContainer';

class callRequest extends Component {
  handleBackButtonClick = () => {
    // TODO: navigate back
  };

  render() {
    return (
      <div>
        <Head>
          <title>{'Call request'}</title>
        </Head>
        <CallRequestContainer onBackButtonClick={this.handleBackButtonClick} />
      </div>
    );
  }
}

export default withPage(callRequest);

