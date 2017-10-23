import { Component } from 'react';

import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { ProfessionalProfile, StatefulView } from 'components';
import { getCurrentUserData } from 'utils/auth';

class ProfessionalProfileContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onRequestCallClick: PropTypes.func,
    onEditButtonClick: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.object,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      auth0UserId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      professional: PropTypes.shape({
        id: PropTypes.string,
        about: PropTypes.string,
        price: PropTypes.number,
        location: PropTypes.shape({
          country: PropTypes.string
        }),
        job: PropTypes.shape({
          company: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
          jobTitle: PropTypes.shape({ title: PropTypes.string.isRequired }).isRequired
        }),
        educations: PropTypes.arrayOf(PropTypes.shape({
          major: PropTypes.shape({
            name: PropTypes.string.isRequired,
            school: PropTypes.shape({
              university: PropTypes.shape({ name: PropTypes.string.isRequired })
            })
          })
        }))
      })
    })
  };

  handleRequestCallClick = () =>
    this.props.onRequestCallClick({
      professionalId: this.props.user.professional.id
    });

  isCurrentUser = () => getCurrentUserData('sub') === this.props.user.auth0UserId;

  render() {
    const {
      user,
      loading,
      error
    } = this.props;
    if (error) return <div>{error}</div>;

    return (
      <StatefulView loading={loading}>
        {user && <ProfessionalProfile
          user={user}
          onRequestCallClick={this.handleRequestCallClick}
          onEditButtonClick={this.props.onEditButtonClick}
          isCurrentUser={this.isCurrentUser()}
        />}
      </StatefulView>
    );
  }
}

const getProfessionalById = gql`
  query User($id: ID!) {
    User(id: $id) {
      id
      userType
      auth0UserId
      name
      professional {
        id
        price
        location {
          id
          country
        }
        job {
          id
          company { 
            id
            name 
          }
          jobTitle { 
            id
            title 
          }
        }
        educations {
          id
          major {
            id
            name
            school {
              id
              university {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;

export default graphql(getProfessionalById, {
  name: 'user',
  options: ({ id }) => ({ variables: { id }, fetchPolicy: 'network-only' }),
  props: ({ user }) => ({
    user: user.User, loading: user.loading, error: user.error
  })
})(ProfessionalProfileContainer);
