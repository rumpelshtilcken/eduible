/* eslint-disable */
import { Component } from 'react';
import { connect } from 'react-redux';
import { hoistStatics } from 'recompact';
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
      }
    };

    componentWillMount() {
      if (process.browser && !this.props.videoChat.scriptVidyoSDK) {
        setListenerComponent(this);
        this.loadVidyoSDK();
      }
    }

    componentWillUnmount() {
      this.disconnectVideoChat();
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
          return;

        case 'RETRYING': // The library operating is temporarily paused
          return `Temporarily unavailable retrying in ${status.nextTimeout / 1000} seconds`;

        case 'FAILED': // The library operating has stopped
          return `Failed: ${status.description}`;

        case 'FAILEDVERSION': // The library operating has stopped
          this.setState({ pluginUrl: getPluginUrl(status) });
          return `Failed: ${status.description}`;

        case 'NOTAVAILABLE': // The library is not available
          this.setState({ pluginUrl: getPluginUrl(status) });
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

    handleConnectFailure = () => {
      console.log('qwerty: Failure');
    };

    // Chat handler
    sendMessage = message =>
      this.vidyoConnector.sendChatMessage(message);

    listeners = [];

    handleMessageReceive = (participant, chatMessage) => {
      console.log('qwerty: Message receive', participant, chatMessage);
      this.listeners.map(l => l(participant, chatMessage));
    };

    subscribeOnMessageReceive = (listener) => {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l === listener);
      };
    };

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
            subscribeOnMessageReceive={this.listeners}
            sendMessage={this.sendMessage}
            {...this.props}
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
