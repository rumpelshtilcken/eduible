import stylesheet from './index.css';

const ProfessionalProfileBox = ({ text, location }) => (
  <div className="list">
    <div className="profileItem">
      <p className="profileTitle">{text}</p>
      <div className="profileContent">
        <img className="profileIcon" src={location.imgUrl} alt="location" />
        <span className="profileText">{location.text}</span>
      </div>
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

export default ProfessionalProfileBox;

