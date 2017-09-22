import { Component } from 'react';
import PropTypes from 'prop-types';

import { PaymentDetails } from 'components';

class PaymentDetailsContainer extends Component {
  handleRequestCallClick = () => {};

  render() {
    return (
      <PaymentDetails
        onBackButtonClick={this.props.onBackButtonClick}
        onRequestCallClick={this.handleRequestCallClick}
      />
    );
  }
}

PaymentDetailsContainer.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired
};

export default PaymentDetailsContainer;
