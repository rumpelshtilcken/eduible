import PropTypes from 'prop-types';

import { StudentProfileCard as Card, ProgressBar } from 'components';
import UniversityTips from '../UniversityTips';

import stylesheet from './index.css';

const University = ({
  university,
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
          style={{ backgroundImage: `url(${university.image})` }}
        />
        <div>
          <div className="universityInfo">
            <h2 className="universityHeading">{university.title}</h2>
            <p className="universityDescription">{university.description}</p>
            <button className="readMore" onClick={onReadMoreClick}>
              Read more
            </button>
          </div>
          <div className="universityCourse">
            <h2 className="universityHeading">{university.course}</h2>
            <div className="progressBar">
              <ProgressBar percentage={university.percentage} />
              <button className="howCalculated" onClick={onCalculatedClick}>
                How is it calculated?
              </button>
            </div>
            <div className="universityTipsWrapper">
              <UniversityTips tips={university.tips} />
            </div>
          </div>
        </div>
      </div>
    </Card>
    <style jsx>{stylesheet}</style>
  </div>);

University.propTypes = {
  university: PropTypes.object.isRequired,
  onRemoveFromListClick: PropTypes.func.isRequired,
  onReadMoreClick: PropTypes.func.isRequired,
  onCalculatedClick: PropTypes.func.isRequired
};

export default University;
