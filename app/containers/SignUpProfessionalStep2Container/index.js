import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { getCurrentUserData } from 'utils/auth';
import * as formActions from 'actions/form';
import * as modalActions from 'actions/modal';

import SignUpProfessionalJobContainer from './SignUpProfessionalJobContainer';

class SignUpProfessionalStep2Container extends Component {
  static propTypes = {
    users: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      allUsers: PropTypes.arrayOf(PropTypes.shape({
        professional: PropTypes.shape({
          id: PropTypes.string
        })
      }))
    }).isRequired,
    getProfessionalsJob: PropTypes.func.isRequired,
    updateProfessionalJob: PropTypes.func.isRequired,
    showSignUpProfessionalUniversity: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    reset: PropTypes.func
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleContinueButtonClick = async ({ jobTitle, company }) => {
    const variables = this.prepareParams({ jobTitle, company });
    await this.props.updateProfessionalJob({ variables });
    this.handleDidContinueButtonClick();
  };

  prepareParams = ({ jobTitle, company }) => {
    const { users } = this.props;
    const id = users
                  && users.allUsers[0]
                  && users.allUsers[0].professional.id;
    const job = jobTitle.title
      ? { jobTitle: { title: jobTitle.title } }
      : { jobTitleId: jobTitle };
    const companyName = company.name
      ? { company: { name: company.name } }
      : { companyId: company };

    return { ...job, ...companyName, id };
  };

  handleDidContinueButtonClick = () => {
    this.props.showSignUpProfessionalUniversity();
  };

  handleSkipButtonClick = () => this.props.showSignUpProfessionalUniversity();

  render() {
    const { jobTitle, company } = this.props.values;
    return (
      <SignUpProfessionalJobContainer
        onContinueButtonClick={this.handleContinueButtonClick}
        onSkip={this.handleSkipButtonClick}
        jobTitle={jobTitle}
        companyName={company}
        {...this.props}
      />
    );
  }
}

const getProfessionalByAuth0Id = gql`
  query allUsers($auth0UserId: String!) {
    allUsers (filter: {auth0UserId: $auth0UserId}) {
      id
      professional {
        id
        job {
          jobTitle { title }
          company { name }
        }
      }
    }
  }
`;

const updateProfessionalJob = gql`
  mutation updateProfessional (
    $id: ID!
    $companyId: ID
    $jobTitleId: ID
    $company: JobcompanyCompany
    $jobTitle: JobjobTitleJobTitle
  ) {
    updateProfessional( id: $id job: {
      jobTitleId: $jobTitleId
      companyId: $companyId
      jobTitle: $jobTitle
      company: $company
    }) {
      id
    }
  }
`;

const mapStateToProps = state => ({ values: state.form });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(formActions, dispatch),
  ...bindActionCreators(modalActions, dispatch)
});

const EnhancedSignUpProfessionalStep2Container = compose(
  graphql(getProfessionalByAuth0Id, {
    name: 'users',
    skip: () => !getCurrentUserData('sub'),
    options: () => ({ variables: { auth0UserId: getCurrentUserData('sub') } })
  }),
  graphql(updateProfessionalJob, { props: ({ mutate }) =>
    ({
      updateProfessionalJob: ({ variables }) => mutate({ variables })
    })
  })
)(SignUpProfessionalStep2Container);

export default
connect(mapStateToProps, mapDispatchToProps)(EnhancedSignUpProfessionalStep2Container);

