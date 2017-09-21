import { VideoBox, ProfileBox, ChatBox } from './VChat';
import PropTypes from 'prop-types';
import stylesheet from './index.css';

const VideoChat = ({ user, setVideoViewId, devices, selectedDevices, sendMessageTest }) => (
  <div className="container">
    <VideoBox setVideoViewId={setVideoViewId} devices={devices} selectedDevices={selectedDevices} />
    <ProfileBox user={user} />
    <ChatBox sendMessageTest={sendMessageTest} />
    <style jsx>{stylesheet}</style>
  </div>
);

VideoChat.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    timer: PropTypes.objectOf(PropTypes.number)
  })
};
export default VideoChat;
