
import { Component } from 'react';
import ProfileContainer from 'containers/ProfileContainer';

class ProfilePage extends Component {
  handleNotifyMeButtonClick = () => {
    // TODO: navigate back
  };

  render() {
    return <ProfileContainer onNotifyMeButtonClick={this.handleNotifyMeButtonClick} />;
  }
}

export default ProfilePage;
