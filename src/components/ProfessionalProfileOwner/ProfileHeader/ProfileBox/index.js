import stylesheet from './index.css';

const ProfileBox = ({ text, location_imgUrl, location_text }) => (
  <div className="list">
    <div className="profileItem">
      <p className="profileTitle">{text}</p>
      <div className="profileContent">
        <img className="profileIcon" src={location_imgUrl} alt="location" />
        <span className="profileText">{location_text}</span>
      </div>
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

export default ProfileBox;

