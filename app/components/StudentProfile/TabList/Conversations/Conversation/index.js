import PropTypes from 'prop-types';

import RoundedButton from 'components';

const Conversation = ({ user }) => (
  <div className="container">
    <div className="studentProfile">
      <div>
        <img src={user.imgUrl} alt="studentProfile" />
        <div>
          <p>{user.name}</p>
          <p>{user.conversation.duration}</p>
        </div>
      </div>
    </div>
    <div className="profileTools">
      <div>
        <div>
          <img src="" alt="calendarIcon" />
          <p>{user.conversation.date}</p>
        </div>
        <div>
          <img src="" alt="timerIcon" />
          <p>{user.conversation.time}</p>
        </div>
      </div>
      <RoundedButton title="CONNECT" type="button" />
    </div>
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
      conference: PropTypes.bool.isRequired
    }).isRequired
  }).isRequired
};
export default Conversation;

