import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { compose, graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ProfessionalProfileEdit, StatefulView } from 'components';
import * as formActions from 'actions/form';
import * as snackbarActions from 'actions/snackbar';
import Cloudinary from 'services/Cloudinary';

class ProfessionalProfileEditContainer extends Component {
  static propTypes = {
    userId: PropTypes.string,
    form: PropTypes.object,
    updateProfessional: PropTypes.func.isRequired,
    onCancelButtonClick: PropTypes.func,
    onDidProfileSave: PropTypes.func.isRequired,
    showSnackbar: PropTypes.func,
    update: PropTypes.func,
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

  handleSaveButtonClick = async () => {
    const variables = this.props.form;
    console.log(variables);
    if (!variables) {
      this.props.showSnackbar({ messageType: 'error', message: 'You change nothing' });
      return;
    }
    await this.props.updateProfessional({ variables:
      { ...variables,
        professionalId: this.props.user.professional.id,
        userId: this.props.user.id
      }
    });
    this.props.onDidProfileSave(this.props.userId);
  };

  handleProfileAvatarChange = () =>
    Cloudinary.uploadImageWidget(this.handleDidProfileAvataUpload);

  handleProfileBackgroundChage = () =>
    Cloudinary.uploadImageWidget(this.handleDidProfileBackgroundUpload);

  handleDidProfileAvataUpload = ({ error, publicId }) => {
    if (error) this.props.showSnackbar({ messageType: 'error', message: error });
    this.props.update({ name: 'cloudinaryId', value: publicId });
  };

  handleDidProfileBackgroundUpload = ({ error, publicId }) => {
    if (error) this.props.showSnackbar({ messageType: 'error', message: error });
    this.props.update({ name: 'cloudinaryBackgroundId', value: publicId });
  };

  render() {
    if (this.props.error) return <div>{`Error ${this.props.error}`}</div>;
    const { cloudinaryId, cloudinaryBackgroundId } = this.props.form;
    return (
      <StatefulView loading={this.props.loading}>
        <ProfessionalProfileEdit
          user={this.props.user}
          profileAvaraId={cloudinaryId}
          profileBackgroundId={cloudinaryBackgroundId}
          onProfileAvatarChange={this.handleProfileAvatarChange}
          onProfileBackgroundChagne={this.handleProfileBackgroundChage}
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
      socialImageUrl
      cloudinaryId
      cloudinaryBackgroundId
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
    $professionalId: ID!
    $userId: ID!
    $name: String
    $birthday: DateTime
    $about: String
    $price: Float,
    $socialImageUrl: String
    $cloudinaryId: String
    $cloudinaryBackgroundId: String
  ) { 
    updateProfessional (
      id: $professionalId
      about: $about
      price: $price
    ) {
      id
    }
    updateUser (
      id: $userId
      name: $name
      birthday: $birthday
      socialImageUrl: $socialImageUrl
      cloudinaryId: $cloudinaryId
      cloudinaryBackgroundId: $cloudinaryBackgroundId
    ) {
      id
    }
  }
`;

const mapStateToProps = ({ form }) => ({ form });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(formActions, dispatch),
  ...bindActionCreators(snackbarActions, dispatch)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
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

