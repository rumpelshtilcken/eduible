import { Component } from 'react';
import PropTypes from 'prop-types';

import { ProfessionalProfileOwner } from 'components';

class ProfessionalProfileOwnerContainer extends Component {
  handleSubmitButtonClick = () => {};

  render() {
    return (
      <ProfessionalProfileOwner />
    );
  }
}

ProfessionalProfileOwnerContainer.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired
};

export default ProfessionalProfileOwnerContainer;
