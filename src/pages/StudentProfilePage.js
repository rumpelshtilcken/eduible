import { Component } from 'react';

import { StudentProfileEdit } from 'components';

class CallRequestPage extends Component {
  handleNotifyMeButtonClick = () => {
    // TODO: navigate back
  };

  render() {
    return <StudentProfileEdit onNotifyMeButtonClick={this.handleNotifyMeButtonClick} />;
  }
}

export default CallRequestPage;
