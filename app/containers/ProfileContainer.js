import { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { ProfessionalProfileContainer } from 'containers/ProfessionalProfileContainer';
import StudentProfileContainer from 'containers/StudentProfileContainer';
import { getCurrentUserData } from 'utils/auth';

class ProfileContainer extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  user = {
    imgUrl: '/static/profile.png',
    data: [
      {
        text: 'MIGUEL CARRERA',
        location: {
          imgUrl: '/static/prof/Location.svg',
          text: 'Miami, Fl'
        }
      },
      {
        text: 'IT developer',
        location: {
          imgUrl: '/static/prof/Circle.svg',
          text: 'Facebook'
        }
      },
      {
        text: 'IT with positions',
        location: {
          imgUrl: '/static/prof/Education.svg',
          text: 'Hogwards 2007-2011'
        }
      }
    ]
  };

  render() {
    const { user } = this.props;
    console.log('user is ', user);
    return (
      <div>
        {user && user.userType === 'Student' && <StudentProfileContainer id={user.id} />}
        {user && user.userType === 'Professional' && <ProfessionalProfileContainer id={user.id} />}
      </div>
    );
  }
}

const getUserByAuth0Id = gql`
query allUsers($auth0UserId: String!) {
  allUsers (filter: {auth0UserId: $auth0UserId}) {
    id
    userType
  }
} 
`;

export default graphql(getUserByAuth0Id, {
  options: () => ({
    variables: {
      auth0UserId: getCurrentUserData('sub')
    }
  }),
  props: ({ data }) => console.log('DATA IS HERE', data) || ({
    user: data && data.allUsers && data.allUsers[0]
  })
})(ProfileContainer);
