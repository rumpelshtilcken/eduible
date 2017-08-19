import cx from 'classnames';
import PropTypes from 'prop-types';

import stylessheet from './index.css';

const CallRequestHeader = ({ onBackButtonClick }) => (
  <div className="container">
    <button className="backButtonContainer" onClick={onBackButtonClick}>
      <img src="/static/gobackicon.svg" alt="BackButton" />
      <p className={cx('backButtonTitle', {
        dynamicText: true
      })}
      >Back</p>
    </button>
    <div className="professInfoContainer">
      <img src="/static/miguel.jpg" alt="profilePicture" />
      <p className="professInfoStaticText">{'Miguela Carbera'.toUpperCase()}</p>

      <div className="purchaseInfo">
        <p className="dynamicText">IT developer</p>
        <p className="dynamicText">{'Hogwards'.toUpperCase()} 2001-2007</p>
        <p className="professInfoStaticText">$5 per minute</p>
      </div>
    </div>

    <style jsx>{stylessheet}</style>
  </div>
);

CallRequestHeader.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired
};

export default CallRequestHeader;
