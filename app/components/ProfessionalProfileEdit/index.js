import { Component } from 'react';
import PropTypes from 'prop-types';

import TabBarMenu from './TabBarMenu';
import ProfileEditTab from './ProfileEditTab';
import styles from './index.css';
import PayOut from './PayOutTab';

class ProfessionalProfileEdit extends Component {
  state = {
    currentTab: 'ProfileEditTab'
  };

  links = [
    { label: 'Profile Edit', value: 'ProfileEditTab', className: 'link current' },
    { label: 'Pay Out', value: 'PayOut', className: 'link' }
  ];

  changeTab = currentTab => this.setState({ currentTab });

  render() {
    return (
      <div className="component">
        <TabBarMenu
          currentTab={this.state.currentTab}
          changeTab={this.changeTab}
          links={this.links}
        />
        {this.state.currentTab === this.links[0].value ? (
          <ProfileEditTab
            user={this.props.user}
            handleSaveButtonPress={this.props.handleSaveButtonPress}
            images={this.props.images}
          />
        ) : (
          <PayOut />
        )}
        <style jsx>{styles}</style>
      </div>
    );
  }
}
ProfessionalProfileEdit.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    per: PropTypes.string.isRequired,
    dayComment: PropTypes.string.isRequired,
    currentPass: PropTypes.string.isRequired,
    newPass: PropTypes.string.isRequired
  }),
  handleSaveButtonPress: PropTypes.func.isRequired,
  images: PropTypes.shape({
    background: PropTypes.string,
    avatar: PropTypes.string
  })
};

export default ProfessionalProfileEdit;
