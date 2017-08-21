import { Component } from 'react';

import PaymentDetailsContainer from 'containers/PaymentDetailsContainer';

class PaymentDetailsPage extends Component {
  handleBackButtonClick = () => {};

  render() {
    return <PaymentDetailsContainer onBackButtonClick={this.handleBackButtonClick} />;
  }
}

export default PaymentDetailsPage;
