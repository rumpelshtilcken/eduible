import PropTypes from 'prop-types';
import stylesheet from '../index.css';

const UserBox = ({ username, usertext }) => (
  <div className="dialog">
    <div className="dialog-username">
      <h5>{username}</h5>
    </div>
    <div className="dialog-text">
      <p>{usertext}</p>
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

UserBox.propTypes = {
  username: PropTypes.string.isRequired,
  usertext: PropTypes.string.isRequired
};
export default UserBox;
