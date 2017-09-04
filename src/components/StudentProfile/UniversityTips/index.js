import PropTypes from 'prop-types';
import cx from 'classnames';

import stylesheet from './index.css';

const tipsLimit = 3;
const UniversityTips = ({ tips }) => (
  <div className="universityTips">
    <ul>
      {
        tips.map((tip, index) => (
          <li
            key={tip}
            className={cx({ hidden: index >= tipsLimit })}
          >
            {tip}
          </li>
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
