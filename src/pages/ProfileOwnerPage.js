
import { Component } from 'react';

import ProfileOwnerContainer from 'containers/ProfileOwnerContainer';

class ProfilePage extends Component {
  handleNotifyMeButtonClick = () => {
    // TODO: navigate back
  };

  render() {
    return <ProfileOwnerContainer onNotifyMeButtonClick={this.handleNotifyMeButtonClick} />;
  }
}

export default ProfilePage;
