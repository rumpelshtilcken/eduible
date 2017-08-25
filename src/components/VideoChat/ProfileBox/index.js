import PropTypes from 'prop-types';
import stylesheet from './index.css';

const ProfileBox = ({ name, imgUrl, icon, city, timer }) => (
  <div className="section2">
    <div className="profile-img">
      <img
        src={imgUrl}
        alt="profileImg"
      />
    </div>
    <div className="profile-info">
      <div>
        <p>{name.toUpperCase()}</p>
      </div>
      <div className="profile-city">
        <img
          src={icon}
          alt="icon"
        />
        <p id="city">{city.toUpperCase()}</p>
      </div>
    </div>
    <div className="profile-timer">
      <p id="timer">{timer.hour}:{timer.minutes}</p>
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

ProfileBox.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  timer: PropTypes.shape({
    hour: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired
  }).isRequired
};
export default ProfileBox;
