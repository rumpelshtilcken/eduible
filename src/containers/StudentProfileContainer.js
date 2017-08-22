import { Component } from 'react';
import PropTypes from 'prop-types';

import { StudentProfileEdit } from 'components';

class StudentProfileContainer extends Component {
  handleSubmitButtonClick = () => {};

  render() {
    return (
      <StudentProfileEdit />
    );
  }
}

StudentProfileContainer.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired
};

export default StudentProfileContainer;
