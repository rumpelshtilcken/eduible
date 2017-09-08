/* 
  Register all listeners

  All function, except window resize, take two arguments: 
    1. vidyoConnector
    2. ListenerComponent - should contain appropriate handler
*/
const VidyoListeners = {
  registerWindowResizeListener: (onWindowResize) => {
    // Handle window resize
    window.onresize = () => {
      onWindowResize();
    };
  },

  // Handle appearance and disappearance of camera devices in the system
  registerCameraListener: async (vidyoConnector, ListenerComponent) => {
    try {
      const result = await vidyoConnector.RegisterLocalCameraEventListener({
        onAdded: ListenerComponent.handleDidCameraAdd,
        onRemoved: ListenerComponent.handleDidCameraRemove,
        onSelected: ListenerComponent.handleDidCameraSelect,
        onStateUpdated: ListenerComponent.handleDidCameraStateUpdate
      });

      return result;
    } catch (error) {
      return error;
    }
  },

  // Handle appearance and disappearance of microphone devices in the system
  registerMicrophoneListener: async (vidyoConnector, ListenerComponent) => {
    try {
      const result = await vidyoConnector.RegisterLocalMicrophoneEventListener({
        onAdded: ListenerComponent.handleDidMicrophoneAdd,
        onRemoved: ListenerComponent.handleDidMicrophoneRemove,
        onSelected: ListenerComponent.handleDidMicrophoneSelect,
        onStateUpdated: ListenerComponent.handleDidMicrophoneStateUpdated
      });

      return result;
    } catch (error) {
      return error;
    }
  },

  // Handle appearance and disappearance of speaker devices in the system
  registerSpeakerListener: async (vidyoConnector, ListenerComponent) => {
    try {
      const result = await vidyoConnector.RegisterLocalSpeakerEventListener({
        onAdded: ListenerComponent.handleDidSpeakerAdd,
        onRemoved: ListenerComponent.handleDidSpeakerRemove,
        onSelected: ListenerComponent.handleDidSpeakerSelect,
        onStateUpdated: ListenerComponent.handleDidSpeakerStateUpdate
      });
      return result;
    } catch (error) {
      return error;
    }
  },

  registerRemoteCameraListener: async (vidyoConnector, ListenerComponent) => {
    try {
      const result = await vidyoConnector.RegisterRemoteCameraEventListener({
        onAdded: ListenerComponent.handleDidRemoteCameraAdd,
        onRemoved: ListenerComponent.handleDidRemoteCameraRemove,
        onStateUpdated: ListenerComponent.handleDidRemoteCameraStateUpdate
      });

      return result;
    } catch (error) {
      return error;
    }
  },

  registerMessageEventListener: async (vidyoConnector, ListenerComponent) =>
    vidyoConnector.RegisterMessageEventListener({
      onChatMessageReceived: ListenerComponent.handleChatMessageReceive
    })
};

export default VidyoListeners;
