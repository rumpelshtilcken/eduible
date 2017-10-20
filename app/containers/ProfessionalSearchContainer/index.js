import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { ProfessionalSearch } from 'components';
import * as searchActions from 'actions/search';

import { getProfessionals, getJobTitles, getUniveristies } from './Queries';

class ProfessionalSearchContainer extends Component {
  static propTypes = {
    onProfessionalChoose: PropTypes.func.isRequired,
    onRequestButtonClick: PropTypes.func.isRequired,
    allProfessionals: PropTypes.array,
    allJobTitles: PropTypes.array,
    allUniversities: PropTypes.array,
    searchUpdate: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
    universityId: PropTypes.string,
    jobTitleId: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.object
  };

  handleRangeChange = ({ min, max }) => {
    this.props.searchUpdate({ name: 'priceGte', value: min });
    this.props.searchUpdate({ name: 'priceLte', value: max });
  }

  render() {
    return (
      <ProfessionalSearch
        {...this.props}
        jobTitles={this.props.allJobTitles}
        onJobTitleChoose={this.handleJobTitleChoose}
        onUniversityChoose={this.handleUniversityChoose}
        professionals={this.props.allProfessionals}
        universities={this.props.allUniversities}
        handleRangeChange={this.handleRangeChange}
      />
    );
  }
}

const mapStateToProps = state => state.search;

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(searchActions, dispatch)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getProfessionals, {
    options: ({
      input,
      orderBy,
      universityId,
      majorId,
      companyId,
      jobTitleId,
      priceGte,
      priceLte
    }) => {
      const orOptions = Object.assign({},
        input && { userOptions: { user: { name_contains: input } } },
        input && {
          univerOptions: {
            educations_some: {
              major: {
                school: {
                  university: { name_contains: input }
                }
              }
            }
          }
        },
        input && { companyOptions: { job: { company: { name_contains: input } } } },
        input && { jobOptions: { job: { jobTitle: { title_contains: input } } } },
        input && {
          majorOptions: {
            educations_some: {
              major: { name_contains: input }
            }
          }
        },
      );

      const andOptions = Object.assign({},
        universityId &&
        {
          univerOptions: {
            educations_some: {
              major: {
                school: { university: { id: universityId } }
              }
            }
          }
        },
        majorId && {
          majorOptions: {
            educations_some: {
              majors_some: { id: majorId } }
          }
        },
        companyId && { companyOptions: { job: { company: { id: companyId } } } },
        jobTitleId && { jobOptions: { job: { jobTitle: { id: jobTitleId } } } },
        priceLte && { priceLOptions: { price_lte: priceLte } },
        priceGte && { priceGOptions: { price_gte: priceGte } }
      );

      const OR = Object.keys(orOptions).map(option => ({ ...orOptions[option] }));

      const AND = Object.keys(andOptions).map(option => ({ ...andOptions[option] }));
      if (OR) AND.push({ OR });

      const variables = { filter: { AND } };

      if (orderBy) variables.orderBy = orderBy;

      return { variables };
    },
    props: ({ allProfessionals }) => ({
      allProfessionals: allProfessionals && allProfessionals.allProfessionals,
      loading: !allProfessionals || allProfessionals.loading,
      error: allProfessionals && allProfessionals.error
    }),
    name: 'allProfessionals'
  }),
  graphql(getJobTitles, {
    name: 'allJobTitles',
    props: ({ allJobTitles }) => ({
      allJobTitles: allJobTitles && allJobTitles.allJobTitles
    })
  }),
  graphql(getUniveristies, {
    name: 'allUniversities',
    props: ({ allUniversities }) => ({
      allUniversities: allUniversities && allUniversities.allUniversities
    })
  })
)(ProfessionalSearchContainer);
