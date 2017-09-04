import PropTypes from 'prop-types';

import { VideoBox, ProfileBox, ChatBox } from './VChat';
import stylesheet from './index.css';

const VideoChat = ({ user }) =>
  (<div className="container">
    <VideoBox />
    <ProfileBox user={user} />
    <ChatBox />
    <style jsx>
      {stylesheet}
    </style>
  </div>);

VideoChat.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    timer: PropTypes.shape({
      hour: PropTypes.number.isRequired,
      minutes: PropTypes.number.isRequired
    })
  })
};
export default VideoChat;
