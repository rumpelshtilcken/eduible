import PropTypes from 'prop-types';

import stylessheet from './index.css';

const ProfesstionalHourCostInfo = ({ price }) =>
  (<div>
    <p className="professInfoText">
      {`$${price} per minute`}
    </p>
    <style jsx>
      {stylessheet}
    </style>
  </div>);

ProfesstionalHourCostInfo.propTypes = {
  price: PropTypes.string.isRequired
};

export default ProfesstionalHourCostInfo;
