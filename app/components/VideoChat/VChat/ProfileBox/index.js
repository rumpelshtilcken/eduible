import PropTypes from 'prop-types';
import stylesheet from './index.css';

const ProfileBox = ({ data }) => (
  <div className="section2">
    <div className="profile-img">
      <img src={data.imgUrl} alt="profileImg" />
    </div>
    <div className="profile-info">
      <div>
        <p>{data.name.toUpperCase()}</p>
      </div>
      <div className="profile-city">
        <img src={data.icon} alt="icon" />
        <p id="city">{data.city.toUpperCase()}</p>
      </div>
    </div>
    <div className="profile-timer">
      <p id="timer">
        {data.timer.hour}:{data.timer.minutes}
      </p>
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

ProfileBox.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    timer: PropTypes.objectOf(PropTypes.number)
  })
};
export default ProfileBox;
