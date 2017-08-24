import PropTypes from 'prop-types';

import Card from '../Card';
import ProgressBar from '../ProgressBar';
import UniversityTips from '../UniversityTips';

import stylesheet from './index.css';

const University = ({ image, title, description, course, percentage, tips }) =>
  (<div className="wrapper">
    <Card>
      <div className="content">
        <a href="#" className="universityRemove">Remove from list</a>
        <div
          className="universityLogo"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div>
          <div className="universityInfo">
            <h2 className="universityHeading">{title}</h2>
            <p className="universityDescription">{description}</p>
            <a href="#" className="readMore">Read more</a>
          </div>
          <div className="universityCourse">
            <h2 className="universityHeading">{course}</h2>
            <div className="progressBar">
              <ProgressBar percentage={percentage} />
              <a href="#" className="howCalculated">How is it calculated?</a>
            </div>
            <div className="universityTipsWrapper">
              <UniversityTips tips={tips} />
            </div>
          </div>
        </div>
      </div>
    </Card>
    <style jsx>{stylesheet}</style>
  </div>);

University.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  course: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  tips: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default University;
