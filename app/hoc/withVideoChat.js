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

    disconnectVideoChat = async () => {
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
          this.props.update({ name: 'videoChatState', value: false });
          return `Temporarily unavailable retrying in ${status.nextTimeout / 1000} seconds`;

        case 'FAILED': // The library operating has stopped
          this.props.update({ name: 'videoChatState', value: false });
          return `Failed: ${status.description}`;

        case 'FAILEDVERSION': // The library operating has stopped
          this.props.update({ name: 'videoChatState', value: false });
          // this.props.update({ name: 'pluginUrl', value: getPluginUrl(status) });
          return `Failed: ${status.description}`;

        case 'NOTAVAILABLE': // The library is not available
          this.props.update({ name: 'videoChatState', value: false });
          // this.props.update({ name: 'pluginUrl', value: getPluginUrl(status) });
          return `Failed: ${status.description}`;

        default:
          return 'Unexpected error';
      }
    };

    handleDidVCLoad = async () => {
      this.videoChat = await VideoChat({
        VC: window.VC,
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
    }

    handleConnectionFailure = error =>
      console.log('qwerty: Failure ', error);

    handleConnectionDisconnect = (error) => {
      console.log('qwerty: Disconnect', error);
    }

    // Chat handler
    handleMessageReceive = (participant, message) => {
      console.log('qwerty: Message receive', participant, message);
      const { id, name } = this.props.videoChat.participant.user;
      this.updateMessageHistory({ id, message: message.body, senderName: name });
    }

    handleMessageSent = (params) => {
      console.log('qwerty: Message send', params.message);
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
          <script
            dangerouslySetInnerHTML={{ __html: `${handleDidLoadVidyoClient}` }}
          />
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
