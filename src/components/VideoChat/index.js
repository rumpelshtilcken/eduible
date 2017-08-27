import { VideoBox, ProfileBox, ChatBox } from './VChat';
import PropTypes from 'prop-types';
import stylesheet from './index.css';

const VideoChat = data =>
  (
    <div className="container">
      <VideoBox />
      <ProfileBox
        name={data.name}
        city={data.city}
        icon={data.icon}
        imgUrl={data.imgUrl}
        timer={data.timer}
      />
      <ChatBox />
      <style jsx>{stylesheet}</style>
    </div>);

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
