import { Component } from 'react';
import PropTypes from 'prop-types';

import Conversations from './TabList/Conversations';
import Profile from './Profile';

import stylesheet from './index.css';

class StudentProfile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    universities: PropTypes.arrayOf(
      PropTypes.object
    ).isRequired,
    onRemoveFromListClick: PropTypes.func.isRequired,
    onProfileEditButtonClick: PropTypes.func.isRequired
  };

  tabs = [
    {
      title: 'Universities',
      isNotifiable: false
    },
    {
      title: 'Grades',
      isNotifiable: false
    },
    {
      title: 'Conversations',
      isNotifiable: true
    }
  ]

  handleEditButtonClick = () => {
    // TODO: handle edit profile button click
  }

  render() {
    return (
      <div className="container">
        <Profile
          user={this.props.user}
          onEditButtonClick={this.props.onProfileEditButtonClick}
        />
        <Conversations />
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default StudentProfile;
