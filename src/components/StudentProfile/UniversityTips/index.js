import PropTypes from 'prop-types';

import stylesheet from './index.css';

const tipsLimit = 3;
const UniversityTips = ({ tips }) => (
  <div className="universityTips">
    <ul>
      {
        tips.map((tip, index) => (
          index < 3 ?
            <li key={tip}>{tip}</li> :
            <li key={tip} className="hidden">{tip}</li>
        ))
      }
    </ul>
    {
      tips.length > tipsLimit &&
      <a href="#" className="moreTips">
        {tips.length - tipsLimit} more tips
      </a>
    }
    <style jsx>{stylesheet}</style>
  </div>
);

UniversityTips.propTypes = {
  tips: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default UniversityTips;
