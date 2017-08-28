

const ProfileBox = config => (
  <div className="profile__item">
    <p className="profile__title profile__nickname">{config.text}</p>
    <div className="profile__content">
      <img className="profile__icon" src={} alt="location" />
      <span className="profile__text">{}</span>
    </div>
  </div>
);

export default ProfileBox;
