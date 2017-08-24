import { Component } from 'react';
import PropTypes from 'prop-types';

import { Profile } from 'components';

class ProfileContainer extends Component {
  handleSubmitButtonClick = () => {};

  render() {
    return (
      <Profile />
    );
  }
}

ProfileContainer.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired
};

export default ProfileContainer;
