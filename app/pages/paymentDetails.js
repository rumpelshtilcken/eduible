import { Component } from 'react';

import { Layout } from 'components';
import PaymentDetailsContainer from 'containers/PaymentDetailsContainer';

class paymentDetails extends Component {
  handleBackButtonClick = () => {};

  render() {
    return (
      <Layout>
        <PaymentDetailsContainer onBackButtonClick={this.handleBackButtonClick} />
      </Layout>
    );
  }
}

export default paymentDetails;
