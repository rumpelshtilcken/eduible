import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { getCurrentUserData } from 'utils/auth';
import * as formActions from 'actions/form';
import * as modalActions from 'actions/modal';
import * as snackbarActions from 'actions/snackbar';

import SignUpProfessionalJobContainer from './SignUpProfessionalJobContainer';

class SignUpProfessionalStep2Container extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      professional: PropTypes.shape({
        id: PropTypes.string
      })
    }).isRequired,
    showSnackbar: PropTypes.func,
    updateProfessionalJob: PropTypes.func.isRequired,
    showSignUpProfessionalUniversity: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    reset: PropTypes.func
  };

  state = {
    loading: false
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleContinueButtonClick = async (params) => {
    try {
      this.setState({ loading: true });
      const variables = this.prepareParams(params);
      await this.props.updateProfessionalJob({ variables });
      this.handleDidProfessionalUpdate();
    } catch (err) {
      this.handleProfessionalUpdateError();
    }
  };

  handleDidProfessionalUpdate = () => {
    this.props.showSnackbar({ messageType: 'success', message: 'Success' });
    this.setState({ loading: false });
    this.props.showSignUpProfessionalUniversity({
      professionalId: this.props.user.professional.id
    });
  };

  handleProfessionalUpdateError = () => {
    this.props.showSnackbar({ messageType: 'error', message: 'Server error' });
    this.setState({ loading: false });
  }

  prepareParams = ({ jobTitle, company }) => {
    const { user } = this.props;
    const id = user.professional.id;
    const job = jobTitle.title
      ? { jobTitle: { title: jobTitle.title } }
      : { jobTitleId: jobTitle };
    const companyName = company.name
      ? { company: { name: company.name } }
      : { companyId: company };

    return { ...job, ...companyName, id };
  };

  handleSkipButtonClick = () =>
    this.props.showSignUpProfessionalUniversity({
      professionalId: this.props.user.professional.id
    });

  render() {
    const { jobTitle, company } = this.props.values;
    return (
      <SignUpProfessionalJobContainer
        {...this.props}
        onContinueButtonClick={this.handleContinueButtonClick}
        onSkip={this.handleSkipButtonClick}
        jobTitleTitle={jobTitle}
        companyName={company}
        loading={this.state.loading}
      />
    );
  }
}

const getProfessionalByAuth0Id = gql`
  query User($auth0UserId: String!) {
    User (auth0UserId: $auth0UserId) {
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
  ...bindActionCreators(modalActions, dispatch),
  ...bindActionCreators(snackbarActions, dispatch)
});

const EnhancedSignUpProfessionalStep2Container = compose(
  graphql(getProfessionalByAuth0Id, {
    name: 'user',
    skip: () => !getCurrentUserData('sub'),
    options: () => ({ variables: { auth0UserId: getCurrentUserData('sub') } }),
    props: ({ user }) => ({ user: user.User, error: user.error, loading: user.loading })
  }),
  graphql(updateProfessionalJob, { props: ({ mutate }) =>
    ({
      updateProfessionalJob: ({ variables }) => mutate({ variables })
    })
  })
)(SignUpProfessionalStep2Container);

export default
connect(mapStateToProps, mapDispatchToProps)(EnhancedSignUpProfessionalStep2Container);

