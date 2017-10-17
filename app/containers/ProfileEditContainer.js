import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';

import { getCurrentUserData } from 'utils/auth';

import StudentProfileEditContainer from './StudentProfileEditContainer';
import ProfessionalProfileEditContainer from './ProfessionalProfileEditContainer';

const ProfileEditContainer = ({ user, loading, error, onCancelButtonClick }) => {
  if (error) return <div>{error}</div>;
  if (loading) return null;
  const { userType, id } = user;
  if (userType === 'Professional') {
    return (
      <ProfessionalProfileEditContainer
        userId={id}
        onCancelButtonClick={onCancelButtonClick}
      />);
  } else if (userType === 'Student') {
    return (
      <StudentProfileEditContainer
        userId={id}
        onCancelButtonClick={onCancelButtonClick}
      />);
  }
};

ProfileEditContainer.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    userType: PropTypes.string
  }),
  error: PropTypes.string,
  loading: PropTypes.bool,
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
  skip: () => !getCurrentUserData('sub'),
  options: () => ({
    variables: {
      auth0UserId: getCurrentUserData('sub')
    }
  }),
  props: ({ user }) => ({
    user: user.User, loading: user.loading, error: user.error
  })
})(ProfileEditContainer);

