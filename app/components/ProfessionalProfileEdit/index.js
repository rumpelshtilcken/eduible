import { Component } from 'react';
import PropTypes from 'prop-types';

import { TabMenu } from 'components';

import ProfileEditTab from './ProfileEditTab';
import PayOut from './PayOutTab';
import stylesheet from './index.css';

class ProfessionalProfileEdit extends Component {
  static propTypes = {
    profileImgURL: PropTypes.string.isRequired,
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
              profileImgURL={this.props.profileImgURL}
              onSaveButtonClick={this.props.onSaveButtonClick}
              onCancelButtonClick={this.props.onCancelButtonClick}
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
