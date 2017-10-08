import { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import ProfessionalProfileContainer from 'containers/ProfessionalProfileContainer';
import StudentProfileContainer from 'containers/StudentProfileContainer';

class ProfileContainer extends Component {
  static propTypes = {
    user: PropTypes.object,
    onRequestCallClick: PropTypes.func.isRequired,
    onEditButtonClick: PropTypes.func.isRequired
  }

  handleProfileEditButtonClick = () =>
    this.props.onEditButtonClick({
      userType: this.props.user.userType,
      userId: this.props.user.id
    });

  render() {
    const { user } = this.props;

    if (!user) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {user && user.userType === 'Student' &&
        <StudentProfileContainer
          id={user.id}
          onRequestCallClick={this.props.onRequestCallClick}
          onEditButtonClick={this.props.onEditButtonClick}
        />}
        {user && user.userType === 'Professional' &&
        <ProfessionalProfileContainer
          id={user.id}
          onRequestCallClick={this.props.onRequestCallClick}
          onEditButtonClick={this.handleProfileEditButtonClick}
        />}
      </div>
    );
  }
}

const getUserByAuth0Id = gql`
  query allUsers($id: ID!) {
    allUsers (filter: {id: $id}) {
      id
      userType
    }
  }
`;

export default graphql(getUserByAuth0Id, {
  options: ({ userId }) => ({
    variables: {
      id: userId
    }
  }),
  props: ({ data }) => ({
    user: data && data.allUsers && data.allUsers[0]
  })
})(ProfileContainer);
