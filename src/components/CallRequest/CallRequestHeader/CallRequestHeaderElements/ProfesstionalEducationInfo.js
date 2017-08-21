import PropTypes from 'prop-types';

import stylessheet from './index.css';

const ProfesstionalEducationInfo = ({ education }) =>
  (<div>
    <p className="professInfoText">
      {education.toUpperCase()} 2001-2007
    </p>
    <style jsx>
      {stylessheet}
    </style>
  </div>);

ProfesstionalEducationInfo.propTypes = {
  education: PropTypes.string.isRequired
};

export default ProfesstionalEducationInfo;
