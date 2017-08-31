import PropTypes from 'prop-types';

import stylesheet from './index.css';

const ProfileImg = ({ imgUrl }) => (
  <div className="headerImage">
    <div className="profileImg"><img src={imgUrl} alt="" /></div>
    <style jsx>{stylesheet}</style>
  </div>
);

ProfileImg.propTypes = {
  imgUrl: PropTypes.string.isRequired
};
export default ProfileImg;
