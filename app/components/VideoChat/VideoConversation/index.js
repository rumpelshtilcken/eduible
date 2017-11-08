import { Component } from 'react';
import PropTypes from 'prop-types';

import { Spinner } from 'components';

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
        <div id="participantCamera" className="participantCameraOutput">
          <Spinner />
        </div>
        <div id="userCamera" className="userCameraOutput">
          <Spinner />
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

VideoConversation.propTypes = {
  setVideoViewId: PropTypes.func.isRequired
};

export default VideoConversation;
