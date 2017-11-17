import VidyoConnector from './VidyoConnector';

import { camera, microphone, speaker, remoteCamera } from './DeviceListeners';

const generateVidyoSDKUrl = () => VidyoConnector.generateVidyoSDKUrl({
  onDidSDKLoad: 'handleDidLoadVidyoClient'
});

const getPluginUrl = status => VidyoConnector.getPluginUrl(status);

const VideoChat = async ({
  VC,
  displayName,
  vidyoToken,
  resourceId,
  onSuccess,
  onFailure,
  onDisconnected,
  localCameraViewId,
  remoteCameraViewId,
  onChatMessageReceived
}) => {
  try {
    // create vidyoConnector
    let vidyoConnector = await VidyoConnector.createVidyoConnector(VC);
    console.log('qwerty: ', vidyoConnector);
    // UI handler
    const renderVideoOnViewId = (viewId) => {
      vidyoConnector.ShowViewAt(viewId, 0, 0, 0, 0);
    };

    const handleWindowResize = () => {
      if (localCameraViewId && remoteCameraViewId) {
        renderVideoOnViewId(localCameraViewId);
        renderVideoOnViewId(remoteCameraViewId);
      }
    };

    // window resize listener
    window.addEventListener('resize', handleWindowResize);

    /** Device handlers */
    const cameraListeners =
      camera({
        VC: VidyoConnector,
        vidyoConnector,
        localCameraViewId,
        onWindowResize: handleWindowResize
      });
    const microphoneListeners = microphone();
    const speakerListeners = speaker();
    const remoteCameraListeners =
      remoteCamera({
        VC: VidyoConnector,
        vidyoConnector,
        remoteCameraViewId,
        onWindowResize: handleWindowResize
      });

    // set device listeners
    VidyoConnector.registerDeviceListeners(vidyoConnector, {
      cameraListeners,
      microphoneListeners,
      speakerListeners,
      remoteCameraListeners,
      chatListener: { onChatMessageReceived }
    });

    console.log('qwerty: Token', vidyoToken);

    // connect vidyoConnector with Vidyo backend
    VidyoConnector.connectVidyoConnector(vidyoConnector, {
      displayName,
      resourceId,
      vidyoToken,
      onSuccess: onSuccess || (() => {}),
      onFailure: onFailure || (() => {}),
      onDisconnected: onDisconnected || (() => {})
    });

    return {
      sendChatMessage: message => vidyoConnector.SendChatMessage(message),
      disconnect: async () => {
        window.removeEventListener('resize', handleWindowResize);
        await vidyoConnector.Disconnect();
        await vidyoConnector.Destruct();
        vidyoConnector = null;
      }
    };
  } catch (err) { throw err; }
};

export { generateVidyoSDKUrl, getPluginUrl };
export default VideoChat;
