import PropTypes from 'prop-types';

import stylesheet from './index.css';

const UserBox = ({ user }) =>
  (<div className="dialog">
    <div className="dialog-username">
      <h5>
        {user.username}
      </h5>
    </div>
    <div className="dialog-text">
      <p>
        {user.usertext}
      </p>
    </div>
    <style jsx>
      {stylesheet}
    </style>
  </div>);

UserBox.propTypes = {
  user: PropTypes.objectOf(PropTypes.string.isRequired)
};
export default UserBox;
