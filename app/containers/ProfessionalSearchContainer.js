import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { ProfessionalSearch } from 'components';
import * as searchAction from 'actions/search';

class ProfessionalSearchContainer extends Component {
  professions = [
    { value: 'IT Developer', label: 'IT Developer' },
    { value: 'Java Programmer', label: 'Java Programmer' },
    { value: 'PHP Programmer', label: 'PHP Programmer' }
  ];
  universities = [
    { value: 'UHD', label: 'UHD' },
    { value: 'PHD', label: 'PHD' },
    { value: 'MIT', label: 'MIT' }
  ];

  handleSearchChange = (input) => {
    this.props.searchUpdate({ input: input.value });
  };

  render() {
    console.log(this.props.allProfessionals);
    return (
      <ProfessionalSearch
        professionals={this.props.allProfessionals || []}
        professions={this.professions}
        universities={this.universities}
        onSearchChange={this.handleSearchChange}
      />
    );
  }
}

ProfessionalSearchContainer.propTypes = {
  allProfessionals: PropTypes.object,
  searchUpdate: PropTypes.func
};

const getProfessionals = gql`
  query allProfessionals(
    $findInAll: String
  ) {
      allProfessionals(filter: {
        OR: [
          {
            user: {
              name_starts_with: $findInAll
            }
          },
          {
            job: {
              jobTitle: {
                title_starts_with: $findInAll
              }
            }
          },
          {
            job: {
              company: {
                name_starts_with: $findInAll
              }
            }
          },
          {
            majors_some: {
              name_starts_with: $findInAll
            }
          },
          {
            majors_some: {
              school: {
                university: {
                  name_starts_with: $findInAll
                }
              }
            }
          }
        ]
      }) {
        id
        price
        user {
          name
        }
        job {
          jobTitle {title}
          company {name}
        }
        majors {
          school {
            university {
              name
            }
          }
        }
      }
  }
`;

const mapStateToProps = ({ search }) => ({ input: search.input });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(searchAction, dispatch)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getProfessionals, {
    fetchPolicy: 'network-only',
    options: ({
      input,
      majorName,
      universityName,
      userName,
      price,
      jobTitle,
      companyName
    }) => {
      const variables = {};
      if (input) return { variables: { findInAll: input } };
      if (majorName) variables.majorName = majorName;
      if (universityName) variables.universityName = universityName;
      if (userName) variables.userName = userName;
      if (price) variables.price = price;
      if (jobTitle) variables.jobTitle = jobTitle;
      if (companyName) variables.companyName = companyName;

      return { variables };
    },
    props: ({ data }) => ({
      allProfessionals: data && data.allProfessionals
    })
  })
)(ProfessionalSearchContainer);
