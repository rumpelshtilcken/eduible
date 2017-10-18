import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { StudentProfile } from 'components';

const StudentProfileContainer = ({ user, loading, error, onEditButtonClick }) => {
  if (loading) return (<div>Loading...</div>);
  if (error) return (<div>{`Error: ${error}`}</div>);

  return <StudentProfile user={user} onEditButtonClick={onEditButtonClick} />;
};

StudentProfileContainer.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  user: PropTypes.object,
  onEditButtonClick: PropTypes.func.isRequired
};

const getStudentById = gql`
  query GetUserById($id: ID!) {
    User(id: $id) {
      id
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
  props: ({ data: { User, loading, error } }) => ({
    user: User, loading, error
  })
})(StudentProfileContainer);
