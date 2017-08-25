import stylesheet from './index.css';

const ProfileImg = config => (
  <div> <div className="header__image">
    <img className="profile__edit" src={config.imgUrl} alt="" /></div>
  <style jsx>{stylesheet}</style>
  </div>
);

export default ProfileImg;
