import PropTypes from 'prop-types';

import { convertFromISOToObject } from 'utils/auth';

import stylessheet from './index.css';

const ProfesstionalEducationInfo = ({ education, startYear, endYear }) =>
  (<div>
    <p className="professInfoText">
      {education && `${education.toUpperCase()}`}
      {' '}
      {startYear &&
        `${convertFromISOToObject(startYear).year}`}
      {'-'}
      {endYear && `${convertFromISOToObject(endYear).year}`}
    </p>
    <style jsx>
      {stylessheet}
    </style>
  </div>);

ProfesstionalEducationInfo.propTypes = {
  education: PropTypes.string.isRequired,
  startYear: PropTypes.date,
  endYear: PropTypes.date
};

export default ProfesstionalEducationInfo;
