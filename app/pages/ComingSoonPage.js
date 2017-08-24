import { Component } from 'react';

import { CommingSoon } from 'components';

class CallRequestPage extends Component {
  handleNotifyMeButtonClick = () => {
    // TODO: navigate back
  };

  render() {
    return <CommingSoon onNotifyMeButtonClick={this.handleNotifyMeButtonClick} />;
  }
}

export default CallRequestPage;
