import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { StudentProfile, StatefulView } from 'components';

const StudentProfileContainer = ({ user, loading, error, onEditButtonClick }) => {
  if (error) return (<div>{`Error: ${error}`}</div>);

  return (
    <StatefulView loading={loading}>
      <StudentProfile user={user} onEditButtonClick={onEditButtonClick} />
    </StatefulView>
  );
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
