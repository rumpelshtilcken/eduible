import stylesheet from './index.css';

const ProfileBox = ({ text, location_imgUrl, location_text }) => (
  <div className="list">
    <div className="profile__item">
      <p className="profile__title">{text}</p>
      <div className="profile__content">
        <img className="profile__icon" src={location_imgUrl} alt="location" />
        <span className="profile__text">{location_text}</span>
      </div>
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

export default ProfileBox;
