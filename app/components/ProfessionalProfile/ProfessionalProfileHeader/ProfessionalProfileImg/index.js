import PropTypes from 'prop-types';

import stylesheet from './index.css';

const ProfessionalProfileImg = ({ imgUrl, children }) => (
  <div className="headerImage">
    <div className="buttonContainer">
      {children}
    </div>
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
  imgUrl: PropTypes.string,
  children: PropTypes.element
};
export default ProfessionalProfileImg;
