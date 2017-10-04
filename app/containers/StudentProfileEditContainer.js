import { Component } from 'react';
import PropTypes from 'prop-types';

import { StudentProfileEdit } from 'components';

class StudentProfileEditContainer extends Component {
  static propTypes = {
    onCancelButtonClick: PropTypes.func.isRequired
  };

  handleSaveUpdateButtonClick = () => {};

  handleDeleteAccountButtonClick = () => {};

  render() {
    return (
      <StudentProfileEdit
        onCancelButtonClick={this.props.onCancelButtonClick}
        onDeleteAccountButtonClick={this.handleDeleteAccountButtonClick}
        onSaveUpdateButtonClick={this.handleSaveUpdateButtonClick}
      />);
  }
}

export default StudentProfileEditContainer;
