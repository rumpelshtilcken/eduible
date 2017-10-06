import PropTypes from 'prop-types';

import Conversation from '../Conversation';

const History = ({ user }) => (
  <Conversation user={user} />
);

History.propTypes = {
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
export default History;

