import cx from 'classnames';
import PropTypes from 'prop-types';

import stylessheet from './index.css';

const BackButton = ({ onBackButtonClick }) => (
  <button className="backButtonContainer" onClick={onBackButtonClick}>
    <img src="/static/gobackicon.svg" alt="BackButton" />
    <p className={cx('backButtonTitle', {
      dynamicText: true
    })}
    >Back
    </p>
    <style jsx>{stylessheet}</style>
  </button>
);

BackButton.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired
};

export default BackButton;
