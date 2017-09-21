import PropTypes from 'prop-types';

import ProfileImg from './ProfileImg';
import ProfileBox from './ProfileBox';
import stylesheet from './index.css';

const user = {
  imgUrl: '/static/profile.png',
  data: [
    {
      text: 'MIGUEL CARRERA',
      location:
      {
        imgUrl: '/static/prof/Location.svg',
        text: 'Miami, Fl'
      }
    },
    {
      text: 'IT developer',
      location:
      {
        imgUrl: '/static/prof/Circle.svg',
        text: 'Facebook'
      }
    },
    {
      text: 'IT with positions',
      location:
      {
        imgUrl: '/static/prof/Education.svg',
        text: 'Hogwards 2007-2011'
      }
    }
  ]
};

const ProfileHeader = () => (
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
