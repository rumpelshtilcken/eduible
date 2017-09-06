import PropTypes from 'prop-types';

import stylessheet from './index.css';

const ProfesstionalHourCostInfo = ({ cost }) =>
  (<div>
    <p className="professInfoText">
      {cost}
    </p>
    <style jsx>
      {stylessheet}
    </style>
  </div>);

ProfesstionalHourCostInfo.propTypes = {
  cost: PropTypes.string.isRequired
};

export default ProfesstionalHourCostInfo;
