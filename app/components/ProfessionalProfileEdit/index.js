import { Component } from 'react';
import PropTypes from 'prop-types';

import { TabMenu } from 'components';

import ProfileEditTab from './ProfileEditTab';
import PayOut from './PayOutTab';
import stylesheet from './index.css';

class ProfessionalProfileEdit extends Component {
  static propTypes = {
    profileAvaraId: PropTypes.string,
    profileBackgroundId: PropTypes.string,
    onProfileAvatarChange: PropTypes.func,
    onProfileBackgroundChagne: PropTypes.func,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      birthday: PropTypes.string,
      professional: PropTypes.shape({
        about: PropTypes.string,
        price: PropTypes.number
      })
    }),
    onCancelButtonClick: PropTypes.func.isRequired,
    onSaveButtonClick: PropTypes.func.isRequired
  };

  tabs = [
    { title: 'Profile Edit', isNotifiable: true },
    { title: 'Pay Out', isNotifiable: false }
  ];

  render() {
    return (
      <div className="professionalProfileEditContainer">
        <TabMenu
          tabs={this.tabs}
          childrens={[
            <ProfileEditTab
              user={this.props.user}
              profileAvaraId={this.props.profileAvaraId}
              profileBackgroundId={this.props.profileBackgroundId}
              onSaveButtonClick={this.props.onSaveButtonClick}
              onCancelButtonClick={this.props.onCancelButtonClick}
              onProfileAvatarChange={this.props.onProfileAvatarChange}
              onProfileBackgroundChagne={this.props.onProfileBackgroundChagne}
            />,
            <PayOut />
          ]}
        />
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default ProfessionalProfileEdit;
