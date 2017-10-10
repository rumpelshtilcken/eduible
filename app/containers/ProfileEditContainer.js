import PropTypes from 'prop-types';

import StudentProfileEditContainer from './StudentProfileEditContainer';
import ProfessionalProfileEditContainer from './ProfessionalProfileEditContainer';

const ProfileEditContainer = ({ userType, userId, onCancelButtonClick }) => {
  if (userType === 'Professional') {
    console.log(userId, onCancelButtonClick);
    return <ProfessionalProfileEditContainer />;
  }

  return <StudentProfileEditContainer />;
};

ProfileEditContainer.propTypes = {
  userType: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired
};

export default ProfileEditContainer;
