import { Component } from 'react';
import PropTypes from 'prop-types';

import { BookingHeader } from 'components';

import {
  ProfesstionalBasicInfo,
  ProfesstionalEducationInfo,
  ProfesstionalHourCostInfo,
  ProfesstionalMajorInfo
} from './CallRequestHeaderElements';

class CallRequestHeader extends Component {
  propTypes = {
    professional: PropTypes.shape({
      price: PropTypes.number,
      user: PropTypes.shape({ name: PropTypes.string.isRequired }),
      educations: PropTypes.arrayOf({
        startYear: PropTypes.date,
        endYear: PropTypes.date,
        major: PropTypes.shape({
          name: PropTypes.string.isRequired,
          school: PropTypes.shape({
            university: PropTypes.shape({ name: PropTypes.string.isRequired })
          })
        })
      }),
      job: PropTypes.shape({
        jobTitle: PropTypes.shape({ title: PropTypes.string.isRequired }),
        company: PropTypes.shape({ name: PropTypes.string.isRequired })
      })
    }),
    onBackButtonClick: PropTypes.func.isRequired
  };

  headerElements = [
    {
      key: 'ProfesstionalBasicInfo',
      component: (
        <ProfesstionalBasicInfo
          user={this.props.professional.user}
          profileName={this.props.professional.user.name}
        />
      )
    },
    {
      key: 'ProfesstionalMajorInfo',
      component: <ProfesstionalMajorInfo
        major={this.props.professional.job && this.props.professional.job.jobTitle &&
          this.props.professional.job.jobTitle.title
        }
      />,
      hideOnSmallScreen: true
    },
    {
      key: 'ProfesstionalEducationInfo',
      component: <ProfesstionalEducationInfo
        education={this.props.professional.educations && this.props.professional.educations[0] &&
            this.props.professional.educations[0].major.school.university.name}
        startYear={this.props.professional.educations && this.props.professional.educations[0] &&
          this.props.professional.educations[0].startYear}
        endYear={this.props.professional.educations && this.props.professional.educations[0] &&
            this.props.professional.educations[0].endYear}
      />,
      hideOnSmallScreen: true
    },
    {
      key: 'ProfesstionalHourCostInfo',
      component: <ProfesstionalHourCostInfo
        price={this.props.professional.price}
      />
    }
  ];

  render() {
    return (
      <BookingHeader
        elements={this.headerElements}
        onBackButtonClick={this.props.onBackButtonClick}
      />
    );
  }
}

export default CallRequestHeader;
