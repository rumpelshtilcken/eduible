/*
  Side more layout use when you want 
  to layout left or right bigger than another component
*/

import PropTypes from 'prop-types';
import cx from 'classnames';

import stylessheet from './index.css';

const SideMoreLayout = ({ makeRightSideMore, leftChildren, rightChildren }) => (
  <div className="layoutContainer">
    <div className={cx({
      biggerChildren: !makeRightSideMore,
      lessChildren: makeRightSideMore })}
    >
      {leftChildren}
    </div>

    <div className={cx('rightChildren', {
      biggerChildren: makeRightSideMore,
      lessChildren: !makeRightSideMore
    })}
    >
      {rightChildren}
    </div>

    <style jsx>{stylessheet}</style>
  </div>
);

SideMoreLayout.propTypes = {
  makeRightSideMore: PropTypes.bool,
  leftChildren: PropTypes.element.isRequired,
  rightChildren: PropTypes.element.isRequired
};

export default SideMoreLayout;
