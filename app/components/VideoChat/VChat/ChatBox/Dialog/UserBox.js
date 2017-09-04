import PropTypes from 'prop-types';

import stylesheet from './index.css';

const UserBox = user_data =>
  (<div className="dialog">
    <div className="dialog-username">
      <h5>
        {user_data.username}
      </h5>
    </div>
    <div className="dialog-text">
      <p>
        {user_data.usertext}
      </p>
    </div>
    <style jsx>
      {stylesheet}
    </style>
  </div>);

UserBox.propTypes = {
  user_data: PropTypes.objectOf(PropTypes.string.isRequired)
};
export default UserBox;
