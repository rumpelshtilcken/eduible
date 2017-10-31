import { graphql, gql, compose } from 'react-apollo';
import { Component } from 'react';
import PropTypes from 'prop-types';

import { getCurrentUserData } from 'utils/auth';
import { StatefulView, VideoChat } from 'components';
import fetch from 'isomorphic-fetch';
import withVideoChat from 'hoc/withVideoChat';

class VideoChatContainer extends Component {
  static propTypes = {
    appointment: PropTypes.shape({
      state: PropTypes.string,
      professional: PropTypes.shape({
        user: PropTypes.shape({
          auth0UserId: PropTypes.string
        })
      }),
      student: PropTypes.shape({
        user: PropTypes.shape({
          auth0UserId: PropTypes.string
        })
      })
    }),
    appointmentLoading: PropTypes.bool,
    appointmentError: PropTypes.string
  };

  componentDidMount() {
    this.generateToken();
  }

  componentWillReceiveProps(nextProps) {
    const { appointment, appointmentLoading } = nextProps;
    if (!appointmentLoading) {
      const { student, professional } = appointment;
      const currentUserId = getCurrentUserData('sub');

      if (student.user.auth0UserId !== currentUserId &&
          professional.user.auth0UserId !== currentUserId) {
        // TODO: wrong appointmentId
        return;
      }

      if (appointment.state !== 'Approve') {
        // TODO: not approved appointment
        return;
      }

      this.handleAppointmentLoad();
    }
  }

  // getCallId = () => {

  // };

  handleAppointmentLoad = () => {
    // Appointment loaded
    // TODO: create call
    // TODO: create conversation
    // TODO: generate token
    // const callId = this.getCallId();
  };

  generateToken = async ({ userName, expiresInSeconds, resourceId }) => {
    try {
      const res = await fetch('/api/v1/videochat', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, expiresInSeconds })
      });

      const json = await res.json();
      this.props.onVideoChatParamsLoad({ vidyoToken: 'json.vidyoToken', resourceId });
    } catch (error) {
      console.log('Fetch error: ', error);
    }
  };

  render() {
    const { appointmentLoading, appointmentError } = this.props;
    if (appointmentError) return <div>{appointmentError}</div>;

    return (
      <StatefulView loading={appointmentLoading}>
        <VideoChat
          user={this.user}
          setVideoViewId={this.props.onVideoViewIdLoad}
          devices={this.props.devices}
          selectedDevices={this.props.selectedDevices}
          sendMessageTest={this.props.sendMessageTest}
        />
      </StatefulView>
    );
  }
}

const getAppointment = gql`
  query Appointment($id: ID!) {
    Appointment (id: $id) {
      id
      state
      call {
        id
      }
      messages {
        id
        message
      }
      professional {
        id
        user { 
          id
          auth0UserId
          name
        }
      }
      student {
        id 
        user {
          id
          auth0UserId
          name
        }
      }
    }
  }
`;

const createCall = gql`
  mutation createCall (
    $appointmentId: ID!
    $duration: Float!
    $callerId: ID!
    $recevierId: ID!
  ) {
    createCall (
      appointmentId: $appointmentId
      duration: $duration
      callerId: $callerId
      recevierId: $recevierId
    ) {
      id
    }
  }
`;

export default withVideoChat(
  compose(
    graphql(getAppointment, {
      name: 'appointment',
      options: ({ appointmentId }) => ({ variables: { id: appointmentId } }),
      props: ({ appointment: { Appointment, loading, error } }) => ({
        appointment: Appointment,
        appointmentLoading: loading,
        appointmentError: error
      })
    }),
    graphql(createCall, {
      props: ({ mutate }) => ({
        createCall: ({ appointmentId, duration, callerId, recevierId }) =>
          mutate({ appointmentId, duration, callerId, recevierId })
      })
    })
  ))(VideoChatContainer);
