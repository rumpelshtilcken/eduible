import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { compose } from 'recompact';
import { connect } from 'react-redux';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { convertFromISOStringFormat, convertDateToISO } from 'utils/auth';
import { StudentProfileEdit, StatefulView } from 'components';
import Cloudinary from 'services/Cloudinary';
import * as authActions from 'actions/auth';
import * as formActions from 'actions/form';
import * as snackbarActions from 'actions/snackbar';

class StudentProfileEditContainer extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    showSnackbar: PropTypes.func,
    cloudinaryId: PropTypes.string.isRequired,
    onCancelButtonClick: PropTypes.func.isRequired,
    userId: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      birthday: PropTypes.string,
      student: PropTypes.shape({ id: PropTypes.string.isRequired })
    }),
    loading: PropTypes.bool,
    error: PropTypes.string,
    updateStudentProfile: PropTypes.func,
    name: PropTypes.string,
    birthday: PropTypes.string,
    onDidProfileSave: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired,
    signoutUser: PropTypes.func.isRequired,
    onDidRemoveProfile: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.user && !this.props.name && !this.props.birthday) {
      this.loadStudentProfileInfo();
    }
  }

  loadStudentProfileInfo = () => {
    if (this.props.user.name) this.props.update({ name: 'name', value: this.props.user.name });
    if (this.props.user.birthday) {
      const birthday = convertFromISOStringFormat(this.props.user.birthday);
      this.props.update({ name: 'birthday', value: birthday });
    }
  };

  handleSaveButtonClick = async () => {
    try {
      const birthday = convertDateToISO(this.props.birthday);
      const { cloudinaryId } = this.props;

      await this.props.updateStudentProfile({
        id: this.props.userId,
        name: this.props.name,
        birthday,
        cloudinaryId
      });
      this.props.onDidProfileSave(this.props.userId);
    } catch (err) {
      console.log(err);
    }
  };

  handleRemoveAccountButtonClick = async () => {
    try {
      const id = this.props.userId;
      const studentId = this.props.user.student.id;
      console.log(id, studentId);
      await this.props.deleteProfile({ id });
      this.props.signoutUser();
      this.props.onDidRemoveProfile();
    } catch (err) {
      console.log(err);
    }
  };

  handleDidProfileAvataUpload = ({ error, publicId }) => {
    if (error) this.props.showSnackbar({ messageType: 'error', message: error });
    this.props.update({ name: 'cloudinaryId', value: publicId });
  };

  handleProfileAvatarChange = () =>
    Cloudinary.uploadImageWidget(this.handleDidProfileAvataUpload);

  render() {
    if (this.props.error) return (<div>{`Error: ${this.props.error}`}</div>);

    const { name, birthday, cloudinaryId, user } = this.props;
    return (
      <StatefulView loading={this.props.loading}>
        <StudentProfileEdit
          user={user}
          name={name}
          birthday={birthday}
          onProfileAvatarChange={this.handleProfileAvatarChange}
          cloudinaryId={cloudinaryId}
          onCancelButtonClick={this.props.onCancelButtonClick}
          onRemoveAccountButtonClick={this.handleRemoveAccountButtonClick}
          onSaveButtonClick={this.handleSaveButtonClick}
        />
      </StatefulView>
    );
  }
}

const getUserById = gql`
  query GetUserById($id: ID!) {
    User (id: $id) {
      id
      name
      birthday
      cloudinaryId
      socialImageUrl
      student { id }
    }
  }
`;

const updateStudentProfile = gql`
  mutation UpdateStudentProfile(
    $id: ID!, 
    $name: String, 
    $birthday: DateTime 
    $socialImageUrl: String
    $cloudinaryId: String
    $cloudinaryBackgroundId: String) {
    updateUser ( 
      id: $id, 
      name: $name, 
      birthday: $birthday 
      socialImageUrl: $socialImageUrl
      cloudinaryId: $cloudinaryId
      cloudinaryBackgroundId: $cloudinaryBackgroundId
    ) { id } 
  }
`;

const deleteProfile = gql`
  mutation DeleteProfile ($id: ID!) {
    deleteUser (id: $id) { id }
  }
`;

const mapStateToProps = ({ form: { birthday, name, cloudinaryId } }) =>
  ({ name, birthday, cloudinaryId });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authActions, dispatch),
  ...bindActionCreators(formActions, dispatch),
  ...bindActionCreators(snackbarActions, dispatch)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getUserById, {
    name: 'user',
    skip: ({ userId }) => !userId,
    options: ({ userId }) => ({
      variables: { id: userId }
    }),
    props: ({ user: { User, loading, error } }) => ({ user: User, loading, error })
  }),
  graphql(updateStudentProfile, {
    props: ({ mutate }) => ({
      updateStudentProfile: ({ birthday, name, id, cloudinaryId }) =>
        mutate({ variables: { birthday, name, id, cloudinaryId } })
    })
  }),
  graphql(deleteProfile, {
    props: ({ mutate }) => ({
      deleteProfile: ({ id }) => mutate({ variables: { id } })
    })
  })
)(StudentProfileEditContainer);
