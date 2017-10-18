import PropTypes from 'prop-types';

import { RoundedButton } from 'components';
import style from './index.css';

const Conversation = ({ user, title, btnStyle }) => (
  <div className="container">
    <div className="studentProfile">
      <div className="profileImg">
        <img src={user.imgUrl} alt="studentProfile" />
      </div>
      <div className="profileText">
        <p>{user.name}</p>
        <p id="duration">{user.conversation.duration}</p>
      </div>
    </div>
    <div className="profileTools">
      <div className="conversationData">
        <div className="conversationDataBox1">
          <img src="/static/Calendar.svg" alt="calendarIcon" />
          <p>{user.conversation.date}</p>
        </div>
        <div className="conversationDataBox2">
          <img src="/static/clock.svg" alt="timerIcon" />
          <p>{user.conversation.time}</p>
        </div>
      </div>
      <div className="btn">
        <RoundedButton title={title} type="button" style={btnStyle} />
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
  }).isRequired,
  btnStyle: PropTypes.obj,
  title: PropTypes.string.isRequired

};
export default Conversation;

