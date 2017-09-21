import { Component } from 'react';

import { Layout } from 'components';
import CallRequestContainer from 'containers/CallRequestContainer';

class callRequest extends Component {
  handleBackButtonClick = () => {
    // TODO: navigate back
  };

  render() {
    return (
      <Layout>
        <CallRequestContainer onBackButtonClick={this.handleBackButtonClick} />
      </Layout>
    );
  }
}

export default callRequest;
