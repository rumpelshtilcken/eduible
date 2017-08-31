import PropTypes from 'prop-types';

import ProfileImg from './ProfileImg';
import ProfileBox from './ProfileBox';
import stylesheet from './index.css';

const ProfileHeader = ({ user }) => (
  <div className="profileHeader">
    <div><ProfileImg /></div>
    <div className="lists">{user.data.map(x =>
      (<ProfileBox
        text={x.text}
        location={x.location}
      />
      ))}
      <div><button className="request">Edit Profile</button></div></div>
    <style jsx>{stylesheet}</style>
  </div>
);

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    imgUrl: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.string).isRequired })
};
export default ProfileHeader;
