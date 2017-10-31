import { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import withPage from 'hoc/withPage';
import VideoChatContainer from 'containers/VideoChatContainer';

class VideoChatPage extends Component {
  static propTypes = {
    url: PropTypes.shape({
      query: PropTypes.shape({
        appointmentId: PropTypes.string.isRequired
      })
    })
  };

  handleDidAppointmentEnd = () => {
    // TODO: navigate to payment page
  };

  render() {
    const { appointmentId } = this.props.url.query;

    return (
      <div>
        <Head>
          <title>{'Video chat'}</title>
        </Head>
        <VideoChatContainer
          appointmentId={appointmentId}
        />
      </div>
    );
  }
}

export default withPage(VideoChatPage);
