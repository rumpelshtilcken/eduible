import { Component } from 'react';

import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { ProfessionalProfile } from 'components';
import { getCurrentUserData } from 'utils/auth';

class ProfessionalProfileContainer extends Component {
  handleRequestCallClick = () =>
    this.props.onRequestCallClick({
      professionalId: this.props.user.id
    });

  render() {
    const {
      user,
      loading,
      error,
      onProfileEditButtonClick
    } = this.props;

    if (error) return <div>{error}</div>;
    if (loading) return <div>{'Loading'}</div>;
    const isCurrentUser = getCurrentUserData('sub') === user.auth0UserId;
    return (
      <ProfessionalProfile
        user={user}
        onProfileEditButtonClick={onProfileEditButtonClick}
        onRequestCallClick={this.handleRequestCallClick}
        onEditButtonClick={this.props.onEditButtonClick}
        isCurrentUser={isCurrentUser}
      />
    );
  }
}

ProfessionalProfileContainer.propTypes = {
  id: PropTypes.string.isRequired,
  onRequestCallClick: PropTypes.func,
  onEditButtonClick: PropTypes.func,
  onProfileEditButtonClick: PropTypes.func.isRequired,
  loading: PropTypes.boolean,
  error: PropTypes.object,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    auth0UserId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    professional: PropTypes.shape({
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
  options: ({ id }) => ({ variables: { id } }),
  props: ({ user }) => ({
    user: user.User, loading: user.loading, error: user.error
  })
})(ProfessionalProfileContainer);
