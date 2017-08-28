import stylesheet from './index.css';

const ProfileImg = ({ user }) => (
  <div className="header__image">
    <div className="profileImg"><img src={user} alt="" /></div>
    <style jsx>{stylesheet}</style>
  </div>
);

export default ProfileImg;
