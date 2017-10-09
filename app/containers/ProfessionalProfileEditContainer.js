import { Component } from 'react';
import { compose, graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { ProfessionalProfileEdit } from 'components';

class ProfessionalProfileEditContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    updateProfessional: PropTypes.func.isRequired,
    onCancelButtonClick: PropTypes.func,
    onSaveButtonClick: PropTypes.func.isRequired,
    loading: PropTypes.boolean,
    error: PropTypes.object,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      birthday: PropTypes.string,
      professional: PropTypes.shape({
        id: PropTypes.string.isRequired,
        about: PropTypes.string,
        price: PropTypes.number
      })
    })
  };

  handleSaveButtonClick = async (variables) => {
    await this.props.updateProfessional({ variables:
      { ...variables,
        id: this.props.user.professional.id
      }
    });
    this.props.onSaveButtonClick();
  };

  handleCancelButtonClick = () => this.props.onCancelButtonClick;

  render() {
    if (this.props.loading) return <div>Loading</div>;
    if (this.props.error) return <div>{`Error ${this.props.error}`}</div>;

    return (
      <ProfessionalProfileEdit
        user={this.props.user}
        handleSaveButtonClick={this.handleSaveButtonClick}
      />
    );
  }
}

const getProfessionalById = gql`
  query GetUserById($id: ID!) {
    User(id: $id) {
      userType
      name
      birthday
      professional {
        id
        price
        about
      }
    }
  }
`;

const updateProfessional = gql`
  mutation updateProfessional (
    $id: ID!
    $name: String
    $birthday: DateTime
    $about: String
    $price: Float
  ) { 
    updateProfessional (
      id: $id
      about: $about
      user: {
        name: $name
        birthday: $birthday
      }
    ){
      id
    }
  }
`;

export default compose(
  graphql(getProfessionalById, {
    options: ({ userId }) => ({ variables: { id: userId } }),
    props: ({ data: { User, error, loading } }) => ({
      loading, error, user: User
    })
  }),
  graphql(updateProfessional, {
    props: ({ mutate }) => ({
      updateProfessional: ({ variables }) => mutate({
        variables
      })
    })
  })
)(ProfessionalProfileEditContainer);

