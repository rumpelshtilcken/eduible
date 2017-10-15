import { Component } from 'react';
import { compose, graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SignUpProfessionalUniversity } from 'components';
import * as snackbarActions from 'actions/snackbar';

class SignUpProfessionalUniversityFormContainer extends Component {
  static propTypes = {
    universityName: PropTypes.string,
    majorName: PropTypes.string,
    university: PropTypes.shape({
      id: PropTypes.string.isRequired
    }),
    startYear: PropTypes.string,
    endYear: PropTypes.string,
    majors: PropTypes.shape({
      allMajors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired
      })).isRequired
    }),
    onAddButtonClick: PropTypes.func.isRequired,
    onSkip: PropTypes.func.isRequired,
    showSnackbar: PropTypes.func
  };

  handleAddButtonClick = () => {
    if (!this.props.majorName ||
      !this.props.universityName ||
      !this.props.startYear ||
      !this.props.endYear
    ) {
      this.props.showSnackbar({ messageType: 'error', message: 'Fill all fields' });
      return;
    }

    const education = this.prepareParams();
    this.props.onAddButtonClick(education);
  };

  prepareParams = () => {
    const { university, startYear, endYear } = this.props;
    const universityId = university && university.id;

    const education = { startYear, endYear };
    education.major = { name: this.props.majorName };
    education.university = universityId || { name: this.props.universityName };

    return education;
  };

  render() {
    return (
      <SignUpProfessionalUniversity
        {...this.props}
        onAddButtonClick={this.handleAddButtonClick}
      />
    );
  }
}

const getUniversities = gql`
  query getUniversities($universityName: String!) {
    University(name: $universityName) {
      id
    }
  }
`;

export default
compose(
  connect(null, snackbarActions),
  graphql(getUniversities, {
    name: 'university',
    skip: ({ universityName }) => !universityName,
    options: ({ universityName }) => ({ variables: { universityName } }),
    props: ({ university }) => ({ university: university.University })
  })
)(SignUpProfessionalUniversityFormContainer);

