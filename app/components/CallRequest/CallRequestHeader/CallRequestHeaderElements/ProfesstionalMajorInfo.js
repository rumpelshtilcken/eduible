import PropTypes from 'prop-types';

import stylessheet from './index.css';

const ProfesstionalMajorInfo = ({ major }) =>
  (<div>
    <p className="professInfoText">
      {major}
    </p>
    <style jsx>
      {stylessheet}
    </style>
  </div>);

ProfesstionalMajorInfo.propTypes = {
  major: PropTypes.string.isRequired
};

export default ProfesstionalMajorInfo;
