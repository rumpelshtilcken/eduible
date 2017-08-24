import PropTypes from 'prop-types';
import stylesheet from '../index.css';

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
      <p id="timer">{timer}</p>
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

ProfileBox.defaultProps = {
  name: 'Miguel Carrera',
  imgUrl: '/static/miguel.jpg',
  icon: 'static/placeholderIcon.svg',
  city: 'Miami, FL',
  timer: 0.59
};

ProfileBox.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired
};
export default ProfileBox;
