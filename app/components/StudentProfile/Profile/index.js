import PropTypes from 'prop-types';

import { StudentProfileCard as Card } from 'components';

import stylesheet from './index.css';

const Profile = ({ user, onEditButtonClick }) => (
  <div className="wrapper">
    <Card isHalfRound>
      <div className="content">
        <div className="userPhoto" />
        <div className="userInfo">
          <h2 className="userName">{user.name}</h2>
          <p className="userLocation">{user.location}</p>
        </div>
        <button
          className="edit"
          onClick={onEditButtonClick}
          tabIndex="0"
        >
          <img className="editIcon" alt="editIcon " />
        </button>
        <div className="edit editButton">
          <button onClick={onEditButtonClick}>Edit profile</button>
        </div>
      </div>
    </Card>
    <style jsx>{stylesheet}</style>
  </div>
);

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  onEditButtonClick: PropTypes.func.isRequired
};

export default Profile;
