import { Component } from 'react';

import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { ProfessionalProfile, StatefulView } from 'components';

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

    console.log(user);
    console.log(loading);
    console.log(error);
    if (error) return <div>{error}</div>;

    return (
      <StatefulView loading={loading} error={error}>
        <ProfessionalProfile
          user={user}
          onProfileEditButtonClick={onProfileEditButtonClick}
          onRequestCallClick={this.handleRequestCallClick}
          onEditButtonClick={this.props.onEditButtonClick}
        />
      </StatefulView>
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
  query GetUserById($id: ID!) {
    User(id: $id) {
      userType
      auth0UserId
      name
      professional {
        price
        location {
          country
        }
        job {
          company { name }
          jobTitle { title }
        }
        educations {
          major {
            name
            school {
              university {
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
  props: ({ user: { User, error, loading } }) => ({
    loading, error, user: User
  })
})(ProfessionalProfileContainer);
