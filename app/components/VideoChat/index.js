import { VideoBox, ProfileBox, ChatBox } from './VChat';

/* eslint-disable */
const VideoChat = ({ user, setVideoViewId, sendMessageTest }) => (
  <div>
    <VideoBox setVideoViewId={setVideoViewId} devices={devices} selectedDevices={selectedDevices} />
    <ProfileBox user={user} />
    <ChatBox sendMessageTest={sendMessageTest} />
  </div>
);

export default VideoChat;
