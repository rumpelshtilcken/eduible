import PropTypes from 'prop-types';
import { Image } from 'components';

import stylesheet from './index.css';

const professionalImage = 'https://dontlosehair.com/wp-content/uploads/2016/02/3_Problems_that_Bald_People_Face_on_a_Regular_Basis.jpg';
const locationIcon = '/static/placeholderIcon.svg';

const ProfileBox = ({ companion, appointment }) => (
  <div className="section2">
    {companion.user.cloudinaryId
      ? (<div className="profileImage">
        <Image publicId={companion.user.cloudinaryId} />
      </div>)
      : (
        <img
          className="profileImage"
          src={companion.user.socialImageUrl || professionalImage}
          alt="professional avatar"
        />
      )
    }
    <div className="profile-info">
      <div>
        <p>{companion.user.name.toUpperCase()}</p>
      </div>
      <div className="profile-city">
        <img src={locationIcon} alt="icon" />
        { companion.location &&
          <p id="city">{companion.location.country.toUpperCase()}</p>
        }
      </div>
    </div>
    <div className="profile-timer">
      <p id="timer">
        {appointment.estimatedLength}
      </p>
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

ProfileBox.propTypes = {
  companion: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    location: PropTypes.shape({
      country: PropTypes.string
    })
  }),
  appointment: PropTypes.shape({
    estimatedLength: PropTypes.number
  })
};
export default ProfileBox;
