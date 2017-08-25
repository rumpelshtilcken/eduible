import VideoBox from './VideoBox';
import ChatBox from './ChatBox';
import ProfileBox from './ProfileBox';
import stylesheet from './index.css';

const VideoChat = ({ name, city, icon, imgUrl, timer }) =>
  (
    <div className="container">
      <VideoBox />
      <ProfileBox
        name={name}
        city={city}
        icon={icon}
        imgUrl={imgUrl}
        timer={timer}
      />
      <ChatBox />
      <style jsx>{stylesheet}</style>
    </div>);

export default VideoChat;
