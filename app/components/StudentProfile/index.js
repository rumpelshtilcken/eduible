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
    onEditButtonClick: PropTypes.func.isRequired
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

  render() {
    return (
      <div className="container">
        <Profile
          user={this.props.user}
          onEditButtonClick={this.props.onEditButtonClick}
        />
        <Conversations />
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default StudentProfile;
