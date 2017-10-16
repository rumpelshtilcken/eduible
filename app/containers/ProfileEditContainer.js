import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';

import { getCurrentUserData } from 'utils/auth';

import StudentProfileEditContainer from './StudentProfileEditContainer';
import ProfessionalProfileEditContainer from './ProfessionalProfileEditContainer';

const ProfileEditContainer = ({ userType, userId, onCancelButtonClick }) => {
  if (userType === 'Professional') {
    return (
      <ProfessionalProfileEditContainer
        userId={userId}
        onCancelButtonClick={onCancelButtonClick}
      />);
  } else if (userType === 'Student') {
    return (
      <StudentProfileEditContainer
        userId={userId}
        onCancelButtonClick={onCancelButtonClick}
      />);
  }
  return (<div> 404</div>);
};

ProfileEditContainer.propTypes = {
  userType: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired
};


const getUserByAuth0Id = gql`
query User($auth0UserId: String!) {
  User (auth0UserId: $auth0UserId) {
    id
    userType
  }
}
`;

export default graphql(getUserByAuth0Id, {
  name: 'user',
  options: () => ({
    variables: {
      auth0UserId: getCurrentUserData('sub')
    }
  }),
  skip: () => !getCurrentUserData('sub'),
  props: ({ user }) => ({
    user: user.User, loading: user.loading, error: user.error
  })
})(ProfileEditContainer);

