import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

import { getCurrentUserData } from 'utils/auth';
import { StatefulView, VideoChat } from 'components';
import * as videoChatActions from 'actions/videoChat';
import fetch from 'isomorphic-fetch';
import withVideoChat from 'hoc/withVideoChat';

class VideoChatContainer extends Component {
  static propTypes = {
    videoChat: PropTypes.shape({
      callId: PropTypes.string
    }),
    appointment: PropTypes.shape({
      id: PropTypes.string.isRequired,
      estimatedLength: PropTypes.number,
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

  getCallId = async () => {
    try {
      // check existed calls
      if (this.props.appointment.calls) {
        const requestedCall =
        this.props.appointment.calls.filter(call => call.state === 'Request');

        if (requestedCall.length !== 0) {
          return this.props.update({ name: 'callId', value: requestedCall[0].id });
        }
      }

      const {
        id: appointmentId,
        estimatedLength: duration,
        student,
        professional
      } = this.props.appointment;

      const currentAuth0UserId = getCurrentUserData('sub');

      const callerId = currentAuth0UserId === student.user.auth0UserId
        ? student.user.id
        : professional.user.id;

      const recevierId = currentAuth0UserId !== student.user.auth0UserId
        ? student.user.id
        : professional.user.id;
      const res = await this.props.createCall({ appointmentId, duration, callerId, recevierId });

      return this.props.update({ name: 'callId', value: res.data.createCall.id });
    } catch (err) {
      throw err;
    }
  };

  handleAppointmentLoad = () => {
    const { appointment, appointmentLoading, videoChat } = this.props;
    if (!appointmentLoading &&
      process.browser &&
      !videoChat.callId
    ) {
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

      this.handleDidAppointmentLoad();
    }
  };

  handleDidAppointmentLoad = async () => {
    // Appointment loaded
    // TODO: generate token
    try {
      const callId = this.props.videoChat.callId;
      if (!callId) {
        return this.getCallId();
      }
    } catch (err) {
      return err;
    }
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
    const {
      appointment,
      appointmentLoading,
      appointmentError
    } = this.props;
    if (appointmentError) return <div>{appointmentError}</div>;

    this.handleAppointmentLoad();

    let companion;
    if (!appointmentLoading) {
      companion = getCurrentUserData('sub') !== appointment.student.user.auth0UserId
        ? appointment.student
        : appointment.professional;
    }

    return (
      <StatefulView loading={appointmentLoading}>
        {appointment &&
          <VideoChat
            companion={companion}
            appointment={appointment}
            setVideoViewId={this.props.onVideoViewIdLoad}
            sendMessageTest={this.props.sendMessageTest}
          />}
      </StatefulView>
    );
  }
}

const getAppointment = gql`
  query Appointment($id: ID!) {
    Appointment (id: $id) {
      id
      state
      estimatedLength
      calls {
        id
        state
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
        location {
          id
          country
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

const mapStateToProps = ({ videoChat }) => ({ videoChat });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(videoChatActions, dispatch)
});

export default withVideoChat(compose(
  connect(mapStateToProps, mapDispatchToProps),
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
        mutate({ variables: { appointmentId, duration, callerId, recevierId } })
    })
  })
)(VideoChatContainer));
