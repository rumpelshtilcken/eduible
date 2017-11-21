import { Component } from 'react';
import { connect } from 'react-redux';
import { hoistStatics } from 'recompact';
import { Message } from 'react-chat-ui';
import Head from 'next/head';
import PropTypes from 'prop-types';

import * as videoChatActions from 'actions/videoChat';
import getDisplayName from 'utils/getDisplayName';
import VideoChat, { generateVidyoSDKUrl } from 'services/VideoChat';

// status.downloadPathWebRTCExtension; - Screen share
const setListenerComponent = (ListenerComponent) => {
  window.ListenerComponent = ListenerComponent;
};

// Global function for handling VidyoSDK loading
const handleDidLoadVidyoClient = status =>
  window.ListenerComponent.handleDidLoadVidyoClient(status);

const withVideoChat = hoistStatics((WrappedComponent) => {
  class WithVideoChat extends Component {
    static propTypes = {
      appointment: PropTypes.shape({
        professional: PropTypes.shape({
          user: PropTypes.shape({
            id: PropTypes.string
          })
        }),
        student: PropTypes.shape({
          user: PropTypes.shape({
            id: PropTypes.string
          })
        })
      }),
      videoChat: PropTypes.shape({
        pluginUrl: PropTypes.string,
        vidyoToken: PropTypes.string,
        resourceId: PropTypes.string,
        localCameraViewId: PropTypes.string,
        remoteCameraViewId: PropTypes.string,
        messagesHistory: PropTypes.array,
        participant: PropTypes.shape({
          user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
          }).isRequired
        })
      }),
      update: PropTypes.func.isRequired
    };

    componentWillMount() {
      if (process.browser) {
        setListenerComponent(this);
      }
    }

    shouldComponentUpdate(nextProps) {
      const {
        pluginUrl,
        vidyoToken,
        resourceId,
        localCameraViewId,
        remoteCameraViewId
      } = nextProps.videoChat;

      const {
        pluginUrl: prevPluginUrl,
        vidyoToken: prevVidyoToken,
        resourceId: prevResourceId,
        localCameraViewId: prevLocalCameraViewId,
        remoteCameraViewId: prevRemoteCameraViewId
      } = this.props.videoChat;

      return pluginUrl !== prevPluginUrl
      || vidyoToken !== prevVidyoToken
      || resourceId !== prevResourceId
      || localCameraViewId !== prevLocalCameraViewId
      || remoteCameraViewId !== prevRemoteCameraViewId;
    }

    componentWillUnmount() {
      this.disconnectVideoChat();
    }

    disconnectVideoChat = () => {
      if (window.ListenerComponent && this.videoChat) {
        this.videoChat.disconnect();
        window.ListenerComponent = null;
        this.props.update({ name: 'videoChatState', value: false });
      }
    };

    handleDidLoadVidyoClient = (status) => {
      // TODO: add an error type to the redux state
      switch (status.state) {
        case 'READY':
          this.handleDidVCLoad();
          return;

        case 'RETRYING': // The library operating is temporarily paused
          this.handleVideoChatError(
            `Temporarily unavailable retrying in ${status.nextTimeout / 1000} seconds`
          );
          return;

        case 'FAILED': // The library operating has stopped
          this.handleVideoChatError(`Failed: ${status.description}`);
          return;

        case 'FAILEDVERSION': // The library operating has stopped
          this.handleVideoChatError(`Failed: ${status.description}`);
          // this.props.update({ name: 'pluginUrl', value: getPluginUrl(status) });
          return;

        case 'NOTAVAILABLE': // The library is not available
          this.handleVideoChatError(`Failed: ${status.description}`);
          // this.props.update({ name: 'pluginUrl', value: getPluginUrl(status) });
          return;

        default:
          return 'Unexpected error';
      }
    };

    handleVideoChatError = error =>
      this.props.update({ name: 'videoChatError', value: error });

    handleDidVCLoad = async () => {
      console.log(this.props);
      // const currentUserAuth0UserId = getCurrentUserData('sub');
      // const { student, professional } = this.props.appointment;
      // const { user: { name } } =
      //   AppointmentUtils.getCurrentUser({ student, professional, currentUserAuth0UserId });

      this.videoChat = await VideoChat({
        VC: window.VC,
        displayName: 'Participant',
        vidyoToken: this.props.videoChat.vidyoToken,
        resourceId: this.props.videoChat.resourceId,
        onSuccess: this.handleConnectionSuccess,
        onFailure: this.handleConnectionFailure,
        onDisconnected: this.handleConnectionDisconnect,
        localCameraViewId: this.props.videoChat.localCameraViewId,
        remoteCameraViewId: this.props.videoChat.remoteCameraViewId,
        onChatMessageReceived: this.handleMessageReceive
      }).then(func => func);
    };

    // Connection handler
    handleConnectionSuccess = () => {
      console.log('qwerty: Connect');
      this.props.update({ name: 'videoChatState', value: true });
      this.props.update({ name: 'videoChatStarted', value: new Date() });
    }

    handleConnectionFailure = error =>
      console.log('qwerty: Failure ', error);

    handleConnectionDisconnect = (error) => {
      console.log('qwerty: Disconnect', error);
      this.props.update({ name: 'videoChatEnded', value: new Date() });
    }

    // Chat handler
    handleMessageReceive = (participant, message) => {
      const { id, name } = this.props.videoChat.participant.user;
      this.updateMessageHistory({ id, message: message.body, senderName: name });
    }

    handleMessageSent = (params) => {
      this.videoChat.sendChatMessage(params.message);
      this.updateMessageHistory(params);
    }

    updateMessageHistory = ({ id, message, senderName }) => {
      const nMessage = new Message({ id, message, senderName });
      const { messagesHistory } = this.props.videoChat;
      const messageHistory = messagesHistory
        ? messagesHistory.slice()
        : [];
      messageHistory.push(nMessage);
      this.props.update({ name: 'messagesHistory', value: messageHistory });
    };

    renderVidyoScripts = () => {
      const vidyoSDKScript = generateVidyoSDKUrl();
      return (
        <Head>
          <script src={vidyoSDKScript} />
          <script dangerouslySetInnerHTML={{ __html: `${handleDidLoadVidyoClient}` }} />
        </Head>
      );
    }

    render() {
      return (
        <div>
          {this.renderVidyoScripts()}

          <WrappedComponent
            {...this.props}
            onMessageSent={this.handleMessageSent}
          />
        </div>
      );
    }
  }

  WithVideoChat.displayName = `WithVideoChat(${getDisplayName(WrappedComponent)})`;

  const mapStateToProps = ({ videoChat }) => ({ videoChat });

  return connect(mapStateToProps, videoChatActions)(WithVideoChat);
});

export default withVideoChat;
