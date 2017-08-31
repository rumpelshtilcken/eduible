import { Component } from 'react';
import PropTypes from 'prop-types';

import { ProfessionalProfile } from 'components';

class ProfessionalProfileContainer extends Component {
  handleSubmitButtonClick = () => {};

  render() {
    return (
      <ProfessionalProfile />
    );
  }
}

ProfessionalProfileContainer.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired
};

export default ProfessionalProfileContainer;
