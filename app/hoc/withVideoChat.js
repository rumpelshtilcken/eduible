import { Component } from 'react';
import Head from 'next/head';
import { hoistStatics } from 'recompact';

import VidyoConnector from 'utils/Vidyo/VidyoConnector';
import getDisplayName from 'utils/getDisplayName';

// status.downloadPathWebRTCExtension; - Screen share

// Set component fo
const setListenerComponent = (ListenerComponent) => {
  window.ListenerComponent = ListenerComponent;
};

// Global function for handling VidyoSDK loading
const handleDidLoadVidyoClient = (status) => {
  window.ListenerComponent.handleDidLoadVidyoClient(status);
};

const withVideoChat = hoistStatics((WrappedComponent) => {
  class WithVideoChat extends Component {
    state = {
      scriptVidyoSDK: '',
      pluginUrl: '',
      selectedCamera: {},
      selectedMicrophone: {},
      selectedSpeaker: {},
      participant: {}
    };

    componentWillMount() {
      // should be in container
      // this.generateToken();
      if (process.browser && !this.state.scriptVidyoSDK) {
        setListenerComponent(this);
        this.defineBrowserCompatability();
      }
    }

    handleVideoChatParamsLoad = ({ vidyoToken, resourceId }) => {
      this.vidyoToken = vidyoToken;
      this.resourceId = resourceId;
    };

    handleVideoViewIdLoad = ({ localCameraViewId, remoteCameraViewId }) => {
      this.localCameraViewId = localCameraViewId;
      this.remoteCameraViewId = remoteCameraViewId;
    };

    // VidyoChat vars loaded from database
    vidyoToken = '';
    resourceId = '';

    // devices list
    cameras = {};
    microphones = {};
    speakers = {};
    remoteCameras = {};

    // setted by children
    localCameraViewId = '';
    remoteCameraViewId = '';

    componenWillUnmount() {
      window.ListenerComponent = null;
      window.removeEventListener('resize', this.handleWindowResize);
    }

    defineBrowserCompatability = () => {
      const { isNeedPlugin, isWebrtc } = VidyoConnector.browserCompatability();
      const scriptSrc = VidyoConnector.loadVidyoSDK({
        webrtc: isWebrtc,
        plugin: isNeedPlugin,
        onDidSDKLoad: 'handleDidLoadVidyoClient'
      });
      this.setState({ scriptVidyoSDK: scriptSrc });
    };

    handleDidLoadVidyoClient = (status) => {
      switch (status.state) {
        case 'READY': // The library is operating normally
          // After the VidyoClient is successfully initialized a global VC object will become available
          // All of the VidyoConnector gui and logic is implemented in VidyoConnector.js
          this.connect(window.VC);
          return;

        case 'RETRYING': // The library operating is temporarily paused
          return `Temporarily unavailable retrying in ${status.nextTimeout / 1000} seconds`;

        case 'FAILED': // The library operating has stopped
          return `Failed: ${status.description}`;

        case 'FAILEDVERSION': // The library operating has stopped
          this.setState({ pluginUrl: VidyoConnector.getPluginUrl(status) });
          return `Failed: ${status.description}`;

        case 'NOTAVAILABLE': // The library is not available
          this.setState({ pluginUrl: VidyoConnector.getPluginUrl(status) });
          return `Failed: ${status.description}`;

        default:
          return 'Unexpected error';
      }
    };

    connect = async (VC) => {
      try {
        // create vidyoConnector
        this.vidyoConnector = await VidyoConnector.createVidyoConnector(VC, this);

        // set window resize
        window.addEventListener('resize', this.handleWindowResize);

        // set device listeners
        VidyoConnector.registerDeviceListeners(this.vidyoConnector, this);

        // connect vidyoConnector with Vidyo backend
        VidyoConnector.connectVidyoConnector(this.vidyoConnector, this);
      } catch (error) {
        console.log('Error in component: ', error);
      }
    };

    handleWindowResize = () => {
      // TODO: take dynamic viewId
      if (this.localCameraViewId && this.remoteCameraViewId) {
        this.renderVideoOnViewId(this.localCameraViewId);
        this.renderVideoOnViewId(this.remoteCameraViewId);
      }
      console.log('----------View id are null');
    };

    /** Device handlers */
    // Camera
    handleDidCameraAdd = (localCamera) => {
      this.cameras = {
        [window.btoa(localCamera.id)]: localCamera,
        ...this.cameras
      };
    };

    handleDidCameraRemove = (localCamera) => {
      delete this.cameras[window.btoa(localCamera.id)];

      if (this.state.selectedCamera.id === localCamera.id) {
        VidyoConnector.hideViewToLocalCamera({
          vidyoConnector: this.vidyoConnector,
          viewId: 'renderer0'
        });
      }
    };
    handleDidCameraSelect = async (localCamera) => {
      if (localCamera) {
        try {
          VidyoConnector.assignViewToLocalCamera({
            vidyoConnector: this.vidyoConnector,
            localCamera,
            viewId: 'renderer0'
          });

          this.handleWindowResize();
          this.setState({
            selectedCamera: this.cameras[window.btoa(localCamera.id)]
          });
        } catch (error) {
          console.log('AssignViewToLocalCamera Failed: ', error);
        }
      }
    };
    handleDidCameraStateUpdate = (localCamera, state) =>
      console.log('---------Camera state updated: ', localCamera, '----', state);

    // Microphone
    handleDidMicrophoneAdd = (localMicrophone) => {
      this.microphones = {
        [window.btoa(localMicrophone.id)]: localMicrophone,
        ...this.microphones
      };
    };
    handleDidMicrophoneRemove = localMicrophone =>
      delete this.microphones[window.btoa(localMicrophone.id)];
    handleDidMicrophoneSelect = (localMicrophone) => {
      if (localMicrophone) {
        this.setState({
          selectedMicrophone: this.microphones[window.btoa(localMicrophone.id)]
        });
      }
    };
    handleDidMicrophoneStateUpdate = (localMicrophone, state) =>
      console.log('-----------Microphone state update: ', localMicrophone, '----', state);

    // Speaker
    handleDidSpeakerAdd = (localSpeaker) => {
      this.speakers = {
        [window.btoa(localSpeaker.id)]: localSpeaker,
        ...this.speakers
      };
    };
    handleDidSpeakerRemove = localSpeaker => delete this.speakers[window.btoa(localSpeaker.id)];
    handleDidSpeakerSelect = (localSpeaker) => {
      if (localSpeaker) {
        this.setState({
          selectedSpeaker: this.speakers[window.btoa(localSpeaker.id)]
        });
      }
    };
    handleDidSpeakerStateUpdate = (localSpeaker, state) =>
      console.log('------------ Speaker state updated: ', localSpeaker, '----', state);

    // Remote camera
    handleDidRemoteCameraAdd = async (camera, participant) => {
      console.log('Participant added: ', participant);

      this.remoteCameras = {
        [window.btoa(camera.id)]: camera,
        ...this.remoteCameras
      };

      try {
        await VidyoConnector.assignViewToRemoteCamera({
          vidyoConnector: this.vidyoConnector,
          remoteCamera: camera,
          viewId: 'renderer1'
        });

        this.handleWindowResize();
        this.setState({
          participant
        });
      } catch (error) {
        delete this.remoteCameras[window.btoa(camera.id)];
        console.log('Remote camera assign error: ', error);
      }
    };
    handleDidRemoteCameraRemove = (remoteCamera) => {
      delete this.remoteCameras[window.btoa(remoteCamera.id)];
      VidyoConnector.hideViewToRemoteCamera('renderer1');
    };
    handleDidRemoteCameraStateUpdate = (camera, participant, state) =>
      console.log(
        '------------ Remote camera state updated: ',
        camera,
        ' ---',
        participant,
        '---',
        state
      );

    handleChatMessageReceive = (participant, chatMessage) => {
      /* Message received from other participant */
      console.log('Participant: ', participant, ' Message: ', chatMessage);
    };

    // Handle camera select from UI
    handleCameraSelect = localCameraId => this.changeSelectedCamera(localCameraId);

    changeSelectedCamera = async (localCameraId) => {
      const camera = this.cameras[localCameraId];

      if (camera) {
        try {
          // Hide the view of the previously selected local camera
          await VidyoConnector.hideViewToLocalCamera({
            vidyoConnector: this.vidyoConnector,
            viewId: 'renderer0'
          });

          // Select the newly selected local camera
          // TODO: move to VidyoConnector
          await this.vidyoConnector.SelectLocalCamera({
            localCamera: camera
          });
        } catch (error) {
          console.log('---- Local camera selection error: ', error);
        }
      }
    };

    handleMicrophoneSelect = localMicrophoneId => this.changeSelectedMicrophone(localMicrophoneId);

    changeSelectedMicrophone = async (localMicrophoneId) => {
      const microphone = this.microphones[localMicrophoneId];

      if (microphone) {
        await this.vidyoConnector.SelectLocalMicrophone({
          localMicrophone: microphone
        });
      }
    };

    handleSpeakerSelect = localSpeakerId => this.changeSelectedSpeaker(localSpeakerId);

    changeSelectedSpeaker = async (localSpeakerId) => {
      const speaker = this.speakers[localSpeakerId];

      if (speaker) {
        await this.vidyoConnector.SelectLocalSpeaker({
          localSpeaker: speaker
        });
      }
    };

    sendMessageTest = () => console.log('Message sent') || this.vidyoConnector.SendChatMessage('Hello');

    renderVideoOnViewId = (viewId) => {
      this.vidyoConnector.ShowViewAt(viewId, 0, 0, 0, 0);
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
            devices={{
              cameras: this.cameras,
              microphones: this.microphones,
              speakers: this.speakers,
              remoteCameras: this.remoteCameras
            }}
            selectedDevices={{
              camera: this.state.selectedCamera,
              microphone: this.state.selectedMicrophone,
              speaker: this.state.selectedSpeaker,
              participant: this.state.participant
            }}
            onVideoViewIdLoad={this.handleVideoViewIdLoad}
            onVideoChatParamsLoad={this.handleVideoChatParamsLoad}
            onCameraSelect={this.handleCameraSelect}
            onMicrophoneSelect={this.handleMicrophoneSelect}
            onSpeakerSelect={this.handleSpeakerSelect}
            sendMessageTest={this.sendMessageTest}
            {...this.props}
          />
        </div>
      );
    }
  }

  WithVideoChat.displayName = `WithVideoChat(${getDisplayName(WrappedComponent)})`;

  return WithVideoChat;
});

export default withVideoChat;
