import { VideoBox, ProfileBox, ChatBox } from './VChat';

const VideoChat = ({ companion, appointment, setVideoViewId, sendMessageTest }) => (
  <div>
    <VideoBox setVideoViewId={setVideoViewId} />
    <ProfileBox companion={companion} appointment={appointment} />
    <ChatBox sendMessageTest={sendMessageTest} />
  </div>
);

export default VideoChat;
