import { Component } from 'react';
import Head from 'next/head';

import withPage from 'hoc/withPage';
import { CommingSoon } from 'components';

class CallRequestPage extends Component {
  handleNotifyMeButtonClick = () => {
    // TODO: navigate back
  };

  render() {
    return (
      <div>
        <Head>
          <title>{'Coming soon'}</title>
        </Head>
        <CommingSoon onNotifyMeButtonClick={this.handleNotifyMeButtonClick} />
      </div>);
  }
}

export default withPage(CallRequestPage);
