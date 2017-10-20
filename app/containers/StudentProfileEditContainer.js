import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { compose } from 'recompact';
import { connect } from 'react-redux';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { convertFromISOStringFormat, convertDateToISO } from 'utils/auth';
import { StudentProfileEdit, StatefulView } from 'components';
import * as authActions from 'actions/auth';
import * as formActions from 'actions/form';

class StudentProfileEditContainer extends Component {
  static propTypes = {
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
    update: PropTypes.func
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
      await this.props.updateStudentProfile({
        id: this.props.userId,
        name: this.props.name,
        birthday
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

  render() {
    if (this.props.error) return (<div>{`Error: ${this.props.error}`}</div>);

    const { name, birthday } = this.props;
    console.log(name, birthday);
    return (
      <StatefulView loading={this.props.loading}>
        <StudentProfileEdit
          name={name}
          birthday={birthday}
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
      student { id }
    }
  }
`;

const updateStudentProfile = gql`
  mutation UpdateStudentProfile($id: ID!, $name: String, $birthday: DateTime) {
    updateUser ( id: $id, name: $name ,birthday: $birthday ) { id } 
  }
`;

const deleteProfile = gql`
  mutation DeleteProfile ($id: ID!) {
    deleteUser (id: $id) { id }
  }
`;

const mapStateToProps = ({ form: { birthday, name } }) => ({ name, birthday });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authActions, dispatch),
  ...bindActionCreators(formActions, dispatch)
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
      updateStudentProfile: ({ birthday, name, id }) =>
        mutate({ variables: { birthday, name, id } })
    })
  }),
  graphql(deleteProfile, {
    props: ({ mutate }) => ({
      deleteProfile: ({ id }) => mutate({ variables: { id } })
    })
  })
)(StudentProfileEditContainer);
