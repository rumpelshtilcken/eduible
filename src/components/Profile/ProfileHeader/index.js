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
  <div className="profile_header">
    <div><ProfileImg imgUrl={user.imgUrl} /></div>
    <div className="lists">{user.data.map(x =>
      (<ProfileBox
        text={x.text}
        location_text={x.location.text}
        location_imgUrl={x.location.imgUrl}
      />
      ))}</div>
    <div><button className="request">Request A Call</button></div>
    <style jsx>{stylesheet}</style>
  </div>
);

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    imgUrl: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.string).isRequired })
};
export default ProfileHeader;
