import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { convertDateToISO } from 'utils/auth';
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
    reset: PropTypes.func
  };

  state = {
    loading: false
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleAddButtonClick = async (params) => {
    try {
      this.setState({ loading: true });
      const variables = this.prepareParams(params);
      console.log(variables);
      await this.props.updateProfessional({ variables });
      this.props.showSnackbar({ messageType: 'success', message: 'Success' });
      this.props.hideModal();
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ loading: false });
      this.props.showSnackbar({ messageType: 'error', message: 'Server error' });
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
    ){
      id
    }
  }
`;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(updateProfessional, {
    props: ({ mutate }) => ({
      updateProfessional: ({ variables }) => mutate({
        variables
      })
    })
  })
)(SignUpProfessionalUniversityContainer);
