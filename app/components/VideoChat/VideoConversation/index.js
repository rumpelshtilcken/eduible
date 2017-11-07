import { Component } from 'react';
import PropTypes from 'prop-types';

import stylesheet from './index.css';

class VideoConversation extends Component {
  componentWillMount() {
    const { setVideoViewId } = this.props;
    setVideoViewId({
      localCameraViewId: 'userCamera',
      remoteCameraViewId: 'participantCamera'
    });
  }

  render() {
    return (
      <div className="videoContainer">
        <div id="participantCamera" className="participantCameraOutput" />
        <div id="userCamera" className="userCameraOutput" />
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

VideoConversation.propTypes = {
  setVideoViewId: PropTypes.func.isRequired
};

export default VideoConversation;
