import PropTypes from 'prop-types';
import cx from 'classnames';

import stylesheet from './index.css';

const professionalImage = 'https://dontlosehair.com/wp-content/uploads/2016/02/3_Problems_that_Bald_People_Face_on_a_Regular_Basis.jpg';
const locationIcon = '/static/placeholderIcon.svg';

const ProfileHeader = ({ companion, appointment }) => (
  <div className="profileHeaderContainer">
    <div className="profileInfoContainer">
      <img
        className="professionalProfileImage"
        src={professionalImage}
        alt="profile avatar"
      />

      <div className="professionalInfoWrapper">
        <p className="professionalName">
          {companion.user.name.toUpperCase()}
        </p>
        <div className="professionalLocationContainer">
          <img src={locationIcon} alt="icon" />
          { companion.location &&
            <p className="professionalLocation">
              {companion.location.country.toUpperCase()}
            </p>
          }
        </div>
      </div>
    </div>

    <p className={cx('professionalName', { appointmentEstimatedLength: true })}>
      {appointment.estimatedLength}
    </p>
    <style jsx>{stylesheet}</style>
  </div>
);

ProfileHeader.propTypes = {
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
export default ProfileHeader;
