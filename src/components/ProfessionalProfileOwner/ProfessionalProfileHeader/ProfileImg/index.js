import PropTypes from 'prop-types';

import stylesheet from './index.css';

const ProfileImg = ({ imgUrl }) => (
  <div className="headerImage">
    <div className="profileImg">
      <img src={imgUrl} alt="profile" />
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

ProfileImg.defaultProps = {
  imgUrl: '/static/profile.png'
};

ProfileImg.propTypes = {
  imgUrl: PropTypes.string
};
export default ProfileImg;
