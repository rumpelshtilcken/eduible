import { Component } from 'react';
import { compose, graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { SignUpProfessionalStep2 } from 'components';

class SignUpProfessionalJobContainer extends Component {
  static propTypes = {
    jobTitle: PropTypes.string,
    companyName: PropTypes.string,
    jobTitles: PropTypes.shape({
      allJobTitles: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired
      })).isRequired
    }),
    companies: PropTypes.shape({
      allCompanies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired
      })).isRequired
    }),
    onContinueButtonClick: PropTypes.func.isRequired,
    onSkip: PropTypes.func.isRequired
  };

  handleContinueButtonClick = () => {
    if (!this.props.jobTitle || !this.props.companyName) {
      // TODO: handle error
      return;
    }

    const job = this.prepareParams();

    this.props.onContinueButtonClick(job);
  };

  prepareParams = () => {
    const { companies, jobTitles } = this.props;
    const companyId = companies
                      && companies.allCompanies
                      && companies.allCompanies[0]
                      && companies.allCompanies[0].id;
    const jobTitleId = jobTitles
                      && jobTitles.allJobTitles
                      && jobTitles.allJobTitles[0]
                      && jobTitles.allJobTitles[0].id;

    const job = {};
    job.jobTitle = jobTitleId || { title: this.props.jobTitle };
    job.company = companyId || { name: this.props.companyName };

    return job;
  };

  render() {
    return (
      <SignUpProfessionalStep2
        {...this.props}
        onContinueButtonClick={this.handleContinueButtonClick}
        onSkip={this.props.onSkip}
      />
    );
  }
}

const getJobTitle = gql`
  query getJobTitle($jobTitle: String!) {
    allJobTitles(filter: {
      title: $jobTitle
    }) {
      id
      title
    }
  }
`;

const getCompany = gql`
  query getCompany($companyName: String!) {
    allCompanies(filter: {
      name: $companyName
    }) {
      id
      name
    }
  }
`;

export default
compose(
  graphql(getCompany, {
    name: 'companies',
    skip: ({ companyName }) => !companyName,
    options: ({ companyName }) => ({ variables: { companyName } })
  }),
  graphql(getJobTitle, {
    name: 'jobTitles',
    skip: ({ jobTitle }) => !jobTitle,
    options: ({ jobTitle }) => ({ variables: { jobTitle } })
  })
)(SignUpProfessionalJobContainer);

