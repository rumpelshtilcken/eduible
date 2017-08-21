import cx from 'classnames';
import PropTypes from 'prop-types';

import stylesheet from './index.css';

const PaymentDetailsHeader = ({ profileImageUrl, profileName, conversationDetails }) => (
  <div className="headerContainer">
    <img className="profileImage" src={profileImageUrl} alt="profile" />
    <div className="headerTitleContainer">
      <p className={cx('headerTitle',
        { headerTitleHighlight: true })}
      >{conversationDetails.estimatedLength}</p>

      <p className="headerTitle">{' of conversation with '}</p>

      <p className={cx('headerTitle',
        { headerTitleHighlight: true })}
      >{profileName}</p>

      <p className="headerTitle">{' on '}</p>

      <p className={cx('headerTitle',
        { headerTitleHighlight: true })}
      >{conversationDetails.date}</p>

      <p className="headerTitle">{' at '}</p>

      <p className={cx('headerTitle',
        { headerTitleHighlight: true })}
      >{conversationDetails.time}</p>
    </div>

    <style jsx>{stylesheet}</style>
  </div>
);

PaymentDetailsHeader.propTypes = {
  profileImageUrl: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  conversationDetails: PropTypes.shape({
    estimatedLength: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
  }).isRequired
};

export default PaymentDetailsHeader;
