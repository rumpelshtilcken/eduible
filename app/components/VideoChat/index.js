import PropTypes from 'prop-types';

import Chat from './Chat';
import ProfileHeader from './ProfileHeader';
import VideoConversation from './VideoConversation';

import stylesheet from './index.css';

const VideoChat = ({
  companion,
  appointment,
  setVideoViewId,
  subscribeOnMessageReceive,
  sendMessage
}) => (
  <div className="videoChatContainer">
    <div className="videoConversationWrapper">
      <VideoConversation setVideoViewId={setVideoViewId} />
    </div>
    <div className="profileInfoWrapper">
      <ProfileHeader companion={companion} appointment={appointment} />
    </div>
    <div className="chatWrapper">
      <Chat
        companionId={companion.id}
        subscribeOnMessageReceive={subscribeOnMessageReceive}
        sendMessage={sendMessage}
      />
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

VideoChat.propTypes = {
  companion: PropTypes.object.isRequired,
  appointment: PropTypes.object.isRequired,
  setVideoViewId: PropTypes.func.isRequired,
  subscribeOnMessageReceive: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired
};

export default VideoChat;
