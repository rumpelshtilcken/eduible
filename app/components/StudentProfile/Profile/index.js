import PropTypes from 'prop-types';

import style from './index.css';

const Profile = ({ user, onEditButtonClick }) => (
  <div className="container">
    <div className="profile">
      <div className="profileImg">
        <img src="static/Profile.jpg" alt="profileImage" />
      </div>
      <div className="profileData">
        <p>{user.name}</p>
      </div>
    </div>
    <div className="btn">
      <button
        className="edit"
        onClick={onEditButtonClick}
        tabIndex="0"
      >
        <img className="editIcon" alt="" />
      </button>
      <div>
        <button className="editButton" onClick={onEditButtonClick}>Edit Profile</button>
      </div>

    </div>
    <style jsx>{style}</style>
  </div>
);

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  onEditButtonClick: PropTypes.func.isRequired
};

export default Profile;
