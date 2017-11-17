import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

import { getCurrentUserData } from 'utils/auth';
import { StatefulView, VideoChat } from 'components';
import * as videoChatActions from 'actions/videoChat';
import AppointmentUtils from 'utils/AppointmentUtils';
import fetch from 'isomorphic-fetch';
import withVideoChat from 'hoc/withVideoChat';

class VideoChatContainer extends Component {
  static propTypes = {
    videoChat: PropTypes.shape({
      callId: PropTypes.string,
      messagesHistory: PropTypes.array,
      vidyoToken: PropTypes.string
    }),
    appointment: PropTypes.shape({
      id: PropTypes.string.isRequired,
      estimatedLength: PropTypes.number,
      state: PropTypes.string,
      calls: PropTypes.array,
      professional: PropTypes.shape({
        user: PropTypes.shape({
          id: PropTypes.string,
          auth0UserId: PropTypes.string
        })
      }),
      student: PropTypes.shape({
        user: PropTypes.shape({
          id: PropTypes.string,
          auth0UserId: PropTypes.string
        })
      })
    }),
    update: PropTypes.func.isRequired,
    onMessageSent: PropTypes.func.isRequired,
    appointmentLoading: PropTypes.bool,
    appointmentError: PropTypes.string,
    resetValue: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (!this.props.appointmentLoading) {
      this.handleDidAppointmentLoad();
    }
  }

  shouldComponentUpdate(nextProps) {
    const { videoChat, appointment, appointmentLoading, appointmentError } = nextProps;
    const {
      videoChat: prevVideoChat,
      appointment: prevAppointment,
      appointmentLoading: prevAppointmentLoading,
      appointmentError: prevAppointmentError
    } = this.props;
    const { messagesHistory } = nextProps.videoChat;
    const { messagesHistory: prevMessagesHistory } = this.props.videoChat;
    const isMessagesUpdated = (messagesHistory && prevMessagesHistory) ?
      !_.isEqual(messagesHistory.sort(), prevMessagesHistory.sort())
      : true;
    const isVideoChatUpdate = !_.isEqual(videoChat, prevVideoChat);
    const isAppointmentUpdate = !_.isEqual(appointment, prevAppointment);
    const isLoadingUpdate = !_.isEqual(appointmentLoading, prevAppointmentLoading);
    const isErrorUpdate = !_.isEqual(appointmentError, prevAppointmentError);

    return isVideoChatUpdate
    || isAppointmentUpdate
    || isLoadingUpdate
    || isErrorUpdate
    || isMessagesUpdated;
  }

  componentWillUnmount() {
    this.props.resetValue({ name: 'messagesHistory' });
  }

  componentWillReceiveProp(nextProps) {
    const { appointmentLoading } = nextProps.videoChat;
    const { appointmentLoading: prevAppointmentLoading } = this.props;
    if (!appointmentLoading && (prevAppointmentLoading !== appointmentLoading)) {
      this.handleDidAppointmentLoad();
    }
  }

  handleDidAppointmentLoad = async () => {
    try {
      const { appointment } = this.props;
      const { professional, student } = appointment;
      const currentUserAuth0UserId = getCurrentUserData('sub');

      if (!AppointmentUtils.isAppointmentValid({ appointment, currentUserAuth0UserId }) &&
          !AppointmentUtils.isCallValid(this.appointment.calls)) {
        throw new Error('Appointment or calls not valid');
      }

      const callId =
        this.props.appointment.calls.filter(call => call.state === 'Request')[0].id;

      const { user: { id: userId } } =
        AppointmentUtils.getCurrentUser({ student, professional, currentUserAuth0UserId });
      const participant =
        AppointmentUtils.getParticipant({ student, professional, currentUserAuth0UserId });

      if (!userId || !participant) throw new Error('User not loaded');

      const { vidyoToken, resourceId } = await this.generateToken({
        userId,
        expiresInSeconds: (appointment.estimatedLength * 60),
        resourceId: callId
      });

      this.props.update({ name: 'vidyoToken', value: vidyoToken });
      this.props.update({ name: 'resourceId', value: resourceId });
      this.props.update({ name: 'participant', value: participant });
    } catch (err) {
      console.log('qwerty: Appointment error', err);
    }
  }

  generateToken = async ({ userId, expiresInSeconds, resourceId }) => {
    try {
      const res = await fetch('/api/v1/videochat', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName: userId, expiresInSeconds })
      });
      const json = await res.json();
      if (!json.vidyoToken && !resourceId) throw new Error('Token not loaded');
      console.log('qwerty: Token generated ', { vidyoToken: json.vidyoToken, resourceId });
      return { vidyoToken: json.vidyoToken, resourceId };
    } catch (error) {
      throw error;
    }
  };

  handleVideoViewLoaded = ({ localCameraViewId, remoteCameraViewId }) => {
    this.props.update({
      name: 'localCameraViewId',
      value: localCameraViewId
    });
    this.props.update({
      name: 'remoteCameraViewId',
      value: remoteCameraViewId
    });
  };

  handleMessageSent = (params) => {
    this.props.onMessageSent(params);
    const currentUserAuth0UserId = getCurrentUserData('sub');
    const { professional, student, id } = this.props.appointment;
    const senderId = AppointmentUtils.getCurrentUser({
      professional,
      student,
      currentUserAuth0UserId
    }).user.id;
    const recevierId = AppointmentUtils.getParticipant({
      professional,
      student,
      currentUserAuth0UserId
    }).user.id;
    this.props.createMessage({
      senderId,
      recevierId,
      appointmentId: id,
      message: params.message
    });
  };

  render() {
    const {
      appointment,
      appointmentLoading,
      appointmentError
    } = this.props;
    if (appointmentError) return <div>{appointmentError}</div>;

    let companion;
    let userId;
    if (!appointmentLoading) {
      const { student, professional } = appointment;
      const currentUserAuth0UserId = getCurrentUserData('sub');
      companion =
        AppointmentUtils.getParticipant({ student, professional, currentUserAuth0UserId });
      userId =
        AppointmentUtils.getCurrentUser({ student, professional, currentUserAuth0UserId });
    }

    return (
      <StatefulView loading={appointmentLoading}>
        {appointment &&
          <VideoChat
            messages={this.props.videoChat.messagesHistory}
            companion={companion}
            userId={userId}
            appointment={appointment}
            setVideoViewId={this.handleVideoViewLoaded}
            onMessageSent={this.handleMessageSent}
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
        sender { id }
        recevier { id }
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

const createMessage = gql`
  mutation createMessage (
    $message: String!
    $appointmentId: ID!
    $recevierId: ID!
    $senderId: ID!
  ) {
    createMessage (
      message: $message
      appointmentId: $appointmentId
      recevierId: $recevierId
      senderId: $senderId
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
  graphql(createMessage, { props: ({ mutate }) =>
    ({
      createMessage: ({ message, appointmentId, recevierId, senderId }) =>
        mutate({ variables: { message, appointmentId, recevierId, senderId } })
    })
  }),
  graphql(getAppointment, {
    name: 'appointment',
    options: ({ appointmentId }) => ({ variables: { id: appointmentId } }),
    props: ({ appointment: { Appointment, loading, error } }) => ({
      appointment: Appointment,
      appointmentLoading: loading,
      appointmentError: error
    })
  })
)(VideoChatContainer));
