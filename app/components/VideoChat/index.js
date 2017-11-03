import PropTypes from 'prop-types';

import Chat from './Chat';
import ProfileHeader from './ProfileHeader';
import VideoConversation from './VideoConversation';

import stylesheet from './index.css';

const VideoChat = ({
  appointment,
  companion,
  sendMessage,
  setVideoViewId,
  subscribeOnMessageReceive,
  userId
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
        userId={userId}
        companion={companion}
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
  sendMessage: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

export default VideoChat;
