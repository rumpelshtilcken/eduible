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
  headerElements = [
    {
      key: 'ProfesstionalBasicInfo',
      component: (
        <ProfesstionalBasicInfo
          profileName={'Miguela Carbera'}
          profileImageUrl={'/static/miguel.jpg'}
        />
      )
    },
    {
      key: 'ProfesstionalMajorInfo',
      component: <ProfesstionalMajorInfo major={'IT developer'} />,
      hideOnSmallScreen: true
    },
    {
      key: 'ProfesstionalEducationInfo',
      component: <ProfesstionalEducationInfo education={'Hogwards'} />,
      hideOnSmallScreen: true
    },
    {
      key: 'ProfesstionalHourCostInfo',
      component: <ProfesstionalHourCostInfo cost={'$5 per minute'} />
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

CallRequestHeader.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired
};

export default CallRequestHeader;
