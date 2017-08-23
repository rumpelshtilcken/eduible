
// import cx from 'classnames';
// import PropTypes from 'prop-types';

import stylesheet from './index.css';

const StudentProfileHeader = () => (
  <div className="profile">
    <img src="/static/anna.jpg" alt="" />
    <div className="column">
      <p className="anna">ANNA STARK</p>
      <div className="row">
        <img src="/static/loc.jpg" alt="" />
        <p>MIAMI, FL</p>
      </div>
    </div>
    <button className="editBtn"><p id="edit">Edit Profile</p></button>
    <style jsx>{stylesheet}</style>
  </div>
);

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
