import { Component } from 'react';
import { compose, graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { ProfessionalProfileEdit, StatefulView } from 'components';

class ProfessionalProfileEditContainer extends Component {
  static propTypes = {
    userId: PropTypes.string,
    profileImgURL: PropTypes.string.isRequired,
    updateProfessional: PropTypes.func.isRequired,
    onCancelButtonClick: PropTypes.func,
    onDidProfileSave: PropTypes.func.isRequired,
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
    this.props.onDidProfileSave(this.props.userId);
  };

  render() {
    if (this.props.error) return <div>{`Error ${this.props.error}`}</div>;

    return (
      <StatefulView loading={this.props.loading}>
        <ProfessionalProfileEdit
          user={this.props.user}
          profileImgURL={this.props.profileImgURL}
          onSaveButtonClick={this.handleSaveButtonClick}
          onCancelButtonClick={this.props.onCancelButtonClick}
        />
      </StatefulView>
    );
  }
}

const getProfessionalById = gql`
  query GetUserById($id: ID!) {
    User(id: $id) {
      id
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
    name: 'user',
    options: ({ userId }) => ({ variables: { id: userId } }),
    props: ({ user }) => ({
      user: user.User, loading: user.loading, error: user.error
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

