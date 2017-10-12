import PropTypes from 'prop-types';
import cx from 'classnames';

import stylesheet from './index.css';

const Card = ({ extraStyle, children }) =>
  (<div className={cx('cardContainer', { extraStyle: !!extraStyle })}>
    {children}
    <style jsx>
      {stylesheet}
    </style>
  </div>);

Card.propTypes = {
  children: PropTypes.element,
  extraStyle: PropTypes.string
};

export default Card;
