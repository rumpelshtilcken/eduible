import PropTypes from 'prop-types';

import { StudentProfileCard as Card } from 'components';

import ProgressBar from '../ProgressBar';
import UniversityTips from '../UniversityTips';

import stylesheet from './index.css';

const University = ({
  image,
  title,
  description,
  course,
  percentage,
  tips,
  onRemoveFromListClick,
  onReadMoreClick,
  onCalculatedClick }) =>
  (<div className="wrapper">
    <Card>
      <div className="content">
        <button className="universityRemove" onClick={onRemoveFromListClick}>
          Remove from list
        </button>
        <div
          className="universityLogo"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div>
          <div className="universityInfo">
            <h2 className="universityHeading">{title}</h2>
            <p className="universityDescription">{description}</p>
            <button className="readMore" onClick={onReadMoreClick}>Read more</button>
          </div>
          <div className="universityCourse">
            <h2 className="universityHeading">{course}</h2>
            <div className="progressBar">
              <ProgressBar percentage={percentage} />
              <button className="howCalculated" onClick={onCalculatedClick}>How is it calculated?</button>
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
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired.isRequired,
  description: PropTypes.string.isRequired,
  course: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  tips: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRemoveFromListClick: PropTypes.func.isRequired,
  onReadMoreClick: PropTypes.func.isRequired,
  onCalculatedClick: PropTypes.func.isRequired
};

export default University;
