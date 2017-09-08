import { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Head from 'next/head';

import { VideoBox } from 'components/VideoChat/VChat';

import VidyoConnector from './VidyoConnector';
import VidyoListeners from './VidyoListeners';

const setVideoChatComponent = (Component) => {
  window.VideoChatComponent = Component;
};

const handleDidLoadVidyoClient = (status) => {
  window.VideoChatComponent.handleDidLoadVidyoClient(status);
};

class Vidyo extends Component {
  state = {
    scriptVidyoSDK: '',
    pluginUrl: '',
    selectedCamera: {},
    selectedMicrophone: {},
    selectedSpeaker: {},
    selectedRemoteCameras: {},
    cameras: {},
    microphones: {},
    speakers: {},
    remoteCameras: {}
  };

  // generateToken should be in container
  // setVideoChatComponent and defineBrowserCompatability
  // should live in hoc
  componentDidMount() {
    this.generateToken();
    if (process.browser && !this.state.scriptVidyoSDK) {
      setVideoChatComponent(this);
      this.defineBrowserCompatability();
    }
  }

  // should live to hoc
  componenWillUnmount() {
    window.VideoChatComponent = null;
  }

  // should live to hoc
  defineBrowserCompatability = () => {
    const { isNeedPlugin, isWebrtc } = VidyoConnector.browserCompatability();
    this.setState({
      scriptVidyoSDK: VidyoConnector.loadVidyoClientLibrary({
        webrtc: isWebrtc,
        plugin: isNeedPlugin,
        onDidSDKLoad: 'handleDidLoadVidyoClient'
      })
    });
  };

  // should live in container
  generateToken = async () => {
    try {
      const res = await fetch('/api/v1/videochat', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: 'John',
          expiresInSeconds: 5000
        })
      });

      const json = await res.json();
      this.vidyoToken = json.vidyoToken;
    } catch (error) {
      console.log('Fetch error: ', error);
    }
  };

  // should live in hoc
  connect = async (VC) => {
    try {
      // create vidyoConnector
      this.vidyoConnector = await VidyoConnector.createVidyoConnector(VC, this);

      // set window resize
      VidyoListeners.registerWindowResizeListener(this.handleWindowResize);

      // set device listeners
      VidyoListeners.registerCameraListener(this.vidyoConnector, this);
      VidyoListeners.registerMicrophoneListener(this.vidyoConnector, this);
      VidyoListeners.registerSpeakerListner(this.vidyoConnector, this);
      VidyoListeners.registerRemoteCameraListener(this.vidyoConnector, this);

      // connect vidyoConnector with Vidyo backend
      VidyoConnector.connectVidyoConnector(this.vidyoConnector, this);
    } catch (error) {
      console.log('Error in component: ', error);
    }
  };

  // should live in hoc
  handleDidLoadVidyoClient = (status) => {
    switch (status.state) {
      case 'READY': // The library is operating normally
        // After the VidyoClient is successfully initialized a global VC object will become available
        // All of the VidyoConnector gui and logic is implemented in VidyoConnector.js
        this.connect(window.VC);
        return;

      case 'RETRYING': // The library operating is temporarily paused
        console.log(`Temporarily unavailable retrying in ${status.nextTimeout / 1000} seconds`);
        return `Temporarily unavailable retrying in ${status.nextTimeout / 1000} seconds`;

      case 'FAILED': // The library operating has stopped
        console.log(VidyoConnector.showFailed(status));
        return `Failed: ${status.description}`;

      case 'FAILEDVERSION': // The library operating has stopped
        this.setState({ pluginUrl: VidyoConnector.getPluginUrl(status) });

        console.log(VidyoConnector.showFailedVersion(status));
        return `Failed: ${status.description}`;

      case 'NOTAVAILABLE': // The library is not available
        this.setState({ pluginUrl: VidyoConnector.getPluginUrl(status) });
        console.log(`Failed: ${status.description}`);

        return `Failed: ${status.description}`;

      default:
        return 'Unexpected error';
    }
  };

  // should pass like props to the child component
  // connection state handler
  handleConnectionSuccess = () => {
    /* Connected */
    console.log('-----------------------Success');
  };
  handleConnectionFailure = (reason) => {
    /* Failed */
    console.log('-----------------------Failure: ', reason);
  };

  handleConnectionDisconnect = (reason) => {
    /* Disconnected */
    console.log('-----------------------Disconnect: ', reason);
  };

  // should live in hoc or in lib
  handleWindowResize = () => {
    const rndr = document.getElementById('renderer0');
    this.vidyoConnector.ShowViewAt(
      'renderer0',
      rndr.offsetLeft,
      rndr.offsetTop,
      rndr.offsetWidth,
      rndr.offsetHeight
    );
  };

  // should live in hoc or more appropriate,maybe, in lib
  // device add handler
  handleDidDeviceAdd = (device) => {
    switch (device.objType) {
      case 'VidyoLocalCamera':
        this.updateDeviceList('cameras', device);
        return;
      case 'VidyoLocalMicrophone':
        this.updateDeviceList('microphones', device);
        return;
      case 'VidyoLocalSpeaker':
        this.updateDeviceList('speakers', device);
        return;
      default:
        console.log('Unknown device: ', device);
    }
  };
  updateDeviceList = (deviceType, device) => {
    this.setState({
      [deviceType]: {
        [window.btoa(device.id)]: device,
        ...this.state[deviceType]
      }
    });
  };

  handleDidRemoteCameraAdd = async (camera, participant) => {
    // Store the remote camera for this participant
    this.setState({
      remoteCameras: {
        [participant.id]: { camera, isRendered: true },
        ...this.state.remoteCameras
      }
    });

    const retValue = await this.vidyoConnector.AssignViewToRemoteCamera({
      viewId: `renderer${1}`,
      remoteCamera: camera,
      displayCropped: false,
      allowZoom: false
    });

    // TODO: catch retValue success and error behavior

    const rndr = document.getElementById('renderer1');
    this.vidyoConnector.ShowViewAt(
      'renderer1',
      rndr.offsetLeft,
      rndr.offsetTop,
      rndr.offsetWidth,
      rndr.offsetHeight
    );
  };

  // device remove handlers
  handleDidCameraRemove = (localCamera) => {
    const cameras = this.state.cameras.slice();
    cameras.splice(window.btoa(localCamera.id));
    this.setState({ cameras });
  };
  handleDidMicrophoneRemove = (localMicrophone) => {
    const microphones = this.state.microphones.slice();
    microphones.splice(window.btoa(localMicrophone.id));
    this.setState({ microphones });
  };
  handleDidSpeakerRemove = (localSpeaker) => {
    const speakers = this.state.speakers.slice();
    speakers.splice(window.btoa(localSpeaker.id));
    this.setState({ speakers });
  };
  handleDidRemoteCameraRemove = (localRemoteCamera) => {
    const remoteCameras = this.state.remoteCameras.slice();
    remoteCameras.splice(window.btoa(localRemoteCamera.id));
    this.setState({ remoteCameras });
  };

  // device select handlers
  handleDidCameraSelect = async (localCamera) => {
    if (localCamera) {
      try {
        await this.vidyoConnector.AssignViewToLocalCamera({
          viewId: 'renderer0',
          localCamera,
          displayCropped: true,
          allowZoom: false
        });

        this.handleWindowResize();
        this.setState({
          selectedCamera: this.state.cameras[window.btoa(localCamera.id)]
        });

        console.log('AssignViewToLocalCamera Success in onSelect');
      } catch (error) {
        console.log('AssignViewToLocalCamera Failed: ', error);
      }
    }
  };

  handleDidMicrophoneSelect = async (localMicrophone) => {
    if (localMicrophone) {
      this.setState({
        selectedMicrophone: this.state.microphones[window.btoa(localMicrophone.id)]
      });
    }
  };

  handleDidSpeakerSelect = async (localSpeaker) => {
    if (localSpeaker) {
      this.setState({
        selectedMicrophone: this.state.microphones[window.btoa(localSpeaker.id)]
      });
    }
  };

  handleDidRemoteCameraSelect = async (camera, participant) => {
    // Store the remote camera for this participant
    this.setState({
      selectedRemoteCameras: {
        [participant.id]: camera
      }
    });

    try {
      // Scan through the renderer slots and look for an open slot.
      // If an open slot is found then assign it to the remote camera.
      const retValue = await this.vidyoConnector.AssignViewToRemoteCamera({
        viewId: `${participant.id}`,
        remoteCamera: camera,
        displayCropped: true,
        allowZoom: false
      });

      console.log(`AssignViewToRemoteCamera ${participant.id} to slot ${retValue}`);
      // TODO: Render participants screen
    } catch (error) {
      console.log('AssignViewToRemoteCamera Failed: ', error);
    }
  };

  handleDidCameraStateUpdate = localCamera => console.log('Camera state update: ', localCamera);
  handleDidMicrophoneStateUpdate = localMicrophone =>
    console.log('Microphone state update: ', localMicrophone);
  handleDidSpeakerStateUpdate = localCamera => console.log('Camera state update: ', localCamera);
  handleDidRemoteCameraStateUpdate = localRemoteCamera =>
    console.log('RemoteCamera state update: ', localRemoteCamera);

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
        {this.state.pluginUrl && <a href={this.state.pluginUrl}>Plugin</a>}

        <VideoBox />
      </div>
    );
  }
}

export default Vidyo;
