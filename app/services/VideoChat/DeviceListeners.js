const camera = ({ VC, vidyoConnector, localCameraViewId, onWindowResize }) => {
  let cameras = [];
  let selectedCamera;

  const handleDidCameraAdd = (localCamera) => {
    cameras = {
      [window.btoa(localCamera.id)]: localCamera,
      ...cameras
    };
  };

  const handleDidCameraRemove = (localCamera) => {
    delete cameras[window.btoa(localCamera.id)];

    if (selectedCamera.id === localCamera.id) {
      VC.hideViewToLocalCamera({
        vidyoConnector,
        viewId: localCameraViewId
      });
    }
  };

  const handleDidCameraSelect = async (localCamera) => {
    if (localCamera) {
      try {
        VC.assignViewToLocalCamera({
          vidyoConnector,
          localCamera,
          viewId: localCameraViewId
        });
        selectedCamera = cameras[window.btoa(localCamera.id)];
        onWindowResize();
      } catch (error) {
        console.log('AssignViewToLocalCamera Failed: ', error);
      }
    }
  };

  const handleDidCameraStateUpdate = (localCamera, state) =>
    console.log('---------Camera state updated: ', localCamera, '----', state);

  return {
    cameras,
    selectedCamera,
    onAdded: handleDidCameraAdd,
    onRemoved: handleDidCameraRemove,
    onSelected: handleDidCameraSelect,
    onStateUpdated: handleDidCameraStateUpdate
  };
};

const microphone = () => {
  let microphones = [];
  let selectedMicrophone;

  const handleDidMicrophoneAdd = (localMicrophone) => {
    microphones = {
      [window.btoa(localMicrophone.id)]: localMicrophone,
      ...microphones
    };
  };
  const handleDidMicrophoneRemove = localMicrophone =>
    delete microphones[window.btoa(localMicrophone.id)];

  const handleDidMicrophoneSelect = (localMicrophone) => {
    if (localMicrophone) {
      selectedMicrophone = microphones[window.btoa(localMicrophone.id)];
    }
  };
  const handleDidMicrophoneStateUpdate = (localMicrophone, state) =>
    console.log('Microphone state update: ', localMicrophone, '----', state);

  return {
    microphones,
    selectedMicrophone,
    onAdded: handleDidMicrophoneAdd,
    onRemoved: handleDidMicrophoneRemove,
    onSelected: handleDidMicrophoneSelect,
    onStateUpdated: handleDidMicrophoneStateUpdate
  };
};

const speaker = () => {
  let speakers = [];
  let selectedSpeaker;

  const handleDidSpeakerAdd = (localSpeaker) => {
    speakers = {
      [window.btoa(localSpeaker.id)]: localSpeaker,
      ...speakers
    };
  };
  const handleDidSpeakerRemove = localSpeaker =>
    delete speakers[window.btoa(localSpeaker.id)];

  const handleDidSpeakerSelect = (localSpeaker) => {
    if (localSpeaker) {
      selectedSpeaker = speakers[window.btoa(localSpeaker.id)];
    }
  };
  const handleDidSpeakerStateUpdate = (localSpeaker, state) =>
    console.log('------------ Speaker state updated: ', localSpeaker, '----', state);

  return {
    speakers,
    selectedSpeaker,
    onAdded: handleDidSpeakerAdd,
    onRemoved: handleDidSpeakerRemove,
    onSelected: handleDidSpeakerSelect,
    onStateUpdated: handleDidSpeakerStateUpdate
  };
};

const remoteCamera = ({ VC, vidyoConnector, remoteCameraViewId, onWindowResize }) => {
  let remoteCameras = [];
  const handleDidRemoteCameraAdd = async (camera, participant) => {
    console.log('Participant added: ', participant);

    remoteCameras = {
      [window.btoa(camera.id)]: camera,
      ...remoteCameras
    };

    try {
      await VC.assignViewToRemoteCamera({
        vidyoConnector,
        remoteCamera: camera,
        viewId: remoteCameraViewId
      });

      onWindowResize();
    } catch (error) {
      delete remoteCameras[window.btoa(camera.id)];
      console.log('Remote camera assign error: ', error);
    }
  };
  const handleDidRemoteCameraRemove = (remoteCamera) => {
    delete remoteCameras[window.btoa(remoteCamera.id)];
    VC.hideViewToRemoteCamera(remoteCameraViewId);
  };

  const handleDidRemoteCameraStateUpdate = (camera, participant, state) =>
    console.log('Remote camera state updated: ', camera, ' ', participant, ' ', state);

  const handleDidRemoteCameraSelect = () => {};

  return {
    remoteCameras,
    onAdded: handleDidRemoteCameraAdd,
    onRemoved: handleDidRemoteCameraRemove,
    onSelected: handleDidRemoteCameraSelect,
    onStateUpdated: handleDidRemoteCameraStateUpdate
  };
};

export {
  camera,
  speaker,
  microphone,
  remoteCamera
};
