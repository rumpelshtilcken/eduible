import { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import withPage from 'hoc/withPage';
import CallRequestContainer from 'containers/CallRequestContainer';

class CallRequest extends Component {
  static propTypes = {
    url: PropTypes.shape({
      query: PropTypes.shape({
        professionalId: PropTypes.string.isRequired
      })
    })
  };

  handleBackButtonClick = () => {
    window.history.back();
  };

  render() {
    console.log(this.props.url);
    return (
      <div>
        <Head>
          <title>{'Call request'}</title>
        </Head>
        <CallRequestContainer onBackButtonClick={this.handleBackButtonClick} />
      </div>
    );
  }
}

export default withPage(CallRequest);

