import PropTypes from 'prop-types';

import stylesheet from './index.css';

const ProfessionalProfileImg = ({ imgUrl }) => (
  <div className="headerImage">
    <div className="profileImg">
      <img src={imgUrl} alt="profile" />
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

ProfessionalProfileImg.defaultProps = {
  imgUrl: '/static/profile.png'
};

ProfessionalProfileImg.propTypes = {
  imgUrl: PropTypes.string
};
export default ProfessionalProfileImg;
