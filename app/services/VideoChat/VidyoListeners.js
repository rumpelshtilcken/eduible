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
  registerCameraListener: async (vidyoConnector, listener) => {
    try {
      const { onAdded, onRemoved, onSelected, onStateUpdated } = listener;
      const result = await vidyoConnector.RegisterLocalCameraEventListener({
        onAdded, onRemoved, onSelected, onStateUpdated
      });

      return result;
    } catch (error) {
      return error;
    }
  },

  // Handle appearance and disappearance of microphone devices in the system
  registerMicrophoneListener: async (vidyoConnector, listener) => {
    try {
      const { onAdded, onRemoved, onSelected, onStateUpdated } = listener;

      const result = await vidyoConnector.RegisterLocalMicrophoneEventListener({
        onAdded, onRemoved, onSelected, onStateUpdated
      });

      return result;
    } catch (error) {
      return error;
    }
  },

  // Handle appearance and disappearance of speaker devices in the system
  registerSpeakerListener: async (vidyoConnector, listener) => {
    try {
      const { onAdded, onRemoved, onSelected, onStateUpdated } = listener;

      const result = await vidyoConnector.RegisterLocalSpeakerEventListener({
        onAdded, onRemoved, onSelected, onStateUpdated
      });
      return result;
    } catch (error) {
      return error;
    }
  },

  registerRemoteCameraListener: async (vidyoConnector, listener) => {
    try {
      const { onAdded, onRemoved, onStateUpdated } = listener;
      const result = await vidyoConnector.RegisterRemoteCameraEventListener({
        onAdded, onRemoved, onStateUpdated
      });

      return result;
    } catch (error) {
      return error;
    }
  },

  registerMessageEventListener: async (vidyoConnector, listener) =>
    vidyoConnector.RegisterMessageEventListener({
      onChatMessageReceived: listener.onChatMessageReceived
    })
};

export default VidyoListeners;
