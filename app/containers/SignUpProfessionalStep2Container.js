import { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { SignUpProfessionalStep2 } from 'components';
import * as modalActions from 'actions/modal';
import { getCurrentUserData } from 'utils/auth';

class SignUpProfessionalStep2Container extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      allUsers: PropTypes.arrayOf(PropTypes.shape({
        professional: PropTypes.shape({
          id: PropTypes.string
        })
      }))
    }).isRequired,
    getProfessionalsJob: PropTypes.func.isRequired,
    updateProfessionalJob: PropTypes.func.isRequired,
    showSignUpProfessionalUniversity: PropTypes.func.isRequired
  };

  handleContinueButtonClick = async ({
    jobTitle,
    company
  }) => {
    try {
      const variables = await this.prepareVariables({
        id: this.props.data.allUsers[0].professional.id,
        jobTitle,
        company
      });

      await this.props.updateProfessionalJob({ variables });
      this.props.showSignUpProfessionalUniversity();
    } catch (err) {
      // TODO: show an error
      console.log('Job update error: ', err);
    }
  };

  prepareVariables = async ({ id, jobTitle, company }) => {
    try {
      const professionalJob = await this.props.getProfessionalsJob({
        variables: { jobTitle, company }
      });

      return {
        id,
        job: professionalJob
          ? {
            jobTitleId: professionalJob.jobTitle.id,
            companyId: professionalJob.company.id
          }
          : {
            jobTitle: { title: jobTitle },
            company: { name: company }
          }
      };
    } catch (err) {
      throw err;
    }
  };

  handleSkipButtonClick = () => this.props.showSignUpProfessionalUniversity();

  render() {
    return (
      <SignUpProfessionalStep2
        onContinueButtonClick={this.handleContinueButtonClick}
        onSkip={this.handleSkipButtonClick}
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

const getProfessionalsJob = gql`
  query getProfessionalsJob($jobTitle: String!, $companyName: String!) {
    jobTitle: allJobTitles(filter: {
      title: $jobTitle
    }) {
      id
      title
    }
    company: allCompanies(filter: {
      name: $company
    }) {
      id
      name
    }
  }
`;

const updateProfessionalJob = gql`
  mutation updateProfessional ($id: ID!, $job: ProfessionaljobJob) {
    updateProfessional( id: $id job: $job) {
      id
    }
  }
`;

const EnhancedSignUpProfessionalStep2Container = compose(
  graphql(getProfessionalByAuth0Id, {
    skip: () => !getCurrentUserData('sub'),
    options: () => ({ variables: { auth0UserId: getCurrentUserData('sub') } })
  }),
  graphql(getProfessionalsJob, {
    options: ({ jobTitle, companyName }) => ({ variables: { jobTitle, companyName } })
  }),
  graphql(updateProfessionalJob, { props: ({ mutate }) =>
    ({
      updateProfessionalJob: ({ variables }) => mutate({ variables })
    })
  })
)(SignUpProfessionalStep2Container);

export default
connect(null, modalActions)(EnhancedSignUpProfessionalStep2Container);

