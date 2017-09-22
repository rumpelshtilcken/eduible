import stylesheet from './index.css';

const ComingSoon = () => (
  <div>
    <div className="container">
      <div className="start">LETS START LOOKING FOR</div>
      <div className="box">
        <div className="ProfessionalsBox">
          <div className="text">
            <h1>PROFESSIONALS</h1>
            <p>lorem ipsum dolor sit amet vulputate consectetur adipiscing elit</p>
          </div>
        </div>
        <div className="UniversityBox">
          <div className="text">
            <h1>UNIVERSITY</h1>
            <p>lorem ipsum dolor sit amet vulputate consectetur adipiscing elit</p>
          </div>
        </div>
      </div>
      <style jsx>{stylesheet}</style>
    </div>
  </div>
);

export default ComingSoon;
