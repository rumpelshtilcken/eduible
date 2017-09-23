import cx from 'classnames';
import PropTypes from 'prop-types';

import stylesheet from './index.css';

const BurgerMenu = ({ onClick, isCloseState }) => (
  <button
    onClick={onClick}
    className={'burgerMenuContainer'}
  >
    <div className={cx('bar1', {
      bar1CloseState: isCloseState
    })}
    />
    <div className={cx('bar2', {
      bar2CloseState: isCloseState
    })}
    />
    <div className={cx('bar3', {
      bar3CloseState: isCloseState
    })}
    />
    <style jsx>{stylesheet}</style>
  </button>
);

BurgerMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
  isCloseState: PropTypes.bool.isRequired
};

export default BurgerMenu;
