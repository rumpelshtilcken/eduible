import { Component } from 'react';
import { TabMenu } from 'components';
import PropTypes from 'prop-types';

import Profile from './Profile';
import Conversations from './TabList/Conversations';

import stylesheet from './index.css';

class StudentProfile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    universities: PropTypes.arrayOf(
      PropTypes.object
    ).isRequired
    onRemoveFromListClick: PropTypes.func.isRequired
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

  handleReadMoreClick() {
    // TODO: read more about university
  }

  handleCalculatedClick() {
    // TODO: show how course percentage is calculated
  }

  render() {
    return (
      <div className="container">
        <Profile
          user={this.props.user}
          onEditButtonClick={this.handleEditButtonClick}
        />
        <TabMenu
          tabs={this.tabs}
        >
          {this.props.conversations && (
            <Conversations/>
          )}
          <h1>Section 2 is coming</h1>
          <h1>Section 3 is coming</h1>
        </TabMenu>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default StudentProfile;
