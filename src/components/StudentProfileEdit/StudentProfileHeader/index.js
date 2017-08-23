
// import cx from 'classnames';
// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import stylesheet from './index.css';

const StudentProfileHeader = ({ profileImageUrl, profileName, profileLocUrl, profileLocation }) => (
  <div className="profile">
    <img src={profileImageUrl} alt="" />
    <div className="column">
      <p className="anna">{profileName}</p>
      <div className="row">
        <img src={profileLocUrl} alt="" />
        <p>{profileLocation}</p>
      </div>
    </div>
    <button className="editBtn"><p id="edit">Edit Profile</p></button>
    <style jsx>{stylesheet}</style>
  </div>
);

StudentProfileHeader.propTypes = {
  profileImageUrl: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  profileLocation: PropTypes.string.isRequired,
  profileLocUrl: PropTypes.string.isRequired
};

// StudentProfileHeader.propTypes = {
//   profileImageUrl: PropTypes.string.isRequired,
//   profileName: PropTypes.string.isRequired,
//   conversationDetails: PropTypes.shape({
//     estimatedLength: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired,
//     time: PropTypes.string.isRequired
//   }).isRequired
// };

export default StudentProfileHeader;
