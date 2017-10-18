import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';

import { getCurrentUserData } from 'utils/auth';

import StudentProfileEditContainer from './StudentProfileEditContainer';
import ProfessionalProfileEditContainer from './ProfessionalProfileEditContainer';

const ProfileEditContainer = ({
  error,
  loading,
  onCancelButtonClick,
  onDidProfileSave,
  onDidRemoveProfile,
  user
}) => {
  if (!process.browser) return null;
  if (error) return <div>{error}</div>;
  if (loading) return null;
  const { userType, id } = user;
  if (userType === 'Professional') {
    return (
      <ProfessionalProfileEditContainer
        userId={id}
        onCancelButtonClick={onCancelButtonClick}
        onDidProfileSave={onDidProfileSave}
        onDidRemoveProfile={onDidRemoveProfile}
      />);
  } else if (userType === 'Student') {
    return (
      <StudentProfileEditContainer
        userId={id}
        onCancelButtonClick={onCancelButtonClick}
        onDidProfileSave={onDidProfileSave}
        onDidRemoveProfile={onDidRemoveProfile}
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
  onCancelButtonClick: PropTypes.func.isRequired,
  onDidProfileSave: PropTypes.func.isRequired,
  onDidRemoveProfile: PropTypes.func.isRequired
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
  props: data => ({
    user: data.user.User, loading: data.user.loading, error: data.user.error
  })
})(ProfileEditContainer);

