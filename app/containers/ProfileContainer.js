import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { StatefulView } from 'components';

import ProfessionalProfileContainer from 'containers/ProfessionalProfileContainer';
import StudentProfileContainer from 'containers/StudentProfileContainer';

const ProfileContainer = ({
  user,
  error,
  loading,
  onRequestCallClick,
  onEditButtonClick
}) => {
  if (error) { return <div>{'Error'}</div>; }

  return (
    <StatefulView loading={loading}>
      {user &&
        (user.userType === 'Student'
          ? <StudentProfileContainer
            id={user.id}
            onRequestCallClick={onRequestCallClick}
            onEditButtonClick={onEditButtonClick}
          />
          : <ProfessionalProfileContainer
            id={user.id}
            onRequestCallClick={onRequestCallClick}
            onEditButtonClick={onEditButtonClick}
          />
        )
      }
    </StatefulView>
  );
};

ProfileContainer.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  user: PropTypes.object,
  onRequestCallClick: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func.isRequired
};

const getUserByAuth0Id = gql`
  query User($id: ID!) {
    User (id: $id) {
      id
      userType
    }
  }
`;

export default graphql(getUserByAuth0Id, {
  name: 'user',
  options: ({ userId }) => ({ variables: { id: userId }, fetchPolicy: 'network-only' }),
  props: ({ user }) => ({
    user: user.User, loading: user.loading, error: user.error
  })
})(ProfileContainer);
