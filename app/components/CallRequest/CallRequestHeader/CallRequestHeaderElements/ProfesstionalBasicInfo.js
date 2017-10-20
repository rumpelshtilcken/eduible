import PropTypes from 'prop-types';

import stylessheet from './index.css';

const ProfesstionalBasicInfo = ({ profileImageUrl, profileName }) =>
  (<div className="professInfoContainer">
    <img className="professImage" src={profileImageUrl} alt="profilePicture" />
    <p className="professInfoText">
      {profileName && profileName.toUpperCase()}
    </p>

    <style jsx>
      {stylessheet}
    </style>
  </div>);

ProfesstionalBasicInfo.propTypes = {
  profileImageUrl: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired
};

export default ProfesstionalBasicInfo;
