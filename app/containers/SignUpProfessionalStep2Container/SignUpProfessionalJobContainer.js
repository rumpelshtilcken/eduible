import { Component } from 'react';
import { compose, graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SignUpProfessionalStep2 } from 'components';
import * as snackbarActions from 'actions/snackbar';

class SignUpProfessionalJobContainer extends Component {
  static propTypes = {
    company: PropTypes.shape({ id: PropTypes.string.isRequired }),
    companyName: PropTypes.string,
    jobTitle: PropTypes.shape({ id: PropTypes.string.isRequired }),
    jobTitleTitle: PropTypes.string,
    onContinueButtonClick: PropTypes.func.isRequired,
    onSkip: PropTypes.func.isRequired,
    showSnackbar: PropTypes.func
  };

  handleContinueButtonClick = () => {
    if (!this.props.jobTitleTitle || !this.props.companyName) {
      this.props.showSnackbar({ messageType: 'error', message: 'Fill all fields' });
      return;
    }

    const job = this.prepareParams();
    this.props.onContinueButtonClick(job);
  };

  prepareParams = () => {
    const { company, jobTitle } = this.props;
    const job = {};
    job.jobTitle = (jobTitle && jobTitle.id) || { title: this.props.jobTitleTitle };
    job.company = (company && company.id) || { name: this.props.companyName };

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
    JobTitle(title: $jobTitle) {
      id 
      title
    }
  }
`;

const getCompany = gql`
  query getCompany($companyName: String!) {
    Company( name: $companyName ) { 
      id 
    }
  }
`;

export default
compose(
  connect(null, snackbarActions),
  graphql(getCompany, {
    name: 'company',
    skip: ({ companyName }) => !companyName,
    options: ({ companyName }) => ({ variables: { companyName } }),
    props: ({ company }) => ({ company: company.Company })
  }),
  graphql(getJobTitle, {
    name: 'jobTitle',
    skip: ({ jobTitleTitle }) => !jobTitleTitle,
    options: ({ jobTitleTitle }) => ({ variables: { jobTitle: jobTitleTitle } }),
    props: ({ jobTitle }) => ({ jobTitle: jobTitle.JobTitle })
  })
)(SignUpProfessionalJobContainer);

