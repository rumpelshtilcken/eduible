import { Component } from 'react';
import PropTypes from 'prop-types';

import { PaymentDetails } from 'components';

class PaymentDetailsContainer extends Component {
  handleSubmitButtonClick = () => {};

  render() {
    return (
      <PaymentDetails
        onBackButtonClick={this.props.onBackButtonClick}
        onSubmitButtonClick={this.handleSubmitButtonClick}
      />);
  }
}

PaymentDetailsContainer.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired
};

export default PaymentDetailsContainer;
