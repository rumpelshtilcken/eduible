import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { StudentProfile } from 'components';

const StudentProfileContainer = ({ user }) => {
  console.log(user);
  return user ? <StudentProfile user={user} /> : <div>Loading...</div>;
};

StudentProfileContainer.propTypes = {
  user: PropTypes.object
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
  options: ({ id }) => console.log('here is the id passed to studentprofile', id) || ({
    variables: {
      id
    }
  }),
  props: ({ data: { allUsers } }) => ({
    user: allUsers && allUsers[0]
  })
})(StudentProfileContainer);
