import { Component } from 'react';
import Head from 'next/head';

import withAuth from 'hoc/withAuth';
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

export default withAuth(withPage(paymentDetails));
