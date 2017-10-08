import { Component } from 'react';
import { compose, graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { SignUpProfessionalUniversity } from 'components';

class SignUpProfessionalUniversityFormContainer extends Component {
  static propTypes = {
    universityName: PropTypes.string,
    majorName: PropTypes.string,
    universities: PropTypes.shape({
      allUniversities: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired
      })).isRequired
    }),
    majors: PropTypes.shape({
      allMajors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired
      })).isRequired
    }),
    onAddButtonClick: PropTypes.func.isRequired,
    onSkip: PropTypes.func.isRequired
  };

  handleAddButtonClick = () => {
    console.log('Press', this.props);
    if (!this.props.majorName || !this.props.universityName) {
      // TODO: handle error
      return;
    }

    const education = this.prepareParams();
    console.log(education);
    this.props.onAddButtonClick(education);
  };

  prepareParams = () => {
    const { universities } = this.props;
    const universityId = universities
                      && universities.allUniversities
                      && universities.allUniversities[0]
                      && universities.allUniversities[0].id;

    const education = {};
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
    allUniversities (filter: { name: $universityName }) {
      id
      name
    }
  }
`;

export default
compose(
  graphql(getUniversities, {
    name: 'universities',
    skip: ({ universityName }) => !universityName,
    options: ({ universityName }) => ({ variables: { universityName } })
  })
)(SignUpProfessionalUniversityFormContainer);

