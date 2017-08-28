import stylesheet from './index.css';
import ProfileImg from './ProfileImg';

const config = {
  imgUrl: '/static/prof/edit.svg',
  data: [
    {
      text: 'Miguel Carrera',
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
    <ProfileImg config={config.imgUrl} />

    <style jsx>{stylesheet}</style>
  </div>
);

export default ProfileHeader;
