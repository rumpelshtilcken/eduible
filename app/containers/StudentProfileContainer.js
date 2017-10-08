import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { StudentProfile } from 'components';

const StudentProfileContainer = ({ user, onProfileEditButtonClick }) => (user
  ? <StudentProfile user={user} onProfileEditButtonClick={onProfileEditButtonClick} />
  : <div>Loading...</div>);

StudentProfileContainer.propTypes = {
  user: PropTypes.object,
  onProfileEditButtonClick: PropTypes.func.isRequired
};

const getStudentById = gql`
  query GetUserById($id: ID!) {
    allUsers(filter: {id: $id}) {
      name
      student {
        id
      }
    }
  }
`;

export default graphql(getStudentById, {
  options: ({ id }) => ({
    variables: { id }
  }),
  props: ({ data: { allUsers } }) => ({
    user: allUsers && allUsers[0]
  })
})(StudentProfileContainer);
