import PropTypes from 'prop-types';

import { RoundedButton } from 'components';
import style from './index.css';

const Conversation = ({ user }) => (
  <div className="container">
    <div className="studentProfile-div">
      <div className="profileImg-div">
        <img src={user.imgUrl} alt="studentProfile" />
      </div>
      <div className="profileText-div">
        <p>{user.name}</p>
        <p id="duration">{user.conversation.duration}</p>
      </div>
    </div>
    <div className="profileTools-div">
      <div className="conversationData-div">
        <div className="conversationDataBox1">
          <img src="/static/Calendar.svg" alt="calendarIcon" />
          <p>{user.conversation.date}</p>
        </div>
        <div className="conversationDataBox2">
          <img src="/static/clock.svg" alt="timerIcon" />
          <p>{user.conversation.time}</p>
        </div>
      </div>
      <div className="btn-div">
        <RoundedButton title="CONNECT" type="button" />
      </div>
    </div>
    <style jsx>{style}</style>
  </div>
);

Conversation.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    conversation: PropTypes.shape({
      duration: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      conference: PropTypes.bool
    }).isRequired
  }).isRequired
};
export default Conversation;

