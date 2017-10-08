import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { getCurrentUserData } from 'utils/auth';
import * as authActions from 'actions/auth';
import * as modalActions from 'actions/modal';
import * as formActions from 'actions/form';

import SignUpProfessionalUniversityFormContainer from './SignUpProfessionalUniversityFormContainer';

class SignUpProfessionalUniversityContainer extends Component {
  static propTypes = {
    signupProfessional: PropTypes.func,
    signinLinkedin: PropTypes.func,
    hideModal: PropTypes.func,
    data: PropTypes.object,
    updateProfessional: PropTypes.func,
    values: PropTypes.object,
    users: PropTypes.array
  };

  handleAddButtonClick = async ({ major, university }) => {
    const variables = this.prepareParams({ major, university });
    await this.props.updateProfessional({ variables });
    this.props.hideModal();
  };

  prepareParams = ({ major, university }) => {
    const { users } = this.props;
    const id = users
                  && users.allUsers[0]
                  && users.allUsers[0].professional.id;

    const universityParam = university.name
      ? { universityName: university }
      : { universityId: university };

    return { majorName: major.name, ...universityParam, id };
  };

  handleSkipButtonClick = () => {
    this.props.hideModal();
  };

  render() {
    const { university, major } = this.props.values;

    return (
      <SignUpProfessionalUniversityFormContainer
        {...this.props}
        onAddButtonClick={this.handleAddButtonClick}
        onSkip={this.handleSkipButtonClick}
        majorName={major}
        universityName={university}
      />
    );
  }
}

const mapStateToProps = state => ({ values: state.form });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authActions, dispatch),
  ...bindActionCreators(formActions, dispatch),
  ...bindActionCreators(modalActions, dispatch)
});

const getProfessionalByAuth0Id = gql`
  query allUsers($auth0UserId: String!) {
    allUsers (filter: {auth0UserId: $auth0UserId}) {
      id
      professional {
        id
        majors {
          name
          school {
            name
            university {
              name
            }
          }
        }
      }
    }
  }
`;
const updateProfessional = gql`
  mutation updateProfessional (
    $id: ID!
    $majorName: String!
    $schoolName: String
    $universityId: ID,
    $universityName: SchooluniversityUniversity
    $majorsIds: [ID!]
  ) { 
    updateProfessional (
      id: $id
      majors: [
        {
          name: $majorName
          school: {
            name: $schoolName
            universityId: $universityId
            university: $universityName
          }
        }
      ],
      majorsIds: $majorsIds
    ){
      id
    }
  }
`;

export default
compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getProfessionalByAuth0Id, {
    name: 'users',
    skip: () => !getCurrentUserData('sub'),
    options: () => ({
      variables: {
        auth0UserId: getCurrentUserData('sub')
      }
    })
  }),
  graphql(updateProfessional, {
    props: ({ mutate }) => ({
      updateProfessional: ({ variables }) => mutate({
        variables
      })
    })
  })
)(SignUpProfessionalUniversityContainer);
