import { VideoBox, ProfileBox, ChatBox } from './VChat';
import PropTypes from 'prop-types';

const VideoChat = ({ user, setVideoViewId, devices, selectedDevices, sendMessageTest }) => (
  <div>
    <VideoBox setVideoViewId={setVideoViewId} devices={devices} selectedDevices={selectedDevices} />
    <ProfileBox user={user} />
    <ChatBox sendMessageTest={sendMessageTest} />
  </div>
);

export default VideoChat;
