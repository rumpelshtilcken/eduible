import PropTypes from 'prop-types';

import stylesheet from './index.css';

const ProfileBox = ({ user }) =>
  (<div className="section2">
    <div className="profile-img">
      <img src={user.imgUrl} alt="profileImg" />
    </div>
    <div className="profile-info">
      <div>
        <p>
          {user.name.toUpperCase()}
        </p>
      </div>
      <div className="profile-city">
        <img src={user.icon} alt="icon" />
        <p id="city">
          {user.city.toUpperCase()}
        </p>
      </div>
    </div>
    <div className="profile-timer">
      <p id="timer">
        {user.timer.hour}:{user.timer.minutes}
      </p>
    </div>
    <style jsx>
      {stylesheet}
    </style>
  </div>);

ProfileBox.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    timer: PropTypes.shape({
      hour: PropTypes.number,
      minutes: PropTypes.number
    }).isRequired
  })
};

export default ProfileBox;
