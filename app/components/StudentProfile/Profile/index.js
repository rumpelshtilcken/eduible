import PropTypes from 'prop-types';

import { Image } from 'components';
import style from './index.css';

const Profile = ({ student: { user }, onEditButtonClick }) => (
  <div className="container">
    <div className="profile">
      <div className="profileImg">
        {user.cloudinaryId
          ? (<div className="profileImage">
            <Image publicId={user.cloudinaryId} />
          </div>)
          : (
            <img
              className="profileImage"
              src={user.socialImageUrl || 'static/Profile.jpg'}
              alt="professional avatar"
            />
          )
        }
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
  student: PropTypes.object.isRequired,
  onEditButtonClick: PropTypes.func.isRequired
};

export default Profile;
