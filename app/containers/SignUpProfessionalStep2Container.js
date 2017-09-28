import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { SignUpProfessionalStep2 } from 'components';
import * as authActions from 'actions/auth';
import * as modalActions from 'actions/modal';
import { getCurrentUserData } from 'utils/auth';

class SignUpProfessionalStep2Container extends Component {
  handleContinueButtonClick = ({
    jobTitle,
    company
  }) => {
    const variables = {
      id: this.props.data.allUsers[0].professional.id,
      job: {
        jobTitle: { title: jobTitle },
        company: { name: company }
      }
    };

    this.props.updateJobTitle({ variables }).then(
      this.props.showSignUpProfessionalUniversity
    );
  };

  handleSkipButtonClick = () => {
    this.props.showSignUpProfessionalUniversity();
  };

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

SignUpProfessionalStep2Container.propTypes = {
  signupProfessional: PropTypes.func,
  signinLinkedin: PropTypes.func,
  showSignUpProfessionalStep2Modal: PropTypes.func
};

const mapStateToProps = (state) => {
  const { error, timestamp, forgotMsg, loading } = state.auth;
  return {
    error,
    timestamp,
    forgotMsg,
    loading
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authActions, dispatch),
  ...bindActionCreators(modalActions, dispatch)
});

const getProfessionalByAuth0Id = gql`
query allUsers($auth0UserId: String!) {
  allUsers (filter: {auth0UserId: $auth0UserId}) {
    id
    professional {
      id
    }
  }
} 
`;
const SignUpProfessionalStep2ContainerWithQuery = graphql(getProfessionalByAuth0Id, {
  options: props => ({
    variables: {
      auth0UserId: getCurrentUserData('sub')
    }
  })
})(SignUpProfessionalStep2Container);

const updateJobTitle = gql`
  mutation updateProfessional ($id: ID!, $job: ProfessionaljobJob) {
    updateProfessional( id: $id job: $job) {
      id
    }
  } 
`;
const SignUpProfessionalStep2ContainerWithQueryAndMutaion = graphql(updateJobTitle, {
  props: ({ ownProps, mutate }) => ({
    updateJobTitle: ({ variables }) => mutate({
      variables
    })
  })
})(SignUpProfessionalStep2ContainerWithQuery);

export default
connect(mapStateToProps, mapDispatchToProps)(SignUpProfessionalStep2ContainerWithQueryAndMutaion);

