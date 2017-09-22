import stylesheet from './index.css';
/* eslint-disable */
const VideoBox = ({ setVideoViewId }) => {
  setVideoViewId({
    localCameraViewId: 'renderer0',
    remoteCameraViewId: 'renderer1'
  });

  return (
    <div>
      <div id="renderer0" className="cameraOutput" />
      <div id="renderer1" className="cameraOutput" />
      <style jsx>{stylesheet}</style>
    </div>
  );
};

export default VideoBox;
