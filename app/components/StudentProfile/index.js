import { Component } from 'react';
import { TabMenu } from 'components';
import PropTypes from 'prop-types';

import Conversations from './TabList/Conversations';
import Profile from './Profile';
import Universities from './TabList/Universities';

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
        {this.props.universities &&
        <TabMenu
          tabs={this.tabs}
          childrens={[
            <Universities
              universities={this.props.universities}
              onRemoveFromListClick={this.props.onRemoveFromListClick}
              onReadMoreClick={this.handleReadMoreClick}
              onCalculatedClick={this.handleCalculatedClick}
            />,
            <h1>Section 1 is coming</h1>,
            <h1>Section 2 is coming</h1>,
            <Conversations />
          ]}
        />}
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default StudentProfile;
