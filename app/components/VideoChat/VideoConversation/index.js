import PropTypes from 'prop-types';

import stylesheet from './index.css';

const VideoConversation = ({ setVideoViewId }) => {
  setVideoViewId({
    localCameraViewId: 'userCamera',
    remoteCameraViewId: 'participantCamera'
  });

  return (
    <div className="videoContainer">
      <div id="participantCamera" className="cameraOutput" />
      <div id="userCamera" className="participantCameraOutput" />
      <style jsx>{stylesheet}</style>
    </div>
  );
};

VideoConversation.propTypes = {
  setVideoViewId: PropTypes.func.isRequired
};

export default VideoConversation;
