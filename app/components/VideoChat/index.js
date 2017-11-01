/* eslint-disable */
import { VideoBox, ProfileBox, ChatBox } from './VChat';

const VideoChat = ({
  companion,
  appointment,
  setVideoViewId,
  subscribeOnMessageReceive,
  sendMessage
}) => (
  <div>
    <VideoBox setVideoViewId={setVideoViewId} />
    <ProfileBox companion={companion} appointment={appointment} />
    <ChatBox
      subscribeOnMessageReceive={this.props.subscribeOnMessageReceive}
      sendMessage={this.props.sendMessage}
    />
  </div>
);

export default VideoChat;
