import PropTypes from 'prop-types';
import cx from 'classnames';

import stylesheet from './index.css';

const Card = ({ isHalfRound, children }) => (
  <div className={cx('card', {
    cardHalfRound: isHalfRound
  })}
  >
    {children}
    <style jsx>{stylesheet}</style>
  </div>
);

Card.propTypes = {
  isHalfRound: PropTypes.bool,
  children: PropTypes.element.isRequired
};

export default Card;
