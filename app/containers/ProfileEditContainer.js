import PropTypes from 'prop-types';

import StudentProfileEditContainer from './StudentProfileEditContainer';
import ProfessionalProfileEditContainer from './ProfessionalProfileEditContainer';

const ProfileEditContainer = ({ userType, userId, onCancelButtonClick }) => {
  if (userType === 'Professional') {
    return (
      <ProfessionalProfileEditContainer
        userId={userId}
        onCancelButtonClick={onCancelButtonClick}
      />);
  }

  return (
    <StudentProfileEditContainer
      userId={userId}
      onCancelButtonClick={onCancelButtonClick}
    />);
};

ProfileEditContainer.propTypes = {
  userType: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired
};

export default ProfileEditContainer;
