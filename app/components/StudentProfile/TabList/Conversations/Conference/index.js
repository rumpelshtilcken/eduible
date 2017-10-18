import PropTypes from 'prop-types';

import Conversation from '../Conversation';

const Conference = ({ user, btnStyle }) => (
  <Conversation user={user} title={title} btnStyle={btnStyle} />
);

const title = 'Connect';

Conference.propTypes = {
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
  btnStyle: PropTypes.string.isRequired
};
export default Conference;

