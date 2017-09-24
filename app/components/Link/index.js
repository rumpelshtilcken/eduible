import cx from 'classnames';
import NextLink from 'next/link';
import PropTypes from 'prop-types';

import stylessheet from './index.css';

const Link = ({ href, children, prefetch, white }) =>
  (<div>
    <NextLink href={href} prefetch={prefetch}>
      <a className={cx('link', {
        white
      })}
      >
        {children}
      </a>
    </NextLink>
    <style jsx>
      {stylessheet}
    </style>
  </div>);

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType(PropTypes.element, PropTypes.string).isRequired,
  prefetch: PropTypes.bool,
  white: PropTypes.bool
};

export default Link;
