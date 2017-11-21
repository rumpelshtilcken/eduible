import PropTypes from 'prop-types';

import { Image } from 'components';
import stylessheet from './index.css';

const professionalImage = 'https://dontlosehair.com/wp-content/uploads/2016/02/3_Problems_that_Bald_People_Face_on_a_Regular_Basis.jpg';

const ProfesstionalBasicInfo = ({ profileName, user }) =>
  (<div className="professInfoContainer">
    {user.cloudinaryId
      ? (<div className="professImage">
        <Image publicId={user.cloudinaryId} />
      </div>)
      : (
        <img
          className="professImage"
          src={user.socialImageUrl || professionalImage}
          alt="professional avatar"
        />
      )
    }
    <p className="professInfoText">
      {profileName && profileName.toUpperCase()}
    </p>

    <style jsx>
      {stylessheet}
    </style>
  </div>);

ProfesstionalBasicInfo.propTypes = {
  user: PropTypes.object,
  profileImageUrl: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired
};

export default ProfesstionalBasicInfo;
