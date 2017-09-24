import { Component } from 'react';
import Head from 'next/head';

import withPage from 'hoc/withPage';
import PaymentDetailsContainer from 'containers/PaymentDetailsContainer';

class paymentDetails extends Component {
  handleBackButtonClick = () => {};

  render() {
    return (
      <div>
        <Head>
          <title>{'Payment details'}</title>
        </Head>
        <PaymentDetailsContainer onBackButtonClick={this.handleBackButtonClick} />
      </div>
    );
  }
}

export default withPage(paymentDetails);
