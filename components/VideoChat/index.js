import VideoBox from './VideoBox';
import ChatBox from './ChatBox';
import ProfileBox from './ProfileBox';
import stylesheet from './index.css';

const VideoChat = () =>
  (
    <div className="container">
      <VideoBox />
      <ProfileBox />
      <ChatBox />
      <style jsx>{stylesheet}</style>
    </div>);

export default VideoChat;
