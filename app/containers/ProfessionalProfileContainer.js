import { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { ProfessionalProfile } from 'components';

class ProfessionalProfileContainer extends Component {
  static propTypes = {
    user: PropTypes.object,
    onProfileEditButtonClick: PropTypes.func.isRequired
  };
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
    return (
      <ProfessionalProfile
        user={this.props.user}
        onProfileEditButtonClick={this.props.onProfileEditButtonClick}
      />);
  }
}
const getProfessionalById = gql`
query GetUserById($id: ID!) {
  allUsers(filter: {id: $id}) {
    name
    professional {
      id
    }
  }
}
`;

export default graphql(getProfessionalById, {
  options: ({ id }) => console.log('here is the id passed to professionalprofile', id) || ({
    variables: {
      id
    }
  }),
  props: ({ data: { allUsers } }) => ({
    user: allUsers && allUsers[0]
  })
})(ProfessionalProfileContainer);
