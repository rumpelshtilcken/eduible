import { Component } from 'react';
import { connect } from 'react-redux';
import { hoistStatics } from 'recompact';
import { Message } from 'react-chat-ui';
import Head from 'next/head';
import PropTypes from 'prop-types';

import * as videoChatActions from 'actions/videoChat';
import getDisplayName from 'utils/getDisplayName';
import VideoChat, { generateVidyoSDKUrl, getPluginUrl } from 'services/VideoChat';

// status.downloadPathWebRTCExtension; - Screen share

const setListenerComponent = (ListenerComponent) => {
  window.ListenerComponent = ListenerComponent;
};

// Global function for handling VidyoSDK loading
const handleDidLoadVidyoClient = (status) => {
  window.ListenerComponent.handleDidLoadVidyoClient(status);
};

const withVideoChat = hoistStatics((WrappedComponent) => {
  class WithVideoChat extends Component {
    static propTypes = {
      videoChat: {
        scriptVidyoSDK: PropTypes.string,
        pluginUrl: PropTypes.string,
        selectedCamera: PropTypes.object,
        selectedMicrophone: PropTypes.object,
        selectedSpeaker: PropTypes.object,
        participant: PropTypes.object,
        vidyoToken: PropTypes.string,
        resourceId: PropTypes.string,
        cameras: PropTypes.arrayOf(PropTypes.object),
        microphones: PropTypes.arrayOf(PropTypes.object),
        speakers: PropTypes.arrayOf(PropTypes.object),
        remoteCameras: PropTypes.arrayOf(PropTypes.object),
        localCameraViewId: PropTypes.string,
        remoteCameraViewId: PropTypes.string
      },
      update: PropTypes.func.isRequired
    };

    componentWillMount() {
      if (process.browser && !this.props.videoChat.scriptVidyoSDK) {
        setListenerComponent(this);
        this.loadVidyoSDK();
      }
    }

    componentWillUnmount() {
      this.disconnectVideoChat();
      this.props.update({ name: 'videoChatState', value: true });
    }

    disconnectVideoChat = async () => {
      console.log('====================================');
      console.log();
      console.log('====================================');
      console.log('====================================');
      console.log();
      console.log('====================================');
      console.log('====================================');
      console.log('qwerty', this.videoChat);
      console.log('====================================');
      this.videoChat.disconnect();
      window.ListenerComponent = null;
    };

    loadVidyoSDK = () => {
      const scriptSrc = generateVidyoSDKUrl(handleDidLoadVidyoClient);
      this.setState({ scriptVidyoSDK: scriptSrc });
    };

    handleDidLoadVidyoClient = (status) => {
      switch (status.state) {
        case 'READY':
          this.handleDidVCLoad();
          this.props.update({ name: 'videoChatState', value: true });
          return;

        case 'RETRYING': // The library operating is temporarily paused
          this.props.update({ name: 'videoChatState', value: false });
          return `Temporarily unavailable retrying in ${status.nextTimeout / 1000} seconds`;

        case 'FAILED': // The library operating has stopped
          this.props.update({ name: 'videoChatState', value: false });
          return `Failed: ${status.description}`;

        case 'FAILEDVERSION': // The library operating has stopped
          this.props.update({ name: 'videoChatState', value: false });
          this.setState({ pluginUrl: getPluginUrl(status) });
          return `Failed: ${status.description}`;

        case 'NOTAVAILABLE': // The library is not available
          this.props.update({ name: 'videoChatState', value: false });
          this.setState({ pluginUrl: getPluginUrl(status) });
          return `Failed: ${status.description}`;

        default:
          return 'Unexpected error';
      }
    };

    handleDidVCLoad = async () => {
      console.log('qwerty: ', this.props);
      this.videoChat = await VideoChat({
        VC: window.VC,
        vidyoToken: this.props.videoChat.vidyoToken,
        resourceId: this.props.videoChat.resourceId,
        onSuccess: this.handleConnectSuccess,
        onFailure: this.handleConnectFailure,
        onDisconnected: this.handleConnectDisconnect,
        localCameraViewId: this.props.videoChat.localCameraViewId,
        remoteCameraViewId: this.props.videoChat.remoteCameraViewId,
        onChatMessageReceived: this.handleMessageReceive
      }).then(func => func);
    };

    // Connection handler
    handleConnectSuccess = () => {
      console.log('qwerty: Connect');
    };

    handleConnectFailure = (sss, sds) => {
      console.log('qwerty: Failure ', sss, sds);
    };

    handleConnectDisconnect = () => {};

    // Chat handler
    sendMessage = message => console.log('qwerty: hoc', this.videoChat, message) ||
      this.videoChat.sendChatMessage(message);

    handleMessageReceive = (participant, message) => {
      console.log('qwerty: Message receive', participant, message);
      const { id, name } = this.props.videoChat.participant.user;
      const { messagesHistory } = this.props.videoChat;
      const nMessage = new Message({ id, message, senderName: name });
      const messageHistory = messagesHistory
        ? messagesHistory.slice()
        : [];
      messageHistory.push(nMessage);
      this.props.update({ name: 'messagesHistory', value: messageHistory });
    }

    handleMessageSent = ({ id, message, senderName }) => {
      console.log('qwerty: Message send', message);
      const nMessage = new Message({ id, message, senderName });
      const { messagesHistory } = this.props.videoChat;
      const messageHistory = messagesHistory
        ? messagesHistory.slice()
        : [];
      messageHistory.push(nMessage);
      this.props.update({ name: 'messagesHistory', value: messageHistory });
    }

    render() {
      return (
        <div>
          <Head>
            <script src={this.state.scriptVidyoSDK} />
            <script
              dangerouslySetInnerHTML={{
                __html: `${handleDidLoadVidyoClient}`
              }}
            />
          </Head>

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
