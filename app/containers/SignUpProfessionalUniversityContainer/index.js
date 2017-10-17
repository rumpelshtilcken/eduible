import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { convertDateToISO, getCurrentUserData, convertFromISOStringFormat } from 'utils/auth';
import * as authActions from 'actions/auth';
import * as formActions from 'actions/form';
import * as modalActions from 'actions/modal';
import * as snackbarActions from 'actions/snackbar';

import SignUpProfessionalUniversityFormContainer from './SignUpProfessionalUniversityFormContainer';

class SignUpProfessionalUniversityContainer extends Component {
  static propTypes = {
    hideModal: PropTypes.func,
    showSnackbar: PropTypes.func,
    professionalId: PropTypes.string.isRequired,
    signinLinkedin: PropTypes.func,
    signupProfessional: PropTypes.func,
    updateProfessional: PropTypes.func,
    values: PropTypes.object,
    reset: PropTypes.func,
    update: PropTypes.func,
    loading: PropTypes.bool,
    user: PropTypes.shape({
      professional: PropTypes.shape({
        id: PropTypes.string,
        educations: PropTypes.arrayOf(PropTypes.shape({
          startYear: PropTypes.string,
          endYear: PropTypes.string,
          major: PropTypes.shape({
            name: PropTypes.string,
            school: PropTypes.shape({
              university: PropTypes.shape({
                name: PropTypes.string
              })
            })
          })
        }))
      })
    }).isRequired
  };

  state = {
    loading: false
  }

  componentDidMount() {
    if (process.browser) {
      const headline = getCurrentUserData('headline');
      if (headline) this.loadLocalUniversityInfo(headline);
    }

    if (this.props.user) {
      this.loadProfessionalUniversityInfo();
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  loadLocalUniversityInfo = (headline) => {
    const university = headline.split(' - ')[1];
    this.props.update({ name: 'university', value: university });
  };

  loadProfessionalUniversityInfo = () => {
    const { educations } = this.props.user.professional;
    if (educations && educations[0]) {
      const { startYear, endYear } = educations[0];
      const { name: majorName, school } = educations[0].major;
      const { name: universityName } = school.university;

      if (startYear) {
        this.props.update({ name: 'startYear', value: convertFromISOStringFormat(startYear) });
      }
      if (endYear) {
        this.props.update({ name: 'endYear', value: convertFromISOStringFormat(endYear) });
      }
      if (universityName) this.props.update({ name: 'university', value: universityName });
      if (majorName) this.props.update({ name: 'major', value: majorName });
    }
  };

  handleAddButtonClick = async (params) => {
    try {
      this.setState({ loading: true });
      const variables = this.prepareParams(params);
      await this.props.updateProfessional({ variables });
      this.handleDidAddUniversity();
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ loading: false });
      this.handleAddUniversityError();
    }
  };

  prepareParams = ({ major, university, startYear, endYear }) => {
    const universityParam = university.name
      ? { universityName: university }
      : { universityId: university };

    return {
      majorName: major.name,
      ...universityParam,
      id: this.props.professionalId,
      startYear: convertDateToISO(startYear),
      endYear: convertDateToISO(endYear)
    };
  };

  handleDidAddUniversity = () => {
    this.props.showSnackbar({ messageType: 'success', message: 'Success' });
    this.props.hideModal();
  };

  handleAddUniversityError = () =>
    this.props.showSnackbar({ messageType: 'error', message: 'Server error' });;

  handleSkipButtonClick = () => {
    this.props.hideModal();
  };

  render() {
    const { university, major, startYear, endYear } = this.props.values;

    return (
      <SignUpProfessionalUniversityFormContainer
        {...this.props}
        onAddButtonClick={this.handleAddButtonClick}
        onSkip={this.handleSkipButtonClick}
        majorName={major}
        startYear={startYear}
        endYear={endYear}
        universityName={university}
        loading={this.state.loading}
      />
    );
  }
}

const mapStateToProps = state => ({ values: state.form });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authActions, dispatch),
  ...bindActionCreators(formActions, dispatch),
  ...bindActionCreators(modalActions, dispatch),
  ...bindActionCreators(snackbarActions, dispatch)
});

const getProfessionalByAuth0Id = gql`
  query User($auth0UserId: String!) {
    User (auth0UserId: $auth0UserId) {
      id
      professional {
        id
        educations {
          startYear
          endYear
          major {
            name
            school {
              university { name }
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
    $startYear: DateTime!
    $endYear: DateTime!
  ) {
    updateProfessional (
      id: $id
      educations: {
        startYear: $startYear
        endYear: $endYear
        major: {
            name: $majorName
            school: {
              name: $schoolName
              universityId: $universityId
              university: $universityName
            }
        },
      }
    ) { id }
  }
`;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getProfessionalByAuth0Id, {
    name: 'user',
    skip: () => !getCurrentUserData('sub'),
    options: () => ({ variables: { auth0UserId: getCurrentUserData('sub') } }),
    props: ({ user }) => ({ user: user.User, error: user.error, loading: user.loading })
  }),
  graphql(updateProfessional, {
    props: ({ mutate }) => ({
      updateProfessional: ({ variables }) => mutate({
        variables
      })
    })
  })
)(SignUpProfessionalUniversityContainer);
