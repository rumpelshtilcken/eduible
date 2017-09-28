import cx from 'classnames';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';

import stylesheet from './index.css';

const Link = ({ href, children, prefetch, style, white }) =>
  (<div>
    <NextLink href={href} prefetch={prefetch}>
      <a
        className={cx('link', {
          white
        })}
        style={style}
      >
        {children}
      </a>
    </NextLink>
    <style jsx>
      {stylesheet}
    </style>
  </div>);

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  prefetch: PropTypes.bool,
  style: stylePropType,
  white: PropTypes.bool
};

Link.defaultPropTypes = {
  prefetch: true,
  white: false
};

export default Link;
