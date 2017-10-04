import { Component } from 'react';
import { TabMenu } from 'components';
import PropTypes from 'prop-types';

import Profile from './Profile';
import Universities from './Universities';

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

  handleReadMoreClick() {
    // TODO: read more about university
  }

  handleCalculatedClick() {
    // TODO: show how course percentage is calculated
  }

  render() {
    console.log('SSS: ', this.props.onProfileEditButtonClick);
    return (
      <div className="container">
        <Profile
          user={this.props.user}
          onEditButtonClick={this.props.onProfileEditButtonClick}
        />
        <TabMenu
          tabs={this.tabs}
        >
          {this.props.universities && (
            <Universities
              universities={this.props.universities}
              onRemoveFromListClick={this.props.onRemoveFromListClick}
              onReadMoreClick={this.handleReadMoreClick}
              onCalculatedClick={this.handleCalculatedClick}
            />
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
