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
    jobTitleId: PropTypes.string
  };

  handleUniversityChoose = universityId => (universityId
    ? this.props.searchUpdate({ name: 'universityId', value: universityId })
    : this.props.resetFilter({ name: 'universityId' }));

  handleJobTitleChoose = jobTitleId => (jobTitleId
    ? this.props.searchUpdate({ name: 'jobTitleId', value: jobTitleId })
    : this.props.resetFilter({ name: 'jobTitleId' }));

  handleSort = by =>
    this.props.searchUpdate({ name: 'orderBy', value: by })

  handleRangeChange = ({ min, max }) => {
    this.props.searchUpdate({ name: 'priceGte', value: min });
    this.props.searchUpdate({ name: 'priceLte', value: max });
  }

  render() {
    return (
      <ProfessionalSearch
        chosenUniversityId={this.props.universityId}
        chosenJoTitleId={this.props.jobTitleId}
        jobTitles={this.props.allJobTitles}
        onJobTitleChoose={this.handleJobTitleChoose}
        onProfessionalChoose={this.props.onProfessionalChoose}
        onRequestButtonClick={this.props.onRequestButtonClick}
        onUniversityChoose={this.handleUniversityChoose}
        professionals={this.props.allProfessionals}
        universities={this.props.allUniversities}
        handleSort={this.handleSort}
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
            majors_some: {
              school: {
                university: {
                  name_contains: input
                }
              }
            }
          }
        },
        input && { companyOptions: { job: { company: { name_contains: input } } } },
        input && { jobOptions: { job: { jobTitle: { title_contains: input } } } },
        input && { majorOptions: { majors_some: { name_contains: input } } },
      );

      const andOptions = Object.assign({},
        universityId &&
        {
          univerOptions: {
            majors_some:
            { school: { university: { id: universityId } } }
          }
        },
        majorId && { majorOptions: { majors_some: { id: majorId } } },
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
      allProfessionals: allProfessionals && allProfessionals.allProfessionals
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
