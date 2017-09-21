import stylesheet from './index.css';

const VideoBox = ({ setVideoViewId, devices, selectedDevices }) => {
  setVideoViewId({
    localCameraViewId: 'renderer0',
    remoteCameraViewId: 'renderer1'
  });
  console.log(devices);
  console.log(selectedDevices);

  return (
    <div>
      <div id="renderer0" className="cameraOutput" />
      <div id="renderer1" className="cameraOutput" />
      <style jsx>
        {stylesheet}
      </style>
    </div>
  );
};

export default VideoBox;
