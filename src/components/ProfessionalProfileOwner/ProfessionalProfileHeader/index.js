import PropTypes from 'prop-types';

import ProfileImg from './ProfileImg';
import ProfileBox from './ProfileBox';
import stylesheet from './index.css';

const ProfessionalProfileHeader = ({ user }) => (
  <div className="profileHeader">
    <div><ProfileImg /></div>
    <div className="lists">{user.data.map(x =>
      (<ProfileBox
        text={x.text}
        location={x.location}
      />
      ))}
      <div><button className="request">Edit Profile</button></div></div>
    <div className="circles">
      <div className="firstCircle">
        <div className="circle"><p>$7</p></div>
        <p className="price">Price</p></div>
      <div className="secondCircle">
        <div className="circle"><p>5</p></div>
        <p className="price">Rating</p></div>
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

ProfessionalProfileHeader.propTypes = {
  user: PropTypes.shape({
    imgUrl: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.string).isRequired })
};
export default ProfessionalProfileHeader;
