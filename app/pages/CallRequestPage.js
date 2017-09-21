import { Component } from 'react';

import CallRequestContainer from 'containers/CallRequestContainer';

class CallRequestPage extends Component {
  handleBackButtonClick = () => {
    // TODO: navigate back
  };

  render() {
    return <CallRequestContainer onBackButtonClick={this.handleBackButtonClick} />;
  }
}

export default CallRequestPage;
