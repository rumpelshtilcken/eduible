import { Component } from 'react';
import PropTypes from 'prop-types';

import { ProfileOwner } from 'components';

class ProfileOwnerContainer extends Component {
  handleSubmitButtonClick = () => {};

  render() {
    return (
      <ProfileOwner />
    );
  }
}

ProfileOwnerContainer.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired
};

export default ProfileOwnerContainer;
