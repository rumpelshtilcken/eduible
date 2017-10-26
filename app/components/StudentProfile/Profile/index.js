import PropTypes from 'prop-types';

import style from './index.css';

const Profile = ({ student: { user: { name } }, onEditButtonClick }) => (
  <div className="container">
    <div className="profile">
      <div className="profileImg">
        <img src="static/Profile.jpg" alt="profileImage" />
      </div>
      <div className="profileData">
        <p>{name}</p>
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
  student: PropTypes.object.isRequired,
  onEditButtonClick: PropTypes.func.isRequired
};

export default Profile;
