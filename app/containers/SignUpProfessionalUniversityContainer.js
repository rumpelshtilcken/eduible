import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { getCurrentUserData } from 'utils/auth';
import { SignUpProfessionalUniversity } from 'components';
import * as authActions from 'actions/auth';
import * as modalActions from 'actions/modal';

class SignUpProfessionalUniversityContainer extends Component {
  handleContinueButtonClick = ({
    university,
    major
  }) => {
    const variables = {
      id: this.props.data.allUsers[0].professional.id,
      majors: [{
        name: major,
        school: {
          name: '',
          university: {
            name: university
          }
        }
      }]
    };

    this.props.updateProfessional({ variables }).then(
      this.props.hideModal
    );
  };

  handleSkipButtonClick = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <SignUpProfessionalUniversity
        onAddButtonClick={this.handleAddButtonClick}
        onSkip={this.handleSkipButtonClick}
        {...this.props}
      />
    );
  }
}

SignUpProfessionalUniversityContainer.propTypes = {
  signupProfessional: PropTypes.func,
  signinLinkedin: PropTypes.func,
  hideModal: PropTypes.func,
  data: PropTypes.object,
  updateProfessional: PropTypes.func
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
const SignUpProfessionalUniversityWithQuery = graphql(getProfessionalByAuth0Id, {
  options: () => ({
    variables: {
      auth0UserId: getCurrentUserData('sub')
    }
  })
})(SignUpProfessionalUniversityContainer);

const updateProfessional = gql`
  mutation updateProfessional ($id: ID!, $majors: [ProfessionalmajorsMajor!]) {
    updateProfessional( id: $id majors: $majors ) {
      id
      majors
    }
  } 
`;
const SignUpProfessionalUniversityWithQueryAndMutaion = graphql(updateProfessional, {
  props: ({ ownProps, mutate }) => console.log(ownProps) || ({
    updateProfessional: ({ variables }) => mutate({
      variables
    })
  })
})(SignUpProfessionalUniversityWithQuery);

export default connect(null, mapDispatchToProps)(SignUpProfessionalUniversityWithQueryAndMutaion);

